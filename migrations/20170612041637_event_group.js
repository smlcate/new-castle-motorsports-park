
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_group', function(table) {
    table.increments();
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_group');
};
