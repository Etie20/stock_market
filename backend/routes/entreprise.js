const express = require('express');
const router = express.Router();

const entrepriseCtrl = require('../controllers/entreprise');
const stockCtrl = require('../controllers/stock');

//route pour mettre à jour les informations de l'entreprise
router.put('/:id', entrepriseCtrl.updateEntrepriseInfo);

//route pour récupérer les informations du stock de l'entreprise
router.get('/stock/:id', stockCtrl.getStockByEntrepriseId);

module.exports = router;

