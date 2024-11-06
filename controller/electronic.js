const bookModel = require('../modele/electronic');

exports.electronicController = (req, res, next) => {
    bookModel.getAllElectronics()
        .then(electronics => {
            res.render('electronic', { electronics:electronics ,user:req.session.userId});
        })
        .catch(err => {
            // Gérer les erreurs ici
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des livres');
        });
};
