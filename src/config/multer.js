import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,"uploads/")
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname)
        const uniqueName = Date.now() + ext
        cb(null,uniqueName)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }else{
        cb(new Error("Only image files are allowed!"),false)
    }
}

const limits = {
    fileSize: 2 * 1024 * 1024
}

export const upload = multer({
    storage,
    fileFilter,
    limits
})