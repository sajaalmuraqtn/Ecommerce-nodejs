
import ProductRouter from './Product/product.router.js'
import CatagoriesRouter from './Catagories/catagories.router.js'
import ConnectDB from '../../DB/connection.js';

const initApp=(app,express)=>{

app.use(express.json());

app.get('/',(req,res)=>{
    return res.json('welcome...')
});
ConnectDB();
app.use('/products',ProductRouter);
app.use('/catagories',CatagoriesRouter);
app.get('*',(req,res)=>{
    return res.json({message:'page not found'})
});
}
export default initApp;