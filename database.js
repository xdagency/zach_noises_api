'use strict';

// DB connections
const   knex = require('knex')(require('./knexfile')),
        bookshelf = require('bookshelf')(knex);

// Resoloves circular dependencies with relations        
bookshelf.plugin('registry');

module.exports = bookshelf;