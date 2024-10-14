require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

const passport = require('passport');
const session = require('express-session');

const {configurePassport} = require('./middlewares/configurePassport');

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : { secure : false}
}));

app.use(passport.initialize());
app.use(passport.session());

//middleware to for passportJS config
configurePassport();

app.use('/', require('./routes/authRoutes'));

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});