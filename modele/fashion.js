const mongoose = require('mongoose');

const fashionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Fashion = mongoose.model('Fashion', fashionSchema);

const url = 'mongodb://127.0.0.1:27017/library';

exports.getAllFashions = () => { // Correction du nom de la fonction exportée
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Fashion.find().exec(); // Correction de la méthode de recherche
            })
            .then(fashions => {
                mongoose.disconnect(); // Déconnexion de la base de données
                resolve(fashions);
            })
            .catch(error => {
                mongoose.disconnect(); // Déconnexion de la base de données en cas d'erreur
                reject(error);
            });
    });
};
