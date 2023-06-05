const Categorie = require('../models/Categorie');

exports.createCategorie = async (req, res) => {
    try {
        const categorie = new Categorie({
            nom: req.body.nom,
            entreprise: req.body.entrepriseId,
            utilisateur: req.body.userId,
            createdDate: Date.now()
        });
        await categorie.save();
        res.status(200).json({message: 'Catégorie créé avec succès!'});
    } catch(error){
        res.status(400).json({ success: 0, message: "Invalid request body" });
    }
};

exports.updateCategorie = async (req, res) => {
    try{
        Categorie.updateOne({ _id: req.params.id }, {
            nom: req.body.nom,
            entreprise: req.body.entrepriseId,
            utilisateur: req.body.userId,
            updatedDate: Date.now()
        });
        res.status(200).json({ message: 'Catégorie modifié !'})
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body" })
    }
};

exports.deleteCategorie = async (req, res) => {
    try {
        Categorie.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Catégorie Supprimé !'});
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body" });
    }
};

exports.getAllCategories = async (req, res) => {
    try{
        const categories = await Categorie.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body" });
    }

};