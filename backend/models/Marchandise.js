const mongoose = require('mongoose');

const marchandiseSchema = mongoose.Schema({
    nom: {
        type: String,
        require: true
    },
    qr: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: false
    },
    image: {
        type: String,
        require: true
    },
    prix: {
        achat: {
            type: Number,
            default: 0
        },
        vente: {
            type: Number,
            default: 0
        },
        marge: {
            type: Number,
            default: 0
        }
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        require: true
    }
});

module.exports = mongoose.model('Marchandise', marchandiseSchema);