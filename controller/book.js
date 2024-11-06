const bookModel = require('../modele/book'); // Assurez-vous que le chemin d'accès au modèle de livre est correct

exports.bookController = (req, res, next) => {
    bookModel.getAllBooks()
        .then(books => {
            res.render('books', { books: books,user:req.session.userId });
        })
        .catch(err => {
            // Gérer les erreurs ici
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des livres');
        });
};
exports.onebookController = (req, res, next) => {
    let id=req.params.id
    bookModel.getBook(id)
        .then(book => {
            res.render('bookde', {book:book,user:req.session.userId});
        })
        .catch(err => {
            // Gérer les erreurs ici
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des livres');
        });
};

