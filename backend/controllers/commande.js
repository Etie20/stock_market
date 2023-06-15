const Commande = require('../models/Commande');
const PanierItem = require('../models/PanierItem');
const Utilisateur = require('../models/Utilisateur');
const Compte = require('../models/Compte');

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


        await Commande.updateOne({entreprise: articles[0].entreprise, categorieCompte: ''},{
            $inc: {solde: total}
        });

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
            const commandes = await Commande.find({"articles.entreprise": req.params.id})
                .populate('utilisateur', 'nom prenom')
                .populate('articles.marchandise', 'nom prix.vente')
            res.status(200).json(commandes);
        } catch (error) {
            res.status(400).json({success: 0,message: "Invalid request body"});
        }
    };