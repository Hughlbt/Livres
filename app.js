const express = require('express');
const mongoose = require('mongoose');
const app = express();
const stuffRoutes = require('./routes/stuff');

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

app.use('/api/stuff', stuffRoutes);

module.exports = app;