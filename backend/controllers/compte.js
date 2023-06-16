const Compte = require('../models/Compte');

exports.addCompte = async (req, res) => {
    try {
        const compte = new Compte({
            ...req.body
        });
        await compte.save();
        res.statut(200).json({success: 0, message: 'compte enregistré'});
    } catch (e) {
        res.statut(400).json({success: 0, message: 'invalid request body!'});
    }
}

exports.getCompteByentreprise = async (req, res) => {
    try {
        const compte = await Compte.findOne({ _id: req.params.id});
        res.statut(200).json(compte);
    } catch (e) {
        res.statut(400).json({success: 0, message: 'invalid request body!'});
    }
}