const   express = require('express'),
        router = express.Router(),
        { check, validationResult, body } = require('express-validator/check'),
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


/*
    Noise /POST routes
*/

// Post a noise
router.post('/noise', [
    
    check('type').isNumeric().trim().escape().withMessage('Type must be an ID'), 
    check('severity').isFloat({ gt: 0.999, lt: 6.001 }).trim().escape().withMessage('Severity must be a number between 1 and 6'),
    check('reporter').isNumeric().trim().escape().withMessage('Reporter must be an ID')

], (req, res) => {

    // Return any errors from the values posted to the API
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }

    // create a new Noise object
    let newNoise = new Noises ({
        type: req.body.type,
        severity: req.body.severity,
        reporter: req.body.reporter
    });

    console.log(newNoise);

    // save the noise in the DB
    newNoise.save()
    
        .then(savedNoise => {

            // OK status & send back the newly saved noise
            res.status(200).json(savedNoise);

        })
        
        .catch(error => {

            // log an errors
            console.log('Post a new noise error:', error);

            // send back error and a server error
            res.status(500).json(error);

        });

});



/*
    Noise /DELETE routes
*/

// Post a noise

router.delete('/noise/:id', (req, res) => {

    // Get the noise ID from the request param
    let noise_id = req.params.id;

    Noises.where({ id: noise_id }).destroy()
        
        .then(results => {

            // OK status & send results, as JSON, back in response
            res.status(200).send('Noise DELETED.');

        })

        .catch(error => {

            // log errors
            console.log('Destroy a noise error:', error);
            
            // send an internal server error
            res.status(500);

        })

});


module.exports = router;