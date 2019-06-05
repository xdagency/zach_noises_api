const auth = require('basic-auth');

// Temporary authentication/form setup for recording noises

module.exports = function(req, res, next) {

    // basic credentials
    let admin = {
        name: 'admin',
        pass: process.env.SITE_PASSWORD
    }

    // what user enters
    let user = auth(req);

    // console.log(user.name);

    // If username and password don't match, don't allow user access
    if (user.name !== admin.name && user.pass !== admin.pass) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Not allowed.');
    }

    // otherwise proceed to app
    return next()
}