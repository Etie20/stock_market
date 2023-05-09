// Importation du module mongoose
const mongoose = require('mongoose');

// Définition du schéma de la collection 'commande'
const commandeSchema = mongoose.Schema({
// L'ID de l'utilisateur qui a passé la commande
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
// Les articles commandés avec leur quantité respective
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
// Date de la commande
    date: {
        type: Date,
        default: Date.now
    },
// Le coût total de la commande
    total: {
        type: Number,
        required: true
    },
// L'adresse de livraison de la commande
    adresseLivraison: {
        type: String,
        required: true
    },
// Le statut de la commande
    statut: {
        type: String,
        enum: ['En attente', 'En cours de livraison', 'Livre'],
        default: 'En attente'
    }
});

// Exportation du modèle de la collection 'commande'
module.exports = mongoose.model('Commande', commandeSchema);