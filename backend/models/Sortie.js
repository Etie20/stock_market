// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'une sortie avec les propriétés utilisateur, marchandise, quantité, date de sortie, justification, image et validation
const sortieSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId, // La propriété utilisateur est une référence à un objet utilisateur stocké dans une autre collection
        ref: 'Utilisateur', // La référence est faite à la collection Utilisateur
        required: true
    },
    marchandise: {
        type: mongoose.Schema.Types.ObjectId, // La propriété marchandise est une référence à un objet marchandise stocké dans une autre collection
        ref: 'Marchandise', // La référence est faite à la collection Marchandise
        required: true,
    },
    entreprise: {
        type: mongoose.Schema.Types.ObjectId, // La propriété marchandise est une référence à un objet marchandise stocké dans une autre collection
        ref: 'Entreprise', // La référence est faite à la collection Marchandise
        required: true,
    },
    quantite: {
        type: Number,
        required: true
    },
    dateSortie: {
        type: Date,
        default: Date.now // Par défaut, la propriété dateSortie est la date et l'heure actuelles
    },
    dateModification: {
        type: Date,
        required: false
    },
    justification: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    validation: {
        type: Boolean,
        default: false // Par défaut, la sortie n'est pas validée
    }
});

// Exporte le modèle 'Sortie' créé à partir du schéma sortieSchema pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('Sortie', sortieSchema);