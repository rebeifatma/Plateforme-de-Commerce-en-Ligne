// Import des modèles
const Book = require('../modele/book');
const Electronic = require('../modele/electronic');
const Fashion = require('../modele/fashion');
const { Jewellery, getAlljewellerys } = require('../modele/jewellery');

// Méthode pour obtenir toutes les données nécessaires
exports.getIndexData = async (req, res) => {
    try {
        // Obtenir les livres
        const books = await Book.getAllBooks();

        // Obtenir les électroniques
        const electronics = await Electronic.getAllElectronics();

        // Obtenir les vêtements
        const fashions = await Fashion.getAllFashions();

        // Obtenir les bijoux
        const jewellerys = await getAlljewellerys();

        // Rendre la vue index avec toutes les données récupérées
        res.render('index', { books, electronics, fashions, jewellerys,user:req.session.userId});
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: error.message });
    }
};
