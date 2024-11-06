const mongoose = require('mongoose');

const electronicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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

const Electronic = mongoose.model('Electronic', electronicSchema);

const url = 'mongodb://127.0.0.1:27017/library';

// Correction du nom de la fonction exportée
exports.getAllElectronics = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Electronic.find().exec();
            })
            .then(electronics => {
                mongoose.disconnect(); // Déconnexion de la base de données
                resolve(electronics);
            })
            .catch(error => {
                mongoose.disconnect(); // Déconnexion de la base de données en cas d'erreur
                reject(error);
            });
    });
};
