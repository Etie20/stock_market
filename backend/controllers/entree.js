const Entree = require('../models/Entree');
const Marchandise = require('../models/Marchandise');

exports.createEntree = async (req, res, next) => {
    let marchandise = await Marchandise.findOne({ nom: req.body.nom } );
    if (!marchandise) {
        marchandise = new Marchandise({
            ...req.body
        });
        await marchandise.save();
    }
    const entree = new Entree ({
        utilisateur: req.body.userId,
        marchandise: marchandise._id,
        quantite: req.body.quantite
    });
    await entree.save()
        .then(() => res.status(200).json({ message: "Entree crée!" }))
        .catch(error => res.status(400).json({ error }))
        .catch(error => res.status(500).json({ error }))
};