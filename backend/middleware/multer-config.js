const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = req.file.originalname.split(' ').login('_');
        const extension = MIME_TYPES[req.file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});


module.exports = multer({storage: storage}).single('image');