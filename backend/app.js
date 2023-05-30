// Importe le framework Express
const express = require('express');

// Importe la bibliothèque Mongoose pour interagir avec MongoDB
const mongoose = require('mongoose');

const cors = require('cors');

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
const marketplaceRoutes = require('./routes/marketplace');

// Crée une instance d'application Express
const app = express();

app.use(cors());


// Autoriser plusieurs origines d'accès
app.use(cors({ origin: ['http://localhost:3000', 'https://stocket-market-api.onrender.com'] }));

//Autoriser tous les verbes HTTP
app.use(cors({ methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }));

// Autoriser les en-têtes personnalisés
app.use(cors({ allowedHeaders: ['Content-Type', 'Authorization'] }));

// Autoriser les cookies
app.use(cors({ credentials: true }));


// Utilise le middleware `express.json()` pour parser les requêtes HTTP avec des corps de requête JSON
app.use(express.json());


app.use('/v1/users', utilisateurRoutes);
app.use('/v2/company', entrepriseRoutes);
app.use('/v3/product', marchandiseRoutes);
app.use('/v4/marketplace', marketplaceRoutes);




// Exporte l'application Express pour qu'elle puisse être utilisée dans d'autres fichiers
module.exports = app;