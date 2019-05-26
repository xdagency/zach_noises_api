
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('reporters', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now());
        table.string('name');
        table.string('email').unique();
        table.string('password').notNullable();
        table.string('api_key');
        table.string('api_secret');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reporters') // drop table when reverting
};
