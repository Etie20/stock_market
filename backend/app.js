// Importe le framework Express
const express = require('express');

// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

// Établit une connexion à la base de données MongoDB hébergée sur le serveur `cluster0.unj3djg.mongodb.net` avec le nom `StockMarket`
mongoose.connect('mongodb+srv://admin:test1234@cluster0.unj3djg.mongodb.net/StockMarket?retryWrites=true&w=majority',
    {
            useNewUrlParser: true, // Utilise les dernières fonctionnalités de l'API de connexion de MongoDB
            useUnifiedTopology: true // Utilise les dernières fonctionnalités de l'API de connexion de MongoDB
    })
    .then(() => console.log('Connexion à MongoDB réussie !')) // Affiche un message de confirmation dans la console si la connexion à la base de données est réussie
    .catch(() => console.log('Connexion à MongoDB échouée !')); // Affiche un message d'erreur dans la console si la connexion à la base de données échoue

//Appel des différentes routes d'api
const utilisateurRoutes = require('./routes/utilisateurs');
const entrepriseRoutes = require('./routes/entreprise');
const marchandiseRoutes = require('./routes/marchandise');

// Crée une instance d'application Express
const app = express();

// Utilise le middleware `express.json()` pour parser les requêtes HTTP avec des corps de requête JSON
app.use(express.json());

app.use('/api/auth', utilisateurRoutes);
app.use('/api/company', entrepriseRoutes);
app.use('/api/marchandise', marchandiseRoutes);


// Exporte l'application Express pour qu'elle puisse être utilisée dans d'autres fichiers
module.exports = app;