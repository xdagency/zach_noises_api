
exports.up = function(knex, Promise) {
    return knex.schema.table('noises', function (table) {
        table.integer('type').references('id').inTable('types');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('noises', function (table) {
        table.dropColumn('type');
    });
};
