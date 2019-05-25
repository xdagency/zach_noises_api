'use strict';

const Bookshelf = require('../database');

require('./types');
const Noises = Bookshelf.Model.extend({
    // tell bookself which table to interact with
    tableName: 'noises',
    // create the relationships
    types: function() {
        return this.hasOne('Types');
    }
})

module.exports = Bookshelf.model('Noises', Noises);