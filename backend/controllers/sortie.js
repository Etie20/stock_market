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
                return res.status(400).send({message: "Marchandise inexistante"});
            }
            await Stock.findByIdAndUpdate(
                sorties.marchandise._id,
                {
                    $inc: {quantiteTotale: -sorties.quantite}
                },
                {
                    new: true
                } );
            return res.status(200).send({message: "Sortie Validé!"});
        })
        .catch(error => res.status(500).json({ error }));
};