const Commande = require('../models/Commande');
const PanierItem = require('../models/PanierItem');
const Utilisateur = require('../models/Utilisateur');

exports.createCommande = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById(req.body.utilisateur);
        const panierItems = await PanierItem.find({utilisateur: req.body.utilisateur}).populate('marchandise');

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
        await PanierItem.deleteMany({utilisateur: utilisateur._id});

        res.status(200).json(commande);
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};


    exports.updateCommande = async (req, res) => {
        try {
            Commande.updateOne({_id: req.params.id}, {
                ...req.body,
                updatedDate: Date.now()
            });
            res.status(200).json({message: 'Commande mise à jour avec succès'});

        } catch (error) {
            res.status(400).json({error: "Invalid request body"});
        }

    };

    exports.deleteCommande = async (req, res) => {
        try {
            await Commande.deleteOne({_id: req.params.id});
            res.status(200).json({message: 'Commande supprimé avec succès'});
        } catch (error) {
            res.status(400).json({error: "Invalid request body"});
        }

    };

    exports.getCommandesByEntreprise = async (req, res) => {
        try {
            const commandes = await Commande.find({"articles.entreprise": req.params.id})
                .populate('utilisateur', 'nom prenom')
                .populate('articles.marchandise', 'nom prix.vente')
            res.status(200).json(commandes);
        } catch (error) {
            res.status(400).json({error: "Invalid request body"});
        }
    };