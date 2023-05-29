const Stock = require('../models/Stock');

exports.getStockByEntrepriseId = async (req, res) => {
    try {
        const stock = await Stock.find({entreprise: req.params.id}).populate('marchandise').populate('entreprise');
        res.status(200).json(stock);
    } catch (e) {
        res.status(400).json({ success: 0, message: "Invalid request body" });
    }
};