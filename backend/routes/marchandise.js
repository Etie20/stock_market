const express = require('express');
const router = express.Router();

const categorieCtrl = require('../controllers/categorie');
const entreeCtrl = require('../controllers/entree');
const sortieCtrl = require('../controllers/sortie');

//route permettant de créer une catégorie
router.post("/categorie", categorieCtrl.createCategorie);

//route permettant de faire une entrée de marchandises
router.post("/entree", entreeCtrl.createEntree);

//route permettant de faire une sortie de marchandises
router.post("/sortie", sortieCtrl.createSortie);

//rroute permettant de valider une sortie de marchandise
router.post("/sortie/valider/:id", sortieCtrl.validerSortie);

module.exports = router;