import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { hashString } from "../utils/cryptoUtil.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const streamFile = (req, res) => {
    const filePath = path.join(__dirname, "../files/largeFile.txt")

    if(!fs.existsSync(filePath)){
        return res.status(404).join({message: "File Not Found"})
    }
    console.log("Hashed string:", hashString("Sample String"));
         //This is for download the file
    res.setHeader("Content-Disposition","attachment; filename=largeFile.txt")

    const readStream = fs.createReadStream(filePath)
    readStream.pipe(res)

    readStream.on("error",(err)=> {
        console.log("Erorr reading File",err)
        res.status(500).end("Error reading File")
    })
}

