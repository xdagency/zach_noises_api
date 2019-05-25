
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('noises', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now());
        table.float('severity').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('noises') // drop table when reverting
};
