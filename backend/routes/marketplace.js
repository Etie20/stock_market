const express = require('express');
const router = express.Router();

const panierItemCtrl = require('../controllers/panierItem');
const commandeCtrl = require('../controllers/commande');
const categorieCtrl = require('../controllers/categorie');
const stockCtrl = require('../controllers/stock');

//route pour ajouter une marchandise dans un panier
router.post('/panier', panierItemCtrl.addMarchandise);

//route pour supprimer un produit du panier
router.delete('/panier/:id', panierItemCtrl.deleteMarchandise);

//route pour mettre à jour les informations de la marchandise dans le panier
router.put('/panier/:id', panierItemCtrl.updateMarchandise);

//route pour afficher toutes les marchandises du panier d'un utilisateur
router.get('/panier/:id', panierItemCtrl.getPanierByUserId);

//route pour créer une commande
router.post('/commande/:id', commandeCtrl.createCommande);

//route pour valider une commande
router.post('/commande/valider/:id', commandeCtrl.validerCommande);

//route pour afficher les commandes en filtrant par entreprise
router.get('/commande/entreprise/:id', commandeCtrl.getCommandesByEntreprise);

//route pour afficher toutes les categories de produits
router.get('/categories', categorieCtrl.getAllCategories);

//route pour afficher tous les produits des stocks de toutes les entreprises pour le marketplace
router.get('/products', stockCtrl.getAllStocks);


module.exports = router;