const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    description: String,
    author: String,
    image: String
});

const Book = mongoose.model('Book', bookSchema);

const url = 'mongodb://127.0.0.1:27017/library';

// Export de la fonction getAllBooks
exports.getAllBooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Book.find().exec();
            })
            .then(books => {
                mongoose.disconnect(); // Déconnexion de la base de données
                resolve(books);
            })
            .catch(error => {
                mongoose.disconnect(); // Déconnexion de la base de données en cas d'erreur
                reject(error);
            });
    });
};
exports.getBook = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Book.findById(id).exec(); // Utiliser findById pour rechercher un livre par son ID
            })
            .then(book => {
                mongoose.disconnect(); // Déconnexion de la base de données
                resolve(book); // Correction ici : utiliser 'book' au lieu de 'books'
            })
            .catch(error => {
                mongoose.disconnect(); // Déconnexion de la base de données en cas d'erreur
                reject(error);
            });
    });
};
