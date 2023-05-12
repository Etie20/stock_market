const Entreprise = require('../models/Entreprise');
const Utilisateur = require('../models/Utilisateur');
const Categorie = require('../models/Categorie');

exports.updateEntrepriseInfo = (req, res) => {
    try {
        Entreprise.updateOne({_id: req.params.id}, {...req.body} );
            res.status(200).json({ message: 'Entreprise modifié !'});
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.createEntreprise = async (req, res) => {
    try {
        const entreprise = await Entreprise.findOne({nom: req.body.nom, localisation: req.body.localisation});
        if (!entreprise) {
            try {
                const newEntreprise = new Entreprise({
                    ...req.body
                });
                await newEntreprise.save();
                res.status(200).json({message: 'Entreprise insérée avec succès!'});
            } catch (error) {
                res.status(400).json({error: "Invalid request body"});
            }
        } else {
            res.status(409).json({message: 'Cette entreprise existe déjà!'});
        }
    } catch (error) {
        res.status(500).json({error: "Server error"});
    }
};

exports.deleteEntreprise = async (req, res) => {
    try {
        await Entreprise.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Entreprise supprimé avec succès!' });
        Utilisateur.deleteOne({ entreprise: req.params.id });
        Categorie.deleteOne({ entreprise: req.params.id });
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};



