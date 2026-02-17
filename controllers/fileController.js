const fs = require("fs")
const path = require("path")
const {hashString} = require("../utils/cryptoUtil") 


 const streamFile = (req, res) => {
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
module.exports = { streamFile };
