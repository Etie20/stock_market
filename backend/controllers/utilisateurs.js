const bcrypt = require('bcrypt');
const Utilisateur = require('../models/Utilisateur');
const Entreprise = require('../models/Entreprise');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        // Vérifier si l'entreprise existe déjà dans la base de données
        let entreprise = await Entreprise.findOne({nom: req.body.nomEntreprise, localisation: req.body.localisation});

        // Si l'entreprise n'existe pas, la créer
        if (!entreprise) {
            entreprise = new Entreprise({ nom: req.body.nomEntreprise, localisation: req.body.localisation });
            await entreprise.save();
        } else {
            const statut = req.body.statut;

            if (statut === "superAdmin") {
                return res.status(409).json({message: "L'entreprise existe déjà!"});
            }
        }
        let utilisateur = await Utilisateur.findOne({ email: req.body.email });
        if (!utilisateur) {
            const hash = await bcrypt.hash(req.body.motDePasse, 10);
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
            await user.save();
            res.status(200).json({message: 'Utilisateur créé avec succès!'});
        }
        return res.status(409).json({ message: "L'utilisateur existe déjà"});


    } catch(error) {
            return res.status(400).json({ message: "Invalid request body" });
    }

};

exports.signupClient = async (req, res) => {
    try {
        let utilisateur = await Utilisateur.findOne({email: req.body.email});
        if (utilisateur !== null) {
            return res.status(409).json({message: "L'utilisateur existe déjà"});
        }
        const hash = await bcrypt.hash(req.body.motDePasse, 10);
        const user = new Utilisateur({
            nom: req.body.nom,
            email: req.body.email,
            motDePasse: hash,
            statut: "client",
            telephone: req.body.telephone,
            adresse: req.body.adresse,
            dateCreation: Date.now()
        });
        await user.save();
        res.status(200).json({message: 'Utilisateur créé avec succès!'});
    } catch (error) {
        res.status(400).json({error: "Invalid request body"});
    }
};



exports.login = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findOne({email: req.body.email})
        if (!utilisateur) {
            return res.status(401).json({
                success: 0,
                error: 'Utilisateur non trouvé !'});
        }
        const valid = bcrypt.compare(req.body.motDePasse, utilisateur.motDePasse)
        if (!valid) {
            return res.status(401).json({
                success: 0,
                error: 'mot de passe incorrect !'});
        }
        res.status(200).json({
            success: 1,
            token: jwt.sign(
                {
                    userId: utilisateur._id,
                    statut: utilisateur.statut,
                    role: utilisateur.role,
                    companyId: utilisateur.entreprise
                },
                'RANDOM_TOKEN_SECRET',
                {expiresIn: '48h'}
            ),
        });
    } catch (error) {
        res.status(400).json({
            succes: 0,
            error: "Invalid request body"});
    }
};


exports.deleteUser = async (req, res) => {
    try {
        await Utilisateur.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(400).json({ error: "Invalid request body" });
    }
};

exports.updateUsers = async (req, res) => {
    try {
        await Utilisateur.updateOne({ _id: req.params.id },
            {
                ...req.body,
                updateDate: Date.now()
            })
            res.status(200).json({ message: 'Utilisateur modifié !'});
    } catch (error) {
        res.status(400).json({ error: "Invalid request body" });
    }
};

exports.getUsersByEntrepriseId = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.find({ entreprise: req.params.id} );
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(400).json({ error: "Invalid request body" });
    }
    
}

exports.getUserById = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById({ _id: req.params.id });
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(400).json({ error: "Invalid request body" });
    }
}




