const express = require('express');
const router = express.Router();

const utilisateurCtrl = require('../controllers/utilisateurs');

//route pour afficher tous les utilisateurs en filtrant par l'id de l'entreprise
router.get('/utilisateurs/:id', utilisateurCtrl.getUsersByEntrepriseId);

//route pour afficher tous un utilisateur en filtrant par son id
router.get('/utilisateur/:id', utilisateurCtrl.getUserById);

//route pour mettre à jour les informations d'un utilisateur
router.put('/utilisateur/:id', utilisateurCtrl.updateUsers);

//route pour supprimer un utilisateur
router.delete('/utilisateur/:id', utilisateurCtrl.deleteUser);

//route de creation d'un nouvel utilisateur pour la gestion de stock
router.post('/auth/signup', utilisateurCtrl.signup);

//route de creation d'un nouvel utilisateur en tant que client
router.post('/auth/signupClient', utilisateurCtrl.signupClient);

//route de connexion d'un utilisateur à la plateforme
router.post('/auth/login', utilisateurCtrl.login);

module.exports = router;

