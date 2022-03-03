const multer = require('multer')

let storage = multer.diskStorage({
    // en que carpeta voy a guardar los archivos
    destination:(req, file, callback)=>{
        callback(null,__dirname+'/../public/img')
    },
    // como se van a llamar mis archivos
    filename:(req,file,callback)=>{
        callback(null, "-" + file.originalname)
    }
})

const uploader = multer({storage:storage})

module.exports=uploader