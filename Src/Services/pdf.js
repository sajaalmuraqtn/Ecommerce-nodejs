//Required package
import pdf from "pdf-creator-node";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { options } from "./option.js";
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename)
// Read HTML Template

export const createPdf =(users,fileName,req,res)=>{
    const htmlPath=join(__dirname,'../../Templates/pdf.html');
    const html=fs.readFileSync(htmlPath,'utf8');
    var document = {
        html: html,
        data: {
          users:users ,
        },
        path: `./${fileName}`,
        type: "",
      };
    pdf.create(document,options).then(()=>{
        return res.send(`<a download href='${req.protocol}://${req.headers.host}/userPdf/${fileName}'>Download</a>`)
    });
    
    }
