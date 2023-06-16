const Compte = require('../models/Compte');

exports.addCompte = async (req, res) => {
    try {
        const compte = new Compte({
            ...req.body
        });
        await compte.save();
        res.status(200).json({success: 0, message: 'compte enregistré'});
    } catch (e) {
        res.status(400).json({success: 0, message: 'invalid request body!'});
    }
}

exports.getCompteByEntreprise = async (req, res) => {
    try {
        const compte = await Compte.findOne({ entreprise: req.params.id});
        res.status(200).json(compte);
    } catch (e) {
        res.status(400).json({success: 0, message: 'invalid request body!'});
    }
}