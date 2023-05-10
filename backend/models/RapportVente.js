// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'un rapport de vente avec les propriétés commande, quantité, prix total et commentaire
const rapportVenteSchema = mongoose.Schema({
// L'entreprise qui insère la marchandise
    entreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise',
        required: true
    },
    commande: {
        type: mongoose.Schema.Types.ObjectId, // La propriété commande est une référence à un objet commande stocké dans une autre collection
        ref: 'Commande', // La référence est faite à la collection Commande
        required: true
    },
    quantite: {
        type: Number,
        required: true
    },
    prixTotal: {
        type: Number,
        required: true
    },
    commentaire: {
        type: String,
        required: false
    }
});

// Exporte le modèle 'RapportVente' créé à partir du schéma rapportVenteSchema pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('RapportVente', rapportVenteSchema);