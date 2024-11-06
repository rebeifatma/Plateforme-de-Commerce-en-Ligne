const mongoose = require('mongoose');
const  bcrypt=require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Female', 'Male', 'Other'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Assure l'unicité de l'email
        lowercase: true, // Convertit l'email en minuscules
        trim: true // Supprime les espaces blancs avant et après l'email
    }
});

const User = mongoose.model('User', userSchema);

const url = 'mongodb://127.0.0.1:27017/library';

exports.register = (email, firstName, lastName, password, gender) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                console.log("i am connected")
                
                // Check if the email is already in use
                return User.findOne({ email: email }).exec();
            })
            .then(existingUser => {
                if (existingUser) {
                    mongoose.disconnect();
                    reject("The email is already in use.");
                } else {
                    // Hash the password before saving
                    return bcrypt.hash(password, 10);
                }
            })
            .then(hashedPassword => {
                // Create a new user instance with the hashed password
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword, // Save the hashed password
                    gender
                });
                // Save the user to the database
                return newUser.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve("Registration successful!");
            })
            .catch(error => {
                mongoose.disconnect();
                reject(error);
            });
    });
};




exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                console.log("Je suis connecté");
                return User.findOne({ email: email }).exec();
            })
            .then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password)
                        .then((match) => {
                            if (match) {
                                mongoose.disconnect();
                                resolve(user._id);
                            } else {
                                mongoose.disconnect();
                                reject("Mot de passe invalide!!");
                            }
                        })
                        .catch((error) => {
                            mongoose.disconnect();
                            reject(error);
                        });
                } else {
                    mongoose.disconnect();
                    reject("Nous n'avons pas trouvé cet email");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};