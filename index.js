const express = require('express');
const port = 5000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const sassMiddleware = require('node-sass-middleware');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passportLocal = require('passport-local');
const passportGithub = require('passport-github2');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayout);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set("view engine", "ejs");
app.set('views', './views');

app.use(session({
    name: "issue-tracker",
    secret: "ahgjk",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (10000*60)
    },
    store: MongoStore.create({
        client: db.getClient(),
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongo setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err) {
        console.log(`Error : ${err}`);
    }

    console.log(`Server listening on port : ${port}`);
});