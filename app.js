const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://Hugueslbt:ag8_Ermjt7wYSp$@cluster0.n9upm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',)
    /* J'ai supprimé 
    {useNewUrlParser: true,
    useUnifiedTopology: true,}
    car ils sont obsolètes depuis les denières versions de mongoose */

    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
}));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;