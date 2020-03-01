const jwt = require('jsonwebtoken');
const Users = require('../../models/user.model');

module.exports = {
    verifyDetails(email, password) {
        return new Promise((resolve, reject) => {
            // querying db for the user.
            Users.findOne({ email: email, password: password }, (err, user) => {
                if (!err && user) {
                    delete user._doc.password;

                    // creating a JWT.
                    jwt.sign(user._doc, process.env.secret, { expiresIn: 90 }, (err, token) => {
                        resolve(token);
                    });
                } else {
                    reject("your details do not match our db.");
                }
            });
        });
    }
}