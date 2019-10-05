const   express = require('express'),
        router = express.Router(),
        Noises = require('../models/noises'),
        Types = require('../models/types');

        
/*
    Search /GET routes
*/

// Search for noises of a specific type
router.get('/search', (req, res) => {

    // titleCase function
    function titleCase(str) {
        return str.toLowerCase().split('').map(function(letter, i) { return i === 0 ? letter = letter.toUpperCase() : letter = letter }).join('');
    }

    // Convert the type in the request query to a titleCase word for searching purposes
    let typeName = titleCase(req.query.query);
    // grab the more_than and less_than requests
    let lessThan = req.query.less_than || 9;
    let moreThan = req.query.more_than || 0;


    // Get the id of the type that matches the param
    Types.where({ name: typeName })

        .fetch()

        .then(result => {

            if (result === null) {
                res.status(404).send('That type doesn\'t exist.')
                throw new Error('Type doesn\'t exist');
            }

            // Return a second query which looks for all noises with the type equal
            // to result.id which we got from the initial search
            return Noises.where(function() { this.where({ type: result.id }).andWhere('severity', '>', moreThan).andWhere('severity', '<', lessThan)}).fetchAll()

        })

        .then(results => {

            // console.log(results);

            // OK status & send results, as JSON, back in response
            res.status(200).json(results);

        })

        .catch(error => {

            // log errors
            console.log('Search error:', error);

            // Send a server error
            res.status(500);


        });

});



/*
    Search CATCH ALL route
*/

router.all('/search', (req, res) => {

    // Nothing at the rest of the endpoints
    res.status(404).send('Nothing found.')

});


module.exports = router;