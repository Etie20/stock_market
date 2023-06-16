const mongoose = require('mongoose');

const compteSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },

    solde: {
        type: Number,
        default: 0,
    },

    depenses: {
        type: Number,
        default: 0
    },

    devise: {
        type: String,
        enum: ['XAF', 'EUR', 'USD'],
        required: true
    },

    categorieCompte: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategorieCompte',
        required: true,
    },

    entreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise',
        required: true
    }
});

module.exports = mongoose.model('Compte', compteSchema);