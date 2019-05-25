const   express = require('express'),
        router = express.Router(),
        Types = require('../models/types');

/*
    Noise /GET routes
*/

// Get all noises
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
            
            // send a internal server error
            res.status(500);

        })

});

router.get('type/:id', (req, res) => {
});


module.exports = router;