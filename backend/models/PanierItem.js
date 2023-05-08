const mongoose = require('mongoose');

const panierItemSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    marchandise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marchandise',
        required: true
    },
    quantite: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('PanierItem', panierItemSchema);