// Importation du module mongoose
const mongoose = require('mongoose');

// Définition du schéma de la collection 'marchandise'
const marchandiseSchema = mongoose.Schema({
// Le nom de la marchandise
    nom: {
        type: String,
        require: true
    },
// Le code QR associé à la marchandise
    qr: {
        type: String,
        require: false
    },
// La description de la marchandise
    description: {
        type: String,
        require: false
    },
// L'URL de l'image de la marchandise
    image: {
        type: String,
        require: true
    },
// Les informations sur le prix de la marchandise
    prix: {
// Le prix d'achat de la marchandise
        achat: {
            type: Number,
            default: 0
        },
// Le prix de vente de la marchandise
        vente: {
            type: Number,
            default: 0
        },
// La marge bénéficiaire sur la marchandise
        marge: {
            type: Number,
            default: 0
        }
    },
// L'ID de la catégorie à laquelle appartient la marchandise
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        require: true
    }
});

// Exportation du modèle de la collection 'marchandise'
module.exports = mongoose.model('Marchandise', marchandiseSchema);