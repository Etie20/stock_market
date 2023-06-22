const express = require('express');
const router = express.Router();

const marchandiseCtrl = require('../controllers/marchandise');
const categorieCtrl = require('../controllers/categorie');
const entreeCtrl = require('../controllers/entree');
const sortieCtrl = require('../controllers/sortie');
const auth = require("../middleware/auth");

//route permettant d'afficher toutes les marchandises d'une entreprise
router.get("/entreprise/:id", auth, marchandiseCtrl.getAllMarchandiseByEntrepriseId);

//route permettant de mettre à jour les informations d'une marchandise
router.put("/:id", auth, marchandiseCtrl.updateMarchandise);

//route permettant de créer une catégorie
router.post("/categorie", auth, categorieCtrl.createCategorie);

//route permettant de mettre à jour une catégorie
router.put("/categorie/:id", auth, categorieCtrl.updateCategorie);

//route permettant de supprimer une catégorie
router.delete("/categorie/:id", auth, categorieCtrl.deleteCategorie);

//route permettant de faire une entrée de marchandises
router.post("/entree", auth, entreeCtrl.createEntree);

//route pour mettre à jour une entrée de marchandises
router.put("/entree/:id", auth, entreeCtrl.updateEntree);

//route pour supprimer une entrée par son identifiant
router.delete("/entree/:id", auth, entreeCtrl.deleteEntree);

//route pour afficher toutes les entrées faites par une entreprise
router.get("/entree/entreprise/:id", auth, entreeCtrl.getEntreeByEntrepriseId);

//route pour afficher une entree par son identifiant
router.get("/entree/:id", auth, entreeCtrl.getEntreeById);

//route pour valider l'entrée d'un produit
router.post("/entree/valider/:id", auth, entreeCtrl.validerEntree);

//route pour afficher toutes les entrées faites par une entreprise
router.get("/sortie/entreprise/:id", auth, sortieCtrl.getSortieByEntrepriseId);

//route permettant de faire une sortie de marchandises
router.post("/sortie", auth, sortieCtrl.createSortie);

//route permettant de supprimer une sortie
router.delete("/sortie/:id", auth, sortieCtrl.deleteSortie);

//route permettant de valider une sortie de marchandise
router.post("/sortie/valider/:id", auth, sortieCtrl.validerSortie);

//route permettant de mettre à jour les informations d'une sortie avant sa validation
router.put("/sortie/:id", auth, sortieCtrl.updateSortie);


module.exports = router;