
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pointsList', function(table) {
    table.increments();
    table.date('date');
    table.text('pointsData');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pointsList');
};
