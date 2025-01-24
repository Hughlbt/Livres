const Livre = require('../models/Livre');

exports.addLivre = (req, res, next) => {
    delete req.body._id;
    const book = new Livre({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyLivre = (req, res, next) => {
    Livre.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteLivre = (req, res, next) => {
    Livre.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneLivre = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllLivres = (req, res, next) => {
    Livre.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};