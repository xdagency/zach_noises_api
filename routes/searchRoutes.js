const   express = require('express'),
        router = express.Router(),
        Noises = require('../models/noises')
        Types = require('../models/types');

/*
    Search /GET routes
*/

// Search for noises of a specific type
router.get('/search/:type', (req, res) => {

    let noiseName = req.param.type;

    // Get the id of the type that matches the param
    // Types.where({  })


    // Fetch all noises from DB that match type ID
    Noises.where({ type: noiseType }).fetchAll()
        
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


module.exports = router;