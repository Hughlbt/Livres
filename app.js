const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Livre = require('./models/Livre');

mongoose.connect('mongodb+srv://Hugueslbt:ag8_Ermjt7wYSp$@cluster0.n9upm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',)
    /* J'ai supprimé 
    {useNewUrlParser: true,
    useUnifiedTopology: true,}
    car ils sont obsolètes depuis les denières versions de mongoose */

    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/books', (req, res, next) => {
    delete req.body._id;
    const livre = new Livre({
        ...req.body
    });
    livre.save()
        .then(() => res.status(201).json({ message: 'Livre ajouté !' }))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/books/:id', (req, res, next) => {
    Livre.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/books/:id', (req, res, next) => {
    Livre.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/books/:id', (req, res, next) => {
    Livre.findOne({ _id: req.params.id })
        .then((livre) => res.status(200).json(livre))
        .catch(error => res.status(404).json({ error }));
});

app.get('/api/books', (req, res, next) => {
    Livre.find()
        .then(livres => res.status(200).json(livres))
        .catch(error => res.status(400).json({ error }));
});


app.post('/api/books/:id/rating', (req, res, next) => {

});

module.exports = app;