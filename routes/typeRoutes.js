const   express = require('express'),
        router = express.Router(),
        Types = require('../models/types');

/*
    Type /GET routes
*/

// Get all types
router.get('/types', (req, res) => {

    // Fetch all noises from DB
    Types.where(function() {}).fetchAll()
        
        .then(results => {

            // OK status & send results, as JSON, back in response
            res.status(200).json(results);

        })

        .catch(error => {

            // log errors
            console.log('Fetch all types error:', error);
            
            // send an internal server error
            res.status(500);

        })

});


// Get a type
router.get('/type/:id', (req, res) => {

    // Get the noise ID from the request param
    let type_id = req.params.id;

    // Search DB for the noise with that ID
    Types.where({ id: type_id }).fetch()
    
    .then(result => {
        
        // If result is null, meaning nothing was found under that id then send a 404
        if (result === null) {
            res.status(404).send('No type found.');
            return;
        }

        // OK status & Send the results
        res.status(200).json(result);
        
    })

    .catch(error => {

        // log errors
        console.log('Fetch a single type error:', error);

        // send an internal server error
        res.status(500);

    })

});


module.exports = router;