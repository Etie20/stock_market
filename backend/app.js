const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:test1234@cluster0.unj3djg.mongodb.net/StockMarket?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



const app = express();

app.use(express.json());


module.exports = app;