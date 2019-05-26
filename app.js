/*
    Setup
*/

// Import some basic stuff
const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        noiseRoutes = require('./routes/noiseRoutes'),
        typeRoutes = require('./routes/typeRoutes'),
        searchRoutes = require('./routes/searchRoutes'),
        bookshelf = require('./database');


// Set some basic stuff
let     config = {};
const   ENVIROMENT = process.env.NODE_ENV;
if (ENVIROMENT !== "production") { config = require('./config'); }
const   PORT = process.env.PORT || config.LOCAL_PORT;


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


// Catch all route for authentication
app.all('*', (req, res, next) => {

    // Check for API KEY
    let keyToCheck = req.query.api_key;
    let api_key = process.env.API_KEY || config.API_KEY;
    
    // If API_KEY does not match send a 403 forbidden error
    if (keyToCheck != api_key) {
        res.status(403).send('Not allowed.');
        return;
    }

    // If API_KEY matches keep going
    next();

})


// Mount routes
app.use('/api', noiseRoutes);
app.use('/api', typeRoutes);
app.use('/api', searchRoutes);


/*
    Listen
*/

app.listen(PORT, () => {
    console.log('Server up on', PORT);
});