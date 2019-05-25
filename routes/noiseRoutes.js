const   express = require('express'),
        router = express.Router(),
        Noises = require('../models/noises');

/*
    Noise /GET routes
*/

// Get all noises
router.get('/noises', (req, res) => {

    // Fetch all noises from DB
    Noises.where(function() {}).fetchAll()
        
        .then(results => {

            // OK status & send results, as JSON, back in response
            res.status(200).json(results);

        })

        .catch(error => {

            // log errors
            console.log('Fetch all noises error:', error);
            
            // send an internal server error
            res.status(500);

        })

});


// Get a noise
router.get('/noise/:id', (req, res) => {

    // Get the noise ID from the request param
    let noise_id = req.params.id;

    // Search DB for the noise with that ID
    Noises.where({ id: noise_id }).fetch()
    
    .then(result => {
        
        // If result is null, meaning nothing was found under that id then send a 404
        if (result === null) {
            res.status(404).send('No noise found.');
            return;
        }

        // OK status & Send the results
        res.status(200).json(result);
        
    })

    .catch(error => {

        // log errors
        console.log('Fetch a single noise error:', error);

        // send an internal server error
        res.status(500);

    })

});


module.exports = router;