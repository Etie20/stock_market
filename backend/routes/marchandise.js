const express = require('express');
const router = express.Router();

const categorieCtrl = require('../controllers/categorie');
const entreeCtrl = require('../controllers/entree');

//route permettant de créer une catégorie
router.post("/categorie", categorieCtrl.createCategorie);

//route permettant de faire une entrée de produit
router.post("/entree", entreeCtrl.createEntree);

module.exports = router;