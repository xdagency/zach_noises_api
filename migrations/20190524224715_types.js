
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('types', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now());
        table.string('name').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('types') // drop table when reverting
};
