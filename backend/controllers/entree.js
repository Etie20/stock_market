const Entree = require('../models/Entree');
const Marchandise = require('../models/Marchandise');
const Stock = require('../models/Stock');

exports.createEntree = async (req, res) => {
    try {
        let marchandise = await Marchandise.findOne({ nom: req.body.nom } );
        if (!marchandise) {
            marchandise = new Marchandise({
                ...req.body
            });
            await marchandise.save();
        }
        const entree = new Entree ({
            utilisateur: req.body.userId,
            marchandise: marchandise.marchandiseId,
            entreprise: req.body.entreprise,
            quantite: req.body.quantite,
            dateCreation: Date.now()
        });
        await entree.save();
        res.status(200).json({ message: "Entrée crée!" })
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
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

exports.validerEntree = async (req, res, next) => {
    try{
        const entreeId = req.params.id;

        const entrees =  await Entree.findByIdAndUpdate(entreeId, {validation: true}, {new: true})
            .populate('marchandise');
        if (!entrees) {
            res.status(404).json({message: "Marchandise inexistante"});
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
        res.status(200).json({message: "Entrée Validé!"});

    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.updateEntree = async (req, res) => {
    try {
        await Entree.updateOne({ _id: req.params.id },
            {...req.body, dateModification: Date.now()}
        );
        res.status(200).json({ message: 'Entrée mise à jour!'})
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.deleteEntree = async (req, res) => {
    try {
        await Entree.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Entrée supprimé!'});
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.getEntreeByEntrepriseId = async (req, res, next) => {
    try {
        const entrees = await Entree.find({ entreprise: req.params._id });
            res.status(200).json(entrees);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.getEntreeById = async (req, res) => {
    try {
        const entree = await Entree.findById({ _id: req.params.id });
           res.status(200).json(entree);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};