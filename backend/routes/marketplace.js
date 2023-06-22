const express = require('express');
const router = express.Router();

const panierItemCtrl = require('../controllers/panierItem');
const commandeCtrl = require('../controllers/commande');
const categorieCtrl = require('../controllers/categorie');
const stockCtrl = require('../controllers/stock');
const auth = require("../middleware/auth");

//route pour ajouter une marchandise dans un panier
router.post('/panier', auth, panierItemCtrl.addMarchandise);

//route pour supprimer un produit du panier
router.delete('/panier/:id', auth, panierItemCtrl.deleteItem);

//route pour supprimer le panier d'une entreprise
router.delete('/panier/entreprise/:id', auth, panierItemCtrl.deleteCompanyCart)

//route pour mettre à jour les informations de la marchandise dans le panier
router.put('/panier/:id', auth, panierItemCtrl.updateCart);

//route pour afficher toutes les marchandises du panier d'un utilisateur
router.get('/panier/:id', auth, panierItemCtrl.getPanierByUserId);

//route pour afficher toutes les marchandises du panier d'un utilisateur en fonction de l'entreprise
router.get('/panier/:id/entreprise/:_id', auth, panierItemCtrl.getUserPanierByCompanyId);

//route pour créer une commande
router.post('/commande/:id', auth, commandeCtrl.createCommande);

//route pour mettre à jour une commande
router.put('/commande/:id', auth, commandeCtrl.updateCommande);

//route pour supprimer une commande
router.delete('/commande/:id', commandeCtrl.deleteCommande);

//route pour valider une commande
router.post('/commande/valider/:id', commandeCtrl.validerCommande);

//route pour afficher les commandes en filtrant par entreprise
router.get('/commande/entreprise/:id', commandeCtrl.getCommandesByEntreprise);

//route pour afficher les commandes en filtrant par utilisateur
router.get('/commande/utilisateur/:id', commandeCtrl.getCommandesByUserId)

//route pour afficher toutes les categories de produits
router.get('/categories', categorieCtrl.getAllCategories);

//route pour afficher tous les produits des stocks de toutes les entreprises pour le marketplace
router.get('/products', stockCtrl.getAllStocks);


module.exports = router;