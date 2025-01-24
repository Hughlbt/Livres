const express = require('express');
const router = express.Router();

const Livre = require('../models/Livre');

router.post('/', (req, res, next) => {
    delete req.body._id;
    const livre = new Livre({
        ...req.body
    });
    livre.save()
        .then(() => res.status(201).json({ message: 'Livre ajouté !' }))
        .catch(error => res.status(400).json({ error }));
});

router.put('/:id', (req, res, next) => {
    Livre.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', (req, res, next) => {
    Livre.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

router.get('/:id', (req, res, next) => {
    Livre.findOne({ _id: req.params.id })
        .then((livre) => res.status(200).json(livre))
        .catch(error => res.status(404).json({ error }));
});

router.get('/', (req, res, next) => {
    Livre.find()
        .then(livres => res.status(200).json(livres))
        .catch(error => res.status(400).json({ error }));
});


router.post('/:id/rating', (req, res, next) => {

});


module.exports = router;