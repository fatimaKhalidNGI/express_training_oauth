const passport = require('passport');

//display home page
const home = (req, res) => {
    res.send('<a href = "/auth/google">Authenticate with Google</a>');
}

//start google auth
const googleAuth = passport.authenticate('google', {
    scope : ['profile', 'email']
});

//handle oauth callback
const googleOAuthCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect : '/'}, (err, user, info) => {
        if(err){
            return next(err);
        }

        if(!user){
            return res.redirect("/");
        }

        console.log(user);

        req.logIn(user, (err) => {
            if(err){
                return next(err);
            } 

            res.redirect('/profile');
        });
    })(req, res, next);
}

//handle profile page render
const profilePage = (req, res) => {
    if(!req.isAuthenticated()){
        return res.status(401).send("Access denied");
    }

    res.status(200).send(`<h1>Welcome ${req.user.displayName}</h1><p><a href = "/">Logout</a></p>`);
}

//destroy session and clear cookie after logout
const logout = (req, res) => {
    req.logout((err) => {
        if(err){
            console.error("Error in logging out: ", err);
            return res.status(500).send("Try again");
        }

        req.session.destroy((err) => {
            if(err){
                console.error('Error in destroying session: ', err);
                return res.status(500).send("Try again")
            }

            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
}

module.exports = { home, googleAuth, googleOAuthCallback, profilePage, logout };

/* 
Flow: 
home 
-> google oauth login -> grant permissions 
-> return access token 
-> use token to access protected api 
-> logout + session destroy + clear cookie
*/