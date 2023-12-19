import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../../../../DB/model/user.model.js'
import cloudinary from '../../../Services/cloudinary.js';
import { sendEmail } from '../../../Services/email.js';
import { customAlphabet, nanoid } from 'nanoid';

export const signUp = async (req, res) => {
    try {

        const { userName, email, password } = req.body;
        if (await UserModel.findOne({ email: email })) {
            return res.status(409).json({ message: 'email exist' })
        }
        const hashPassword = await bcrypt.hashSync(password, parseInt(process.env.SALTROUND));

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APP_NAME}/User`
        });

        const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET);

        await sendEmail(email, "confirm Email", `<a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>verify</a>`);

        const createUser = await UserModel.create({ userName, email, password: hashPassword, image: { secure_url, public_id } });
        return res.status(201).json({ message: 'success', createUser })
    } catch (error) {
        return res.json({ error: error.stack });

    }
}

export const confirmEmail = async (req, res) => {
    const token = req.params.token;
    const decoded = await jwt.verify(token, process.env.CONFIRMEMAILSECRET);
    if (!decoded) {
        return res.status(404).json({ message: 'invalid token' });
    }
    const user = await UserModel.findOneAndUpdate({ email: decoded.email, confirmEmail:false },{ confirmEmail: true });
    if (!user) {
        return res.status(400).json({ message: 'Invalid Verify Email Or Your Email is Verified' });
    }
    return res.redirect(process.env.LOGINFRONTEND)
    // return res.status(200).json({ message: 'Your Email Verified Successfully' });
}


export const sendCode = async (req, res) => {
    const { email} = req.body;
    if (!await UserModel.findOne({ email: email })) {
        return res.status(404).json({ message: 'not register account' })
    }
    let code=customAlphabet('123456789abcdzABCDZ',4);
    code=code();
    
    const html=`<h2>reset code : ${code}</h2>`
    sendEmail(email,'reset Password',html);
    const user = await UserModel.findOneAndUpdate({email},{sendCode:code},{new:true});
    return res.redirect(process.env.FORGOTPASSWORDFORM)
    
    // return res.status(200).json({ message: 'success', user})
}

export const forgotPassword = async (req, res) => {
    const { email,password,code} = req.body;
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ message: 'not register account' })
    }
    if (user.sendCode!=code) {
        return res.status(400).json({ message: 'invalid code' })
    }
    let match=await bcrypt.compare(password,user.password);
    if (match) {
        return res.status(409).json({ message: 'same password' })
    }
    user.password=await bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    user.sendCode=null;
    user.save();
    return res.status(200).json({ message: 'success', user})
}


export const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: 'data invalid' })
    }
    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
        return res.status(400).json({ message: 'data invalid' })
    }
    const token = await jwt.sign({ id: user._id, role: user.role, status: user.status }, process.env.LOGINSECRET,
        // {expiresIn:'5m'}
    );
    const refreshToken = await jwt.sign({ id: user._id, role: user.role, status: user.status }, process.env.LOGINSECRET, { expiresIn: '10m' });

    return res.status(201).json({ message: 'success', token, refreshToken })
}


