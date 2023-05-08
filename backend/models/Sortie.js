const mongoose = require('mongoose');

const sortieSchema = mongoose.Schema({
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Utilisateur',
      required: true
    },
    marchandise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marchandise',
        required: true,
    },
    quantite: {
        type: Number,
        required: true
    },
    dateSortie: {
        type: Date,
        default: Date.now
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
        default: false
    }
});

module.exports = mongoose.model('Sortie', sortieSchema);