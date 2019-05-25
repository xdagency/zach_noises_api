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


/*
    Type /POST routes
*/

// Post a type
router.post('/type', (req, res) => {

    // create a new Type object
    let newType = new Types ({
        name: req.body.name
    });

    // save the noise in the DB
    newType.save()
    
        .then(savedType => {

            // OK status & send back the newly saved type
            res.status(200).json(savedType);

        })
        
        .catch(error => {

            // log an errors
            console.log('Post a new type error:', error);

            // send back error and a server error
            res.status(500).json(error);

        });

})


module.exports = router;