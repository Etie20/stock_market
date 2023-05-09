const express = require('express');
const router = express.Router();

const entrepriseCtrl = require('../controllers/entreprise');

//route pour mettre à jour les informations de l'entreprise
router.put('/:id', entrepriseCtrl.updateEntrepriseInfo);

//route pour afficher tous les utilisateurs de la base de donnée
// router.get('/entreprises', utilisateurCtrl.getUsers);

//route de creation d'un nouvel utilisateur
// router.post('/', entrepriseCtrl.createEntreprise);

module.exports = router;

