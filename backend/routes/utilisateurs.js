const express = require('express');
const router = express.Router();

const utilisateurCtrl = require('../controllers/utilisateurs');

//route pour afficher tous les utilisateurs de la base de donnée
router.get('/utilisateurs', utilisateurCtrl.getUsers);

//route de creation d'un nouvel utilisateur pour la gestion de stock
router.post('/signup', utilisateurCtrl.signup);

//route de creation d'un nouvel utilisateur en tant que client
router.post('/signupClient', utilisateurCtrl.signupClient);

//route de connexion d'un utilisateur à la plateforme
router.post('/login', utilisateurCtrl.login);

module.exports = router;

