const express = require('express');
const router = express.Router();

const marchandiseCtrl = require('../controllers/marchandise');
const categorieCtrl = require('../controllers/categorie');
const entreeCtrl = require('../controllers/entree');
const sortieCtrl = require('../controllers/sortie');

//route permettant de mettre à jour les informations d'une marchandise
router.put("/:id", marchandiseCtrl.updateMarchandise);

//route permettant de récupérer les catégories
router.get("/categorie", categorieCtrl.getCategorie);

//route permettant de créer une catégorie
router.post("/categorie", categorieCtrl.createCategorie);

//route permettant de mettre à jour une catégorie
router.put("/categorie/:id", categorieCtrl.updateCategorie);

//route permettant de supprimer une catégorie
router.delete("/categorie/:id", categorieCtrl.deleteCategorie);

//route permettant de faire une entrée de marchandises
router.post("/entree", entreeCtrl.createEntree);

//route pour mettre à jour une entrée de marchandises
router.put("/entree/:id", entreeCtrl.updateEntree);

//route pour supprimer une entrée par son identifiant
router.delete("/entree/:id", entreeCtrl.deleteEntree);

//route pour afficher toutes les entrées faites par une entreprise
router.get("/entree/entreprise/:id", entreeCtrl.getEntreeByEntrepriseId);

//route pour afficher une entree par son identifiant
router.get("/entree/:id", entreeCtrl.getEntreeById);

//route pour valider l'entrée d'un produit
router.post("/entree/valider/:id", entreeCtrl.validerEntree);

//route permettant de faire une sortie de marchandises
router.post("/sortie", sortieCtrl.createSortie);

//route permettant de valider une sortie de marchandise
router.post("/sortie/valider/:id", sortieCtrl.validerSortie);

module.exports = router;