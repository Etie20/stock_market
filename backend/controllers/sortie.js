const Sortie = require('../models/Sortie');
const Stock = require('../models/Stock');

exports.createSortie = async (req, res, next) => {
    const sortie = new Sortie({
        utilisateur: req.body.userId,
        marchandise: req.body.marchandiseId,
        quantite: req.body.quantite,
        justification: req.body.justification,
        image: req.body.image
    });
    await sortie.save()
        .then(() => res.status(200).json({ message: "Sortie crée!" }))
        .catch(error => res.status(400).json({ error }))
        .catch(error => res.status(500).json({ error }));
};

exports.validerSortie = async (req, res, next) => {

    const sortieId = req.params.id;

    await Sortie.findByIdAndUpdate(sortieId, {validation: true}, {new: true})
        .populate('marchandise')
        .then(async sorties => {
            if (!sorties) {
                return res.status(400).json({message: "Marchandise inexistante"});
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
            return res.status(200).json({message: "Sortie Validé!"});
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteSortie = async (req, res, next) => {
    await Sortie.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Sortie supprimé!'}))
        .catch(error => res.status(400).json({ error }));
};

exports.updateSortie = async (req, res, next) => {
    await Sortie.updateOne({ _id: req.params.id }, {
        ...req.body
    })
        .then(() => res.status(200).json({ message: 'Sortie mise à jour!'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getSortieByEntrepriseId = async (req, res, next) => {
    await Sortie.find({ entreprise: req.params.id} )
        .then(sorties => res.status(200).json(sorties))
        .catch(error => res.status(400).json({ error }))
};

exports.getSortieById = async (req, res, next) => {
    await Sortie.findById({ _id: req.params.id })
        .then(sortie => res.status(200).json(sortie))
        .catch(error => res.status(400).json({ error }))
};