const PanierItem = require('../models/PanierItem');
const Marchandise = require('../models/Marchandise');

exports.addMarchandise = async (req, res) => {
    try {
        const panier = new PanierItem({
            ...req.body,
            dateCreation: Date.now()
        });
        await panier.save();
        res.status(200).json({ success: 1, message: 'Produit ajouté avec succès'});
    } catch (error) {
        res.status(400).json({ success: 0, error: "Invalid request body"});
    }
};

exports.deleteItem = async (req, res) => {
    try {
        await PanierItem.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: 1, message: 'Produit supprimé du panier supprimé avec succès'});
    } catch (error) {
        res.status(400).json({ success: 0, error: "Invalid request body"});
    }
}


exports.deleteCompanyCart = async (req, res) => {
    try {
        await PanierItem.deleteMany({ entreprise: req.params.id, utilisateur: req.body.userId });
        res.status(200).json({ success: 1, message: 'Panier supprimé avec succès'})
    } catch (error) {
        res.status(400).json({ success: 0, error: "Invalid request body"});
    }
}

exports.updateCart = async (req, res) => {
    try {
        await PanierItem.updateOne({ _id: req.params.id },{
            ...req.body,
            updatedDate: Date.now()
        });
        res.status(200).json({ success: 1, message: 'Panier mis à jour avec succès'});
    } catch (error) {
        res.status(400).json({ success: 0, error: "Invalid request body"});
    }
};

exports.getPanierByUserId = async (req, res) => {
    try {
        const panier = await PanierItem.find({ utilisateur: req.params.id })
            .populate('marchandise')
            .populate('entreprise');
        res.status(200).json(panier);
    } catch (error) {
        res.status(400).json({ success: 0, error: "Invalid request body"});
    }
};

exports.getUserPanierByCompanyId = async (req, res) => {
    try {
        const panier = await PanierItem.find({ utilisateur: req.params.id, entreprise: req.params._id})
            .populate('marchandise')
            .populate('entreprise');
        res.status(200).json(panier);
    } catch (e) {
        res.status(400).json({ success: 0, error: "Invalid request body"});
    }
}


exports.getPanierElementById = async (req, res) => {
    try {
        const marchandise = await PanierItem.findById({ _id: req.params.id });
        res.status(200).json(marchandise);
    } catch (error) {
        res.status(400).json({ success: 0, error: "Invalid request body"});
    }
};

exports.getMarchandise = async (req, res) => {
    try {
        const marchandise = await Marchandise.findById({ _id: req.params.id}).populate('entreprise');
        res.status(200).json(marchandise.entreprise._id);
    } catch (error) {
        res.status(400).json({ success: 0, error: "Invalid request body"});
    }
};
