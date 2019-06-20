/*
    Setup
*/

require('dotenv').config()

// Import some basic stuff
const   express = require('express'),
        app = express(),
        basicAuth = require('express-basic-auth'),
        bodyParser = require('body-parser'),
        noiseRoutes = require('./routes/noiseRoutes'),
        typeRoutes = require('./routes/typeRoutes'),
        searchRoutes = require('./routes/searchRoutes'),
        reporterRoutes = require('./routes/reporterRoutes'),
        bookshelf = require('./database');


// Set some basic stuff
const   ENVIROMENT = process.env.NODE_ENV;
const   PORT = process.env.PORT;


/* 
    Middleware stack 
*/


// headers to fix CORS issues
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Catch all api route for api_key authentication
app.all('/api/*', (req, res, next) => {

    // Check for API KEY
    let keyToCheck = req.query.api_key;
    let api_key = process.env.API_KEY;
    let editor_key = process.env.EDITOR_KEY;
    let admin_key = process.env.ADMIN_KEY;
    
    // If one of the API_KEY does not match send a 403 forbidden error
    if (keyToCheck === api_key || keyToCheck === editor_key || keyToCheck === admin_key) {
        // If API_KEY matches keep going
        next();
    }

    else {

        // Give error if there are no matches to API_KEYs
        res.status(403).send('Not allowed.');
        return;

    }

});


// Mount routes
app.use('/api', noiseRoutes);
app.use('/api', typeRoutes);
app.use('/api', searchRoutes);
app.use('/api', reporterRoutes);



// Authenticate public pages
app.use('/', basicAuth({
    users: { 'admin': process.env.SITE_PASSWORD },
    challenge: true,
    realm: 'zach-noise-api'
}));

// look at public folder for static assets
app.use(express.static(__dirname + '/public'));



/*
    Listen
*/

app.listen(PORT, () => {
    console.log('Server up on', PORT);
});