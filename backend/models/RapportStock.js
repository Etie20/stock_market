// Importation du module mongoose
const mongoose = require('mongoose');

// Définition du schéma de la collection 'rapportStock'
const rapportStockSchema = mongoose.Schema({
// L'ID du stock associé au rapport
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true,
    },
// Le commentaire associé au rapport
    commentaire: {
        type: String,
        required: true
    },
// La marchandise la plus rentable selon le rapport
    marchandiseRentable: {
        type: String,
        required: true
    },
// La marchandise la moins rentable selon le rapport
    marchandiseMoinsRentable: {
        type: String,
        required: true
    }
});

// Exportation du modèle de la collection 'rapportStock'
module.exports = mongoose.model('RapportStock', rapportStockSchema);