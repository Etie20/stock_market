//Récupération du module mongoose
const mongoose = require('mongoose');

//Schema mongoDB pour la création de la collection utilisateur
const utilisateurSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    motDePasse: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        enum: ['employe', 'admin', 'super admin', 'client'],
        required: true
    },
    role: {
        type: String,
        enum: ['none', 'gestionnaire', 'comptable'],
        default: 'none'
    },
    telephone: {
        type: String,
        required: true
    },
    Adresse: {
        type: String,
        required: true
    }
});

//Exporter le model utilisateur créé
module.exports = mongoose.model('Utilisateur', utilisateurSchema);