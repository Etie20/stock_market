// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'un élément de panier avec les propriétés utilisateur, marchandise et quantité
const panierItemSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId, // La propriété utilisateur est une référence à un objet utilisateur stocké dans une autre collection
        ref: 'Utilisateur', // La référence est faite à la collection Utilisateur
        required: true
    },
    marchandise: {
        type: mongoose.Schema.Types.ObjectId, // La propriété marchandise est une référence à un objet marchandise stocké dans une autre collection
        ref: 'Marchandise', // La référence est faite à la collection Marchandise
        required: true
    },
    entreprise: {
        type: mongoose.Schema.Types.ObjectId, // La propriété utilisateur est une référence à un objet utilisateur stocké dans une autre collection
        ref: 'Entreprise', // La référence est faite à la collection Utilisateur
        required: true
    },
    quantite: {
        type: Number,
        required: true
    },
    dateCreation: {
        type: Date,
        required: false
    },
    updatedDate: {
        type: Date,
        required: false
    }
});

// Exporte le modèle 'PanierItem' créé à partir du schéma panierItemSchema pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('PanierItem', panierItemSchema);