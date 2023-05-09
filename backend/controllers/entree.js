const Entree = require('../models/Entree');
const Marchandise = require('../models/Marchandise');
const Stock = require('../models/Stock');

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
        .catch(error => res.status(500).json({ error }));
    let stock = await Stock.findOne({ marchandise: marchandise._id });
    if (!stock){
        const stock = new Stock({
            marchandise: marchandise._id,
            quantiteTotale: req.body.quantite
        });
        await stock.save();
    }
    await Stock.updateOne({ marchandise: marchandise._id }, {
        $inc: { quantiteTotale: req.body.quantite } ,
        marchandise: marchandise._id
    });
};