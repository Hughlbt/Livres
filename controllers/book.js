const Book = require('../models/Livre');
const fs = require('fs');

exports.getBestRating = (req, res) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(500).json({ error: 'Erreur lors de la récupération des livres.' }));
};

exports.addBook = (req, res, next) => {
    console.log(req.body);
    console.log(req.body.book);
    console.log(JSON.parse(req.body.book));
    const bookObject = { ...JSON.parse(req.body.book) };
    delete bookObject._id;
    delete bookObject.userId;
    console.log(bookObject);

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: req.file
            ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            : bookObject.imageUrl
    });
    console.log(book);
    book.save()
        .then(() => { res.status(201).json({ message: 'Livre ajouté !' }) })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        });
};
exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                console.log('userId du book:', book.userId);
                console.log('userId du token:', req.auth.userId);
                return res.status(401).json({ message: 'Not authorized' });
            } else {
                console.log('Image URL:', book.imageUrl);
                const filename = book.imageUrl.split('/images/')[1];
                console.log('Nom du fichier:', filename);

                fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
                    }
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({ message: 'Livre supprimé !' });
                        })
                        .catch(error => {
                            res.status(500).json({ error: 'Erreur lors de la suppression du livre' });
                        });
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.rateBook = (req, res, next) => {
    const { rating } = req.body;
    if (rating === undefined || rating < 0 || rating > 5) {
        return res.status(400).json({ message: "La note doit être un nombre entre 0 et 5." });
    }

    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }

            Book.updateOne(
                { _id: req.params.id },
                { $set: { rating: rating } }
            )
                .then(() => res.status(200).json({ message: "Note mise à jour !" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/* Juste pour la phase de dev à supprimer */
exports.deleteAll = (req, res) => {
    Book.deleteMany({})
        .then(() => {
            res.status(200).json({ message: 'Tous les livres ont été supprimés.' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Erreur lors de la suppression des livres', error: err });
        });
};