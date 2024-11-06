// Importer les modèles nécessaires
const book = require('../modele/book');
const Electronic = require('../modele/electronic');
const jewellery= require('../modele/jewellery');
const fashion = require('../modele/fashion');

exports.searchA = async (req, res) => {
    try {
        const keyword = req.body.keyword;
        const books = await book.find({ $text: { $search: keyword } });
        const electronics = await Electronic.find({ $text: { $search: keyword } });
        const jewellerys = await jewellery.find({ $text: { $search: keyword } });
        const fashions = await fashion.find({ $text: { $search: keyword } });
        
        res.render('search', { books, electronics, fashions, jewellerys, user: req.session.userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
