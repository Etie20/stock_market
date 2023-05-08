const mongoose = require('mongoose');

const commandeSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    articles: {
        type: [{
            marchandise: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Marchandise',
                required: true
            },
            quantite: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    adresseLivraison: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        enum: ['En attente', 'En cours de livraison', 'Livre'],
        default: 'En attente'
    }
});

module.exports = mongoose.model('Commande', commandeSchema);