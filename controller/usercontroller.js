const userModel = require('../modele/user');
const  bcrypt=require('bcrypt');


exports.userController = (req, res, next) => {
    userModel.register(req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.gender)
        .then(user => {
            res.render('login');
        })
        .catch(err => {
            // Gérer les erreurs ici
            req.flash('error',err);
            console.error(err);
            res.render('register');
        });
};



exports.userLoginController = (req, res, next) => {
    userModel.login(req.body.email, req.body.password)
        .then((id) => {
            req.session.userId = id;
            res.render('/');
            
        })
        .catch((err) => {
            req.flash('error',err);
            console.log(err);
            res.status(401).send('Erreur lors de la connexion'); // Envoyer une réponse d'erreur HTTP 401 en cas d'échec de connexion
        });
};
exports.userLogoutController = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('signin'); // Correction de la faute de frappe ici
    });
};

