const express = require('express');
const router = express.Router();

const entrepriseCtrl = require('../controllers/entreprise');
const stockCtrl = require('../controllers/stock');
const compteCtrl = require('../controllers/compte');
const auth = require("../middleware/auth");

//route pour mettre à jour les informations de l'entreprise
router.put('/:id', auth, entrepriseCtrl.updateEntrepriseInfo);

//route pour récupérer les informations du stock de l'entreprise
router.get('/stock/:id', auth, stockCtrl.getStockByEntrepriseId);

//router pour récupérer les informations du compte de l'entreprise
router.get('/compte/:id', auth, compteCtrl.getCompteByEntreprise);

module.exports = router;

