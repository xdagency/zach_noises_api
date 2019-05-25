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
        bookshelf = require('./database'),
        config = require('./config');


// Set some basic stuff
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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