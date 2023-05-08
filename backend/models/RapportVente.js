const mongoose = require('mongoose');

const rapportVenteSchema = mongoose.Schema({
    commande: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commande',
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
    },

});

module.exports = mongoose.model('RapportVente', rapportVenteSchema);