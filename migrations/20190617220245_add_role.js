
exports.up = function(knex, Promise) {
    return knex.schema.table('reporters', function (table) {
        table.string('role');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('reporters', function (table) {
        table.dropColumn('role');
    });
};
