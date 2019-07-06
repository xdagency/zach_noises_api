const   express = require('express'),
        router = express.Router(),
        Noises = require('../models/noises'),
        Types = require('../models/types');

        
/*
    Search /GET routes
*/

// Search for noises of a specific type
router.get('/search/:type', (req, res) => {

    // titleCase function
    function titleCase(str) {
        return str.toLowerCase().split('').map(function(letter, i) { return i === 0 ? letter = letter.toUpperCase() : letter = letter }).join('');
    }

    // Convert the type in the request to a titleCase word for searching purposes
    let typeName = titleCase(req.params.type);


    // Get the id of the type that matches the param
    Types.where({ name: typeName })

        .fetch()

        .then(result => {

            if (result === null) {
                res.status(404).send('That type doesn\'t exist.')
                throw new Error('Type doesn\'t exist');
            }

            return result.id

        })

        .then(id => {

            searchNoises(id);

        })

        .catch(error => {

            // log errors
            console.log('Search error:', error);

            // Send a server error
            res.status(500);


        });
    

    // Search noises based on the type in the request and send back everything found
    function searchNoises(type) {

        // grab the more_than and less_than requests
        let lessThan = req.query.less_than || 9;
        let moreThan = req.query.more_than || 0;


        // Find all noises from that type that are more_than and less_than...
        Noises.where(function() {

            this.where({ type: type })
                .andWhere('severity', '>', moreThan)
                .andWhere('severity', '<', lessThan)
            })
        
            .fetchAll()
        
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

    }

});



/*
    Search CATCH ALL route
*/

router.all('/search', (req, res) => {

    // Nothing at the rest of the endpoints
    res.status(404).send('Nothing found.')

});


module.exports = router;