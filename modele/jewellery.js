const mongoose = require('mongoose');

const jewellerySchema = new mongoose.Schema({
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

const Jewellery = mongoose.model('Jewellery', jewellerySchema);

const url = 'mongodb://127.0.0.1:27017/library';

const getAlljewellerys = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Jewellery.find().exec();
            })
            .then(jewellerys => {
                mongoose.disconnect(); // Déconnexion de la base de données
                resolve(jewellerys);
            })
            .catch(error => {
                mongoose.disconnect(); // Déconnexion de la base de données en cas d'erreur
                reject(error);
            });
    });
};

module.exports = {
    Jewellery,
    getAlljewellerys
};
