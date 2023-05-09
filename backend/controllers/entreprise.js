const Entreprise = require('../models/Entreprise');

exports.updateEntrepriseInfo= (req, res, next) => {
    Entreprise.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Entreprise modifié !'}))
        .catch(error => res.status(400).json({error}));
};

exports.createEntreprise = (req, res, next) => {
    Entreprise.findOne({ nom: req.body.nom, localisation: req.body.localisation })
        .then(entreprise => {
            if (!entreprise){
                const newEntreprise = new Entreprise ({
                    ...req.body
                });
                newEntreprise.save()
                    .then(() => res.status(200).json({ message: 'Entreprise insérée avec succès!' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(409).json({ message: 'Cette entreprise existe déjà!' });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

