'use strict';

const Bookshelf = require('../database');

require('./noises');
const Types = Bookshelf.Model.extend({
    // tell bookself which table to interact with
    tableName: 'types',
    // create the relationships
    types: function() {
        return this.belongsTo('Noises');
    }
})

module.exports = Bookshelf.model('Types', Types);