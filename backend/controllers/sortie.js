const Sortie = require('../models/Sortie');
const Stock = require('../models/Stock');

exports.createSortie = async (req, res) => {
    try {
        const sortie = new Sortie({
            utilisateur: req.body.userId,
            marchandise: req.body.marchandiseId,
            quantite: req.body.quantite,
            justification: req.body.justification,
            image: req.body.image,
            dateSortie: Date.now()
        });
        await sortie.save();
        res.status(200).json({ success: 1, message: "Sortie crée!" });
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
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
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }

};

exports.deleteSortie = async (req, res) => {
    try {
        await Sortie.deleteOne({ _id: req.params.id});
        res.status(200).json({ success: 1, message: 'Sortie supprimé!'});
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};

exports.updateSortie = async (req, res) => {
    try {
        await Sortie.updateOne({ _id: req.params.id }, {
            ...req.body,
            updatedDate: Date.now()
        });
        res.status(200).json({ success: 1, message: 'Sortie mise à jour!'});
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};

exports.getSortieByEntrepriseId = async (req, res) => {
    try {
        const sorties = await Sortie.find({ entreprise: req.params.id} )
            .populate('marchandise')
            .populate('utilisateur');
        res.status(200).json(sorties);
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};

exports.getSortieById = async (req, res) => {
    try {
        const sortie = await Sortie.findById({ _id: req.params.id });
        res.status(200).json(sortie);
    } catch (error) {
        res.status(400).json({ success: 0, message: "Invalid request body"});
    }
};