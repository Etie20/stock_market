const Sortie = require('../models/Sortie');
const Stock = require('../models/Stock');

exports.createSortie = async (req, res) => {
    try {
        const sortie = new Sortie({
            utilisateur: req.body.userId,
            marchandise: req.body.marchandiseId,
            quantite: req.body.quantite,
            justification: req.body.justification,
            image: req.body.image
        });
        await sortie.save();
        res.status(200).json({ message: "Sortie crée!" });
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.validerSortie = async (req, res) => {
    try {
        const sortieId = req.params.id;
        const sorties = await Sortie.findByIdAndUpdate(sortieId, {validation: true}, {new: true})
            .populate('marchandise');
        if (!sorties) {
            res.status(400).json({message: "Marchandise inexistante"});
        }
        await Stock.findByIdAndUpdate(
            sorties.marchandise._id,
            {
                updatedDate: Date.now(),
                $inc: {quantiteTotale: -sorties.quantite}
            },
            {
                new: true
            } );
        res.status(200).json({message: "Sortie Validé!"});

    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }

};

exports.deleteSortie = async (req, res) => {
    try {
        await Sortie.deleteOne({ _id: req.params.id});
        res.status(200).json({ message: 'Sortie supprimé!'});
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.updateSortie = async (req, res) => {
    try {
        await Sortie.updateOne({ _id: req.params.id }, {
            ...req.body
        });
        res.status(200).json({ message: 'Sortie mise à jour!'});
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.getSortieByEntrepriseId = async (req, res, next) => {
    try {
        const sorties = await Sortie.find({ entreprise: req.params.id} );
        res.status(200).json(sorties);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};

exports.getSortieById = async (req, res) => {
    try {
        const sortie = await Sortie.findById({ _id: req.params.id });
        res.status(200).json(sortie);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};