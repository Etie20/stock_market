// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'une catégorie de stock avec la propriété nom
const categorieStock = mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
});

// Exporte le modèle 'Categorie' créé à partir du schéma categorieStock pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('Categorie', categorieStock);