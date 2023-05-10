const PanierItem = require('../models/PanierItem');

exports.addMarchandise = async (req, res, next) => {
    const panier = new PanierItem({
        ...req.body,
        dateCreation: Date.now()
    });
    await panier.save()
        .then(() => res.status(200).json({ message: 'Produit insérer avec succès'}))
        .catch(error => res.status(400).json({ error }))
};

exports.deleteMarchandise = async (req, res, next) => {
    await PanierItem.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Produit supprimé avec succès'}))
        .catch(error => res.status(400).json({ error }))
}

exports.updateMarchandise = async (req, res, next) => {
    await PanierItem.updateOne({ _id: req.params.id },{
        ...req.body,
        updatedDate: Date.now()
    })
        .then(() => res.status(200).json({ message: 'Produit mis à jour avec succès'}))
        .catch(error => res.status(400).json({ error }))
};

exports.getPanierByUserId = async (req, res, next) => {
    await PanierItem.find({ utilisateur: req.params.id })
        .then(panier => res.status(200).json(panier))
        .catch(error => res.status(400).json({ error }))
};

exports.getPanierElementById = async (req, res, next) => {
    await PanierItem.findById({ _id: req.params.id })
        .then(marchandise => res.status(200).json(marchandise))
        .catch(error => res.status(400).json({ error }))
}

