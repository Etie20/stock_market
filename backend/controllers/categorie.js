const Categorie = require('../models/Categorie');

exports.createCategorie = async (req, res, next) => {
    const categorie = new Categorie({
        nom: req.body.nom
    });
    await categorie.save()
        .then(() => res.status(200).json({message: 'Catégorie créé avec succès!'}))
        .catch(error => res.status(400).json({error}))
        .catch(error => res.status(500).json({error}))
};

