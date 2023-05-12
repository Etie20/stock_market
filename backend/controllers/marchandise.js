const Marchandise = require('../models/Marchandise');

exports.updateMarchandise = async (req, res) => {
    try {
        await Marchandise.updateOne({ _id: req.params.id },{
            ...req.body
        });
        res.status(200).json({ message: "Marchandise mise à jour!" })
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }

}