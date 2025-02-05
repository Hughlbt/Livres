const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

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
    if (extension) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({ storage, fileFilter }).single('image');

const uploadAndOptimize = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });

        if (!req.file) return res.status(400).json({ error: 'Aucune image fournie' });

        try {
            const imagePath = req.file.path;
            const optimizedImageName = 'optimized-' + req.file.filename.split('.')[0] + '.webp';
            const optimizedImagePath = path.join('images', optimizedImageName);

            await sharp(imagePath)
                .resize(206, 260, { fit: 'cover' })
                .webp({ quality: 80 })
                .toFile(optimizedImagePath);

            fs.unlink(imagePath, (err) => {
                if (err) console.error("Erreur lors de la suppression de l'image originale :", err);
            });

            req.file.filename = optimizedImageName;
            req.file.path = optimizedImagePath;

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erreur lors de l\'optimisation de l\'image' });
        }
    });
};

module.exports = uploadAndOptimize;
