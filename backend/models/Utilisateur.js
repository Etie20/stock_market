// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Définit le schéma d'un utilisateur avec les propriétés nom, email, motDePasse, statut, role, telephone et Adresse
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
        enum: ['employe', 'admin', 'superAdmin', 'client'], // La propriété statut doit être l'une de ces valeurs
        required: true
    },
    role: {
        type: String,
        enum: ['none', 'gestionnaire', 'comptable'], // La propriété role doit être l'une de ces valeurs
        default: 'none' // Par défaut, la propriété role est 'none'
    },
    telephone: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    entreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise',
        required: false
    }
});

// Exporte le modèle 'Utilisateur' créé à partir du schéma utilisateurSchema pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = mongoose.model('Utilisateur', utilisateurSchema);