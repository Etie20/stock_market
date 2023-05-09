// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'une entreprise avec les propriétés nom, taille de stock, localisation, visibilité, téléphone, email, numéro fiscal et logo
const entrepriseSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    tailleStock: {
        type: Number,
        default: 0
    },
    localisation: {
        type: String,
        required: true
    },
    visibilite: {
        type: Boolean,
        default: false // Par défaut, l'entreprise n'est pas visible dans le marketplace
    },
    telephone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
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

// Exporte le modèle 'Entreprise' créé à partir du schéma entrepriseSchema pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('Entreprise', entrepriseSchema);