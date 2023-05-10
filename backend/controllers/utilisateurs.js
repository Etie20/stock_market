const bcrypt = require('bcrypt');
const Utilisateur = require('../models/Utilisateur');
const Entreprise = require('../models/Entreprise');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    // Vérifier si l'entreprise existe déjà dans la base de données
    let entreprise = await Entreprise.findOne({nom: req.body.nomEntreprise, localisation: req.body.localisation});

    // Si l'entreprise n'existe pas, la créer
    if (!entreprise) {
            entreprise = new Entreprise({ nom: req.body.nomEntreprise, localisation: req.body.localisation });
            await entreprise.save();
    }

    let utilisateur = await Utilisateur.findOne({ email: req.body.email, localisation: req.body.localisation});
    if (!utilisateur) {
        return res.status(409).json({ message: "L'utilisateur existe déjà"});
    }
    await bcrypt.hash(req.body.motDePasse, 10)
        .then(async hash => {
            const user = new Utilisateur({
                nom: req.body.nom,
                email: req.body.email,
                motDePasse: hash,
                statut: req.body.statut,
                role: req.body.role,
                telephone: req.body.telephone,
                adresse: req.body.adresse,
                entreprise: entreprise._id,
                dateCreation: Date.now()
            });
            await user.save()
                .then(() => res.status(200).json({message: 'Utilisateur créé avec succès!'}))
                .catch(error => res.status(400).json({error}))
                .catch(error => res.status(500).json({error}))
        });
};

exports.signupClient = async (req, res, next) => {
    let utilisateur = await Utilisateur.findOne({ email: req.body.email });
    if (utilisateur !== null ) {
        return res.status(409).json({ message: "L'utilisateur existe déjà"});
    }
    await bcrypt.hash(req.body.motDePasse, 10)
        .then(async hash => {
            const user = new Utilisateur({
                nom: req.body.nom,
                email: req.body.email,
                motDePasse: hash,
                statut: "client",
                telephone: req.body.telephone,
                adresse: req.body.adresse,
                dateCreation: Date.now()
            });
            await user.save()
                .then(() => res.status(200).json({message: 'Utilisateur créé avec succès!'}))
                .catch(error => res.status(400).json({error}))
                .catch(error => res.status(500).json({error}))
        });
};

exports.login = async (req, res, next) => {
    await Utilisateur.findOne({email: req.body.email})
        .then(utilisateur => {
            if (!utilisateur) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'})
            }
            bcrypt.compare(req.body.motDePasse, utilisateur.motDePasse)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'mot de passe incorrect !'})
                    }
                    res.status(200).json({
                        userId: utilisateur._id,
                        token: jwt.sign(
                            {userId: utilisateur._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        ),
                        role: utilisateur.role,
                        statut: utilisateur.statut,
                        companyId: utilisateur.entreprise
                    });
                })
                .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}))
};


exports.deleteUser = async (req, res, next) => {
    Utilisateur.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
        .catch(error => res.status(400).json({ error }))
};

exports.updateUsers = async (req, res, next) => {
    Utilisateur.updateOne({ _id: req.params.id },
        {
            ...req.body,
            updateDate: Date.now()
        })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getUsersByEntrepriseId = async (req, res, next) => {
    Utilisateur.find({ entreprise: req.params.id} )
        .then(utilisateurs => res.status(200).json(utilisateurs))
        .catch(error => res.status(400).json({ error }));
}

exports.getUserById = async (req, res, next) => {
    Utilisateur.findById({ _id: req.params.id })
        .then(utilisateur => res.status(200).json(utilisateur))
        .catch(error => res.status(400).json({ error }));
}




