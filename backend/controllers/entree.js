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
        marchandise: marchandise.marchandiseId,
        entreprise: req.body.entreprise,
        quantite: req.body.quantite,
        dateCreation: Date.now()
    });
    await entree.save()
        .then(() => res.status(200).json({ message: "Entrée crée!" }))
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

exports.validerEntree = async (req, res, next) => {

    const entreeId = req.params.id;

    await Entree.findByIdAndUpdate(entreeId, {validation: true}, {new: true})
        .populate('marchandise')
        .then(async entrees => {
            if (!entrees) {
                return res.status(400).json({message: "Marchandise inexistante"});
            }
            await Stock.findByIdAndUpdate(
                entrees.marchandise._id,
                {
                    updatedDate: Date.now(),
                    $inc: {quantiteTotale: entrees.quantite}
                },
                {
                    new: true
                } );
            return res.status(200).json({message: "Entrée Validé!"});
        })
        .catch(error => res.status(500).json({ error }));
};

exports.updateEntree = async (req, res, next) => {
    await Entree.updateOne({ _id: req.params.id },
    {...req.body, dateModification: Date.now()}
    )
        .then(() => res.status(200).json({ message: 'Entrée mise à jour!'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteEntree = async (req, res, next) => {
    await Entree.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Entrée supprimé!'}))
        .catch(error => res.status(400).json({ error }));
}

exports.getEntreeByEntrepriseId = async (req, res, next) => {

    await Entree.find({ entreprise: req.params._id })
        .then(entrees => res.status(200).json(entrees))
        .catch(error => res.status(400).json({ error }))
}

exports.getEntreeById = async (req, res, next) => {
    await Entree.findById({ _id: req.params.id })
        .then(entree => res.status(200).json(entree))
        .catch(error => res.status(400).json({ error }))
}