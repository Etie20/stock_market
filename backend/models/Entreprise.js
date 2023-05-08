const mongoose = require('mongoose');

const entrepriseSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    tailleStock: {
        type: Number,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    visibilite: {
        type: Boolean,
        default: false
    },
    telephone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numeroFiscale: {
        type: Number,
        required: false
    },
    logo: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Entreprise', entrepriseSchema);