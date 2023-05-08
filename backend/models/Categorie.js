const mongoose = require('mongoose');

const categorieStock = mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Categorie', categorieStock);