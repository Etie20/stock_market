const mongoose = require('mongoose');

const entreeSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        require: true
    },
    marchandise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marchandise',
        require: true
    },
    quantite: {
        type: Number,
        require: true
    },
    dateEntree: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Entree', entreeSchema);