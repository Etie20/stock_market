const express = require('express');
const router = express.Router();

const entrepriseCtrl = require('../controllers/entreprise');
const stockCtrl = require('../controllers/stock');
const compteCtrl = require('../controllers/compte');

//route pour mettre à jour les informations de l'entreprise
router.put('/:id', entrepriseCtrl.updateEntrepriseInfo);

//route pour récupérer les informations du stock de l'entreprise
router.get('/stock/:id', stockCtrl.getStockByEntrepriseId);

//router pour récupérer les informations du compte de l'entreprise
router.get('/compte/:id', compteCtrl.getCompteByentreprise);

module.exports = router;

