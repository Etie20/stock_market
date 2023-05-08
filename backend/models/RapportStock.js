const mongoose = require('mongoose');

const rapportStockSchema = mongoose.Schema({
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true,
    },
    commentaire: {
        type: String,
        required: true
    },
    marchandiseRentable: {
        type: String,
        required: true
    },
    marchandiseMoinsRentable: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('RapportStock', rapportStockSchema);