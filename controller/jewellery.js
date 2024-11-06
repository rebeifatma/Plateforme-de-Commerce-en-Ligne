const jewelleryModel = require('../modele/jewellery');

exports.jewelleryController = (req, res, next) => {
    jewelleryModel.getAlljewellerys()
        .then(jewellerys => {
            res.render('Jewellery',{jewellerys:jewellerys,user:req.session.userId});
        })
        .catch(err => {
            // Gérer les erreurs ici
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des bijoux');
        });
};
