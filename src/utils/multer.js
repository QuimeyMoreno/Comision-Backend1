const multer = require('multer')
const { dirname } = require('node:path')



const storage = multer.diskStorage({ // diskStorage es un metodo que va ayudarme a crear archivos en mi compu y le tengo que pasar dos parametros, el destino (destination) y el nombre (filname)
    destination: (req, file, callback )=>{
        callback(null, dirname(__dirname) + '/public/img')
    },
    filename:    (req, file, callback )=>{
        callback(null, `${Date.now()}-${file.originalname}`)
    }

})

const uploader = multer({
    storage
})

module.exports = {
    uploader
}