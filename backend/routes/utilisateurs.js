const express = require('express');
const router = express.Router();

const utilisateurCtrl = require('../controllers/utilisateurs');

//route pour afficher tous les utilisateurs en filtrant par l'id de l'entreprise
router.get('/entreprise/:id', utilisateurCtrl.getUsersByEntrepriseId);

//route pour afficher un utilisateur en filtrant par son id
router.get('/:id', utilisateurCtrl.getUserById);

//route pour mettre à jour les informations d'un utilisateur
router.put('/:id', utilisateurCtrl.updateUsers);

//route pour supprimer un utilisateur
router.delete('/:id', utilisateurCtrl.deleteUser);

//route de creation d'un nouvel utilisateur pour la gestion de stock
router.post('/auth/signup', utilisateurCtrl.signup);

//route de creation d'un nouvel utilisateur en tant que client
router.post('/auth/signupClient', utilisateurCtrl.signupClient);

//route de connexion d'un utilisateur à la plateforme
router.post('/auth/login', utilisateurCtrl.login);

module.exports = router;

