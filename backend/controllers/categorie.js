const Categorie = require('../models/Categorie');

exports.createCategorie = async (req, res, next) => {
    const categorie = new Categorie({
        nom: req.body.nom,
        entreprise: req.body.entrepriseId,
        utilisateur: req.body.userId,
        createdDate: Date.now()
    });
    await categorie.save()
        .then(() => res.status(200).json({message: 'Catégorie créé avec succès!'}))
        .catch(error => res.status(400).json({error}))
        .catch(error => res.status(500).json({error}))
};

exports.updateCategorie = async (req, res, next) => {
    Categorie.updateOne({ _id: req.params.id }, {
        nom: req.body.nom,
        entreprise: req.body.entrepriseId,
        utilisateur: req.body.userId,
      updatedDate: Date.now()
    })
        .then(() => res.status(200).json({ message: 'Catégorie modifié !'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteCategorie = async (req, res, next) => {
    Categorie.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Catégorie Supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getCategorie = async (req, res, next) => {
    Categorie.find()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(400).json({ error }));
};