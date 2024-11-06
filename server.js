const express = require('express');
const path = require('path');
const app = express();
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const indexController = require('./controller/indexcontroller');
const bookController = require('./controller/book');
const fashionController = require('./controller/fashion');
const userController = require('./controller/usercontroller');
const search = require('./controller/search');



const electronicController = require('./controller/electronic');
const JewelleryController = require('./controller/jewellery');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());


// Définir le dossier pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'assetes')));

// Définir le moteur de vue et le dossier des vues
app.set('view engine','ejs');
app.set('views', 'view');







var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);




//creer store 

var store = new MongoDBStore({
  uri:'mongodb://127.0.0.1:27017/library',
  collection: 'mySessions'   //creer session 
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    //détermine la durée de vie maximale des cookies de session    
  },

 
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,    // sauvegarder la session dans le store même si la session n'a pas été modifiée pendant la requête.
  saveUninitialized: true


  // de sauvegarder la session même si elle n'a pas été initialisée. Cela peut être utile dans certains cas, mais peut également entraîner un gaspillage de ressources si utilisé de manière incorrecte.
}));

app.get('/hello', function(req, res) {
  res.send('Hello ' + JSON.stringify(req.session));
});
/*envoie une réponse au client qui a fait la requête. Dans ce cas, il envoie une chaîne de caractères "Hello " suivie de la représentation JSON de l'objet req.session.

req.session contient les données de session associées à la requête. Cette ligne envoie ces données sous forme de chaîne JSON à l'utilisateur qui a fait la requête.*/






// Routes
// L'ordre des contrôleurs ici détermine l'ordre d'exécution sur la page d'accueil


const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
      next(); // Si l'utilisateur est authentifié, passez au middleware suivant
  } else {
      res.redirect('/'); // Si l'utilisateur n'est pas authentifié, redirigez vers la page de connexion
  }
};
const NotAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
      next(); // Si l'utilisateur est authentifié, passez au middleware suivant
  } else {
      res.redirect('/login'); // Si l'utilisateur n'est pas authentifié, redirigez vers la page de connexion
  }
};
app.get('/', indexController.getIndexData); 
app.get('/search',search.searchA); 




app.get('/books', bookController.bookController); 


app.get('/Fashion', fashionController.fashionController); 




app.get('/Electronic', electronicController.electronicController);


app.get('/Jewellery', JewelleryController.jewelleryController);


app.get('/book/:id',bookController.onebookController); 




// Route pour la page de connexion
app.get('/signin',NotAuthenticated,(req, res, next) => {
    res.render('login',{message:req.flash('error')[0]});
});


app.post('/login',userController.userLoginController);

app.post('/signup', userController.userController);
app.post('/logout',isAuthenticated, userController.userLogoutController);

// Route pour la page d'inscription
app.get('/signup',NotAuthenticated, (req, res, next) => {
    res.render('register',{message:req.flash('error')[0]});
});
app.get('/ContactUs',(req, res, next) => {
  res.render('contactus');
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
