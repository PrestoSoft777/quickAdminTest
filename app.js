const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride = require('method-override');

const User = require('./src/user');
const Admin = require('./src/admin');
const routes = require('./src/router');
const mongo = require('./.mongo');
const AdminInit = require('./AdminInit');

const app = express();
const PORT = 3001

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "PrestoSoft Inc",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use('/', routes);

/* temp code
AdminInit();
*/

app.listen(PORT, () => { console.log(`Server is listening on port: ${PORT}`) });
