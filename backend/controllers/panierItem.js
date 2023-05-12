const PanierItem = require('../models/PanierItem');
const Marchandise = require('../models/Marchandise');

exports.addMarchandise = async (req, res) => {
    try {
        const panier = new PanierItem({
            ...req.body,
            dateCreation: Date.now()
        });
        await panier.save();
        res.status(200).json({message: 'Panier insérer avec succès'});
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.deleteMarchandise = async (req, res) => {
    try {
        await PanierItem.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Panier supprimé avec succès'});
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
}

exports.updateMarchandise = async (req, res) => {
    try {
        await PanierItem.updateOne({ _id: req.params.id },{
            ...req.body,
            updatedDate: Date.now()
        });
        res.status(200).json({ message: 'Panier mis à jour avec succès'});
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.getPanierByUserId = async (req, res) => {
    try {
        const panier = await PanierItem.find({ utilisateur: req.params.id });
        res.status(200).json(panier);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.getPanierElementById = async (req, res) => {
    try {
        const marchandise = await PanierItem.findById({ _id: req.params.id });
        res.status(200).json(marchandise);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.getMarchandise = async (req, res) => {
    try {
        const marchandise = await Marchandise.findById({ _id: req.params.id}).populate('entreprise');
        res.status(200).json(marchandise.entreprise._id);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};
