const   express = require('express'),
        router = express.Router(),
        { check, validationResult, body } = require('express-validator/check'),
        Reporters = require('../models/reporters');

        
/*
    Reporter /GET routes
*/

// Get a reporter at a specific id
router.get('/reporters/:id', (req, res) => {

    // Get the reporter ID from the request param
    let reporter_id = req.params.id;

    // Search DB for the reporter with that ID
    Reporters.where({ id: reporter_id }).fetch()
    
    .then(result => {
        
        // If result is null, meaning nothing was found under that id then send a 404
        if (result === null) {
            res.status(404).send('No reporter found.');
            return;
        }

        // OK status & Send the results
        res.status(200).json({
            id: result.attributes.id,
            name: result.attributes.name
        });
        
    })

    .catch(error => {

        // log errors
        console.log('Fetch a single reporter error:', error);

        // send an internal server error
        res.status(500);

    })

});

router.post('/reporters', [

    check('name').isAlphanumeric().trim().escape().withMessage('Name must be alphanumeric'), 
    check('password').trim().escape().withMessage('Bad password'),
    check('email').isEmail().normalizeEmail().withMessage('Email format not supported')

], (req, res) => {

    // Return any errors from the values posted to the API
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }

    // create a new Noise object
    let newReporter = new Reporters ({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    // save the noise in the DB
    newReporter.save()
    
        .then(savedReporter => {

            // OK status & send back the newly saved reporter ID
            res.status(200).json({
                id: savedReporter.id
            });

        })
        
        .catch(error => {

            // log an errors
            console.log('Post a new reporter error:', error);

            // send back error and a server error
            res.status(502).send('Can\'t save that information');

        });

});



/*
    Reporter CATCH ALL route
*/

router.all('/reporters', (req, res) => {

    // Nothing at the rest of the endpoints
    res.status(404).send('Nothing found.')

});


module.exports = router;