const Commande = require('../models/Commande');
const PanierItem = require('../models/PanierItem');
const Utilisateur = require('../models/Utilisateur');
const Compte = require('../models/Compte');
const Stock = require('../models/Stock');

exports.createCommande = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById(req.body.utilisateur);
        const panierItems = await PanierItem.find({utilisateur: req.body.utilisateur, entreprise: req.params.id}).populate('marchandise');

        const articles = panierItems.map(panierItem => {
            return {
                marchandise: panierItem.marchandise._id,
                quantite: panierItem.quantite,
                entreprise: panierItem.entreprise._id
            };
        });

        const total = panierItems.reduce((acc, panierItem) => {
            return acc + (panierItem.quantite * panierItem.marchandise.prix.vente);
        }, 0);

        const commande = new Commande({
            utilisateur: utilisateur._id,
            entreprise: articles[0].entreprise,
            articles: articles,
            total: total,
            adresseLivraison: req.body.adresseLivraison,
            date: Date.now()
        });

        await commande.save();
        await PanierItem.deleteMany({utilisateur: utilisateur._id, entreprise: req.params.id});


        res.status(200).json({success: 1, message: 'Commande effectuée avec succès'});
    } catch (error) {
        res.status(400).json({success: 0,message: "Invalid request body"});
    }
};

exports.updateCommande = async (req, res) => {
    try {
        Commande.updateOne({_id: req.params.id}, {
            ...req.body,
            updatedDate: Date.now()
        });
        res.status(200).json({success: 1,message: 'Commande mise à jour avec succès'});

    } catch (error) {
        res.status(400).json({success: 0,message: "Invalid request body"});
    }

};

exports.validerCommande = async (req, res) => {
    try {
        await Commande.updateOne({_id: req.params.id}, {
            validation: true,
            statut: 'Livre',
            updatedDate: Date.now()
        });
        const commande = await  Commande.findOne({_id: req.params.id});
        await Compte.updateOne({entreprise: commande.entreprise}, {
            $inc: {solde: commande.total}
        });
        for (let article of commande.articles) {
            await Stock.updateOne({marchandise: article.marchandise},{
                $inc: {quantiteTotale: -article.quantite}
            });
        }
        res.status(200).json({success: 1,message: 'Commande validée avec succès'});
    } catch (e) {
        res.status(400).json({success: 0,message: "Invalid request body"});
    }
}

exports.deleteCommande = async (req, res) => {
    try {
        await Commande.deleteOne({_id: req.params.id});
        res.status(200).json({success: 1,message: 'Commande supprimé avec succès'});
    } catch (error) {
        res.status(400).json({success: 0,message: "Invalid request body"});
    }

};

exports.getCommandesByEntreprise = async (req, res) => {
    try {
        const commandes = await Commande.find({entreprise: req.params.id})
            .populate('utilisateur')
            .populate('entreprise')
            .populate('articles.marchandise')
        res.status(200).json(commandes);
    } catch (error) {
        res.status(400).json({success: 0,message: "Invalid request body"});
    }
};

exports.getCommandesByUserId = async (req, res) => {
    try {
        const commandes = await Commande.find({utilisateur: req.params.id})
            .populate('utilisateur')
            .populate('entreprise')
            .populate('articles.marchandise')
        res.status(200).json(commandes);
    } catch (error) {
        res.status(400).json({success: 0,message: "Invalid request body"});
    }
}