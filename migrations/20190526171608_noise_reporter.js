
exports.up = function(knex, Promise) {
    return knex.schema.table('noises', function (table) {
        table.integer('reporter').references('id').inTable('reporters');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('noises', function (table) {
        table.dropColumn('reporter');
    });
};
