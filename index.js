// Import express
const express = require('express');
// Port on which app will run
const port = 5000;
// Import dotenv module for environment variables
const dotenv = require('dotenv');
dotenv.config();
// Create an instance of the Express application
const app = express();
// Import cookie parser middleware
const cookieParser = require('cookie-parser');
// Import Express ejs layouts
const expressLayout = require('express-ejs-layouts');
// Import passport
const passport = require('passport');
// Import sass compiler
const sassMiddleware = require('node-sass-middleware');
//Import mongostore to store session cookies
const MongoStore = require('connect-mongo');
// Import express session to create session cookies
const session = require('express-session');
// Import passport local strategy config file
const passportLocal = require('./config/passport-local-strategy');
// Import passport github strategy config file
const passportGithub = require('./config/passport-github2-strategy');
// Import mongoose config file
const db = require('./config/mongoose');

// Set up sass middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));
// Set up middleware to parse JSON data in request bodies
app.use(express.urlencoded());
// Set up cookie parser to parse cookies in request bodies
app.use(cookieParser());
// Directory for static assets such as stylesheets and JavaScript files
app.use(express.static('./assets'));
// Set up ejs layouts middlware
app.use(expressLayout);
// Set expressLayout to extract styles and javascript files
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// Set view engine to ejs
app.set("view engine", "ejs");
// Set up view directory
app.set('views', './views');

// Configure session cookies
app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        client: db.getClient(),
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongo setup ok');
    })
}));

// Initialize passport authentication
app.use(passport.initialize());
// Passport session middleware
app.use(passport.session());
// Set authenticated user for frontend use
app.use(passport.setAuthenticatedUser);

// Set up directory for routes
app.use('/', require('./routes'));

// Listen on port
app.listen(port, function(err){
    if(err) {
        console.log(`Error : ${err}`);
    }

    console.log(`Server listening on port : ${port}`);
});