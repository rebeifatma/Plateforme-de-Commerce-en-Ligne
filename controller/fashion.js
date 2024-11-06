const  fashionModel = require('../modele/fashion');
exports.fashionController = (req, res, next) => {
    fashionModel.getAllFashions()
        .then(fashions => {
            res.render('fashion',{fashions:fashions,user:req.session.userId});
        })
        .catch(err => {
            // Gérer les erreurs ici
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des fashions');
        });
};