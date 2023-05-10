// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'une catégorie de stock avec la propriété nom
const categorieStock = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    entreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise',
        required: true
    },
    createdDate: {
        type: Date,
        required: false
    },
    updatedDate: {
        type: Date,
        required: false
    }
});

// Exporte le modèle 'Categorie' créé à partir du schéma categorieStock pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('Categorie', categorieStock);