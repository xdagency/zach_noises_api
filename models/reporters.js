'use strict';

const Bookshelf = require('../database');

require('./noises');
const Reporters = Bookshelf.Model.extend({
    // tell bookself which table to interact with
    tableName: 'reporters',
    // create the relationships
    reporters: function() {
        return this.belongsTo('Noises');
    }
})

module.exports = Bookshelf.model('Reporters', Reporters);