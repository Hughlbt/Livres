const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Livre', bookSchema);