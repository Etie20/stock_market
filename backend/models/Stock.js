const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    marchandise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marchandise',
        required: true
    },
    quantiteTotale: {
        type: Number,
        required: true
    },
    quantiteMinimale: {
        type: Number,
        required: true
    },
    datePeremption: {
        type: Date,
        required: true
    },
    emplacement: {
        type: String,
        required: false
    },

});

module.exports = mongoose.model('Stock', stockSchema);