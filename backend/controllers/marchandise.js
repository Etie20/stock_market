const Marchandise = require('../models/Marchandise');

exports.updateMarchandise = async (req, res) => {
    try {
        await Marchandise.updateOne({ _id: req.params.id },{
            ...req.body,
            updatedDate: Date.now()
        });
        res.status(200).json({ message: "Marchandise mise à jour!" });
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
}

exports.getAllMarchandiseByEntrepriseId = async (req, res) => {
    try {
        const marchandises = await Marchandise.find({ entreprise: req.params.id})
            .populate('entreprise')
            .populate('categorie');
        res.status(200).json(marchandises);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
}