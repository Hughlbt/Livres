const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont obligatoires.' });
    }

    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ error: 'Cet email est déjà utilisé.' });
            }

            bcrypt.hash(password, 10)
                .then(hash => {
                    const user = new User({
                        email: email,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur.' }));
                })
                .catch(error => res.status(500).json({ error: 'Erreur de hashage du mot de passe.' }));
        })
        .catch(error => res.status(500).json({ error: 'Erreur lors de la recherche d\'utilisateur.' }));
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont obligatoires.' });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: 'Erreur lors de la vérification du mot de passe.' }));
        })
        .catch(error => res.status(500).json({ error: 'Erreur lors de la recherche d\'utilisateur.' }));
};