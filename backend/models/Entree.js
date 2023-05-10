// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'une entrée avec les propriétés utilisateur, marchandise, quantité et date d'entrée
const entreeSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId, // La propriété utilisateur est une référence à un objet utilisateur stocké dans une autre collection
        ref: 'Utilisateur', // La référence est faite à la collection Utilisateur
        require: true
    },
    marchandise: {
        type: mongoose.Schema.Types.ObjectId, // La propriété marchandise est une référence à un objet marchandise stocké dans une autre collection
        ref: 'Marchandise', // La référence est faite à la collection Marchandise
        require: true
    },
    entreprise: {
        type: mongoose.Schema.Types.ObjectId, // La propriété marchandise est une référence à un objet marchandise stocké dans une autre collection
        ref: 'Entreprise', // La référence est faite à la collection Marchandise
        require: true
    },
    quantite: {
        type: Number,
        require: true
    },
    dateEntree: {
        type: Date,
        default: Date.now // Par défaut, la propriété dateEntree est la date et l'heure actuelles
    },
    dateModification: {
        type: Date,
        required: false

    },
    validation: {
        type: Boolean,
        default: false
    }
});

// Exporte le modèle 'Entree' créé à partir du schéma entreeSchema pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('Entree', entreeSchema);