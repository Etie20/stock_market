const mongoose = require('mongoose');

const categorieCompteSchema = mongoose.Schema({
    nom: {
        type: String,
        enum: ['Tresorie','Revenus', 'Depenses', 'Actifs', 'Passifs'],
        required: true,
    }
});

module.exports = mongoose.model('CategorieCompte', categorieCompteSchema);