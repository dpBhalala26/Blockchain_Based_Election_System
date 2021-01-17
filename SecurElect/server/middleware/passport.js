const passport = require('passport');

const PassportLocalStratagy = require('passport-local');
const PassportJwtStratagy = require('passport-jwt').Strategy;
const PassportJwtExtract = require('passport-jwt').ExtractJwt;

const config = require('../config/config');
const userController = require('../controllers/user.controller');


const localLogin = new PassportLocalStratagy(
    {
        usernameField: 'email'
    },
    async (email, pwd, done) => {
        console.log("in locallogin");
        const user = await userController.user_read_email_pwd(email, pwd);
        console.log(user + "in Passport");
        return user ? done(null, user) : done(null, false, {error: "Your login details are Wrong! please try again."});
    }
);

const jwtLogin = new PassportJwtStratagy(
    {
        jwtFromRequest: PassportJwtExtract.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecretKey
    },
    async ( payload, done ) => {
        const user = await userController.getUserByID(payload._id);
        return user ? done(null, user) : done(null, false, {error: "Your login details are Wrong! please try again."});
    }
);

module.exports = passport.use(localLogin).use(jwtLogin);
