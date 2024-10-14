const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const configurePassport = () => {
    passport.use(new GoogleStrategy({
        clientID : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : 'http://localhost:3500/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log("Access token: ", accessToken);
        return done(null, profile);
    }
    ));

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}

module.exports = { configurePassport };