const   express = require('express'),
        router = express.Router(),
        { check, validationResult, body } = require('express-validator/check'),
        Reporters = require('../models/reporters');

        
/*
    Reporter /GET routes
*/

// Search for noises of a specific type
router.get('/reporters/:id', (req, res) => {

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

})


module.exports = router;