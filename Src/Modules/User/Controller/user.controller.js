import bcrypt from 'bcryptjs'
import UserModel from "../../../../DB/model/user.model.js";
import XLSX from "xlsx"
import { createPdf } from '../../../Services/pdf.js';


export const profile = async (req, res, next) => {
    const user = await UserModel.findById(req.user._id)
    return res.status(201).json({ message: "success", user });
}
export const uploadUserExcel = async (req, res, next) => {
    const workbook = XLSX.readFile(req.file.path);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    const users = XLSX.utils.sheet_to_json(workSheet);

    users.map(async (user) => {
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.SALTROUND));
    })
    if (! await UserModel.insertMany(users)) {
        return next(new Error("could not insert", { cause: 400 }));
        
    }
    return res.status(201).json({ message: "success", newUsers });
}
export const printPdfUsers = async (req,res,next) => {
   let users=await UserModel.find({}).lean();
   await createPdf(users,'listUsers.pdf',req,res);

}
export const printExcelUsers = async (req,res,next) => {
    const users=await UserModel.find({});4
    console.log(users);
     // Create a new workbook and worksheet
     const exportWorkbook = XLSX.utils.book_new();
     const exportWorkSheet = XLSX.utils.json_to_sheet(users);

     // Add the worksheet to the workbook
     XLSX.utils.book_append_sheet(exportWorkbook, exportWorkSheet, 'Users');

     // Write the workbook to a file
     const exportFilePath = './users.xlsx';
     XLSX.writeFile(exportWorkbook, exportFilePath);

     return res.status(201).json({ message: 'success',users,exportFilePath });

}