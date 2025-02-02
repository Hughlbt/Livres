const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const fileFilter = (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    if (extension === 'jpg' || extension === 'png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('image');