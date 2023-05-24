const Entree = require('../models/Entree');
const Marchandise = require('../models/Marchandise');
const Stock = require('../models/Stock');

exports.createEntree = async (req, res) => {
    try {
        let marchandise = await Marchandise.findOne({ nom: req.body.nom } );
        let quantite = Number(req.body.quantite);

        if (!marchandise) {
            marchandise = new Marchandise({
                entreprise: req.body.entreprise,
                nom: req.body.nom,
                qr: req.body.qr,
                description: req.body.description,
                image: req.body.image,
                categorie: req.body.categorie
            });
            await marchandise.save();
        }
        const entree = new Entree ({
            utilisateur: req.body.utilisateur,
            marchandise: marchandise._id,
            entreprise: req.body.entreprise,
            quantite: quantite,
            dateEntree: Date.now()
        });
        await entree.save();
        res.status(200).json({ success: 1, message: "Entrée crée!" });
        let stock = await Stock.findOne({ marchandise: marchandise._id });
        if (!stock){
            const stock = new Stock({
                marchandise: marchandise._id,
                quantiteTotale: quantite
            });
            await stock.save();
        }
        await Stock.updateOne({ marchandise: marchandise._id }, {
            $inc: { quantiteTotale: quantite } ,
            marchandise: marchandise._id
        });
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }

};

exports.validerEntree = async (req, res) => {
    try{
        const entreeId = req.params.id;

        const entrees =  await Entree.findByIdAndUpdate(entreeId, {validation: true}, {new: true})
            .populate('marchandise');
        if (!entrees) {
            res.status(404).json({ success: 0, message: "Marchandise inexistante"});
        }
        await Stock.findByIdAndUpdate(
            entrees.marchandise._id,
            {
                updatedDate: Date.now(),
                $inc: {quantiteTotale: entrees.quantite}
            },
            {
                new: true
            });
        res.status(200).json({ success: 1, message: "Entrée Validé!"});

    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};

exports.updateEntree = async (req, res) => {
    try {
        await Entree.updateOne({ _id: req.params.id },
            {...req.body, dateModification: Date.now()}
        );
        res.status(200).json({ success: 1, message: 'Entrée mise à jour!'})
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};

exports.deleteEntree = async (req, res) => {
    try {
        await Entree.deleteOne({ _id: req.params.id });
            res.status(200).json({ success: 1, message: 'Entrée supprimé!'});
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};

exports.getEntreeByEntrepriseId = async (req, res, next) => {
    try {
        const entrees = await Entree.find({ entreprise: req.params._id });
            res.status(200).json(entrees);
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};

exports.getEntreeById = async (req, res) => {
    try {
        const entree = await Entree.findById({ _id: req.params.id });
           res.status(200).json(entree);
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};