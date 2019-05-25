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
            
            // send a internal server error
            res.status(500);

        })

});

router.get('noise/:id', (req, res) => {
});


module.exports = router;