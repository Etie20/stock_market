// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'un stock avec les propriétés marchandise, quantité totale, quantité minimale, date de péremption et emplacement
const stockSchema = mongoose.Schema({
    marchandise: {
        type: mongoose.Schema.Types.ObjectId, // La propriété marchandise est une référence à un objet marchandise stocké dans une autre collection
        ref: 'Marchandise', // La référence est faite à la collection Marchandise
        required: true
    },
    quantiteTotale: {
        type: Number,
        required: true
    },
    quantiteMinimale: {
        type: Number,
        default: 1
    },
    datePeremption: {
        type: Date,
        required: false
    },
    emplacement: {
        type: String,
        required: false
    }
});

// Exporte le modèle 'Stock' créé à partir du schéma stockSchema pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('Stock', stockSchema);