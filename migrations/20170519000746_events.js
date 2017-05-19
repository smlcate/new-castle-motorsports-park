
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
    table.increments();
    table.date('date');
    table.string('name');
    table.text('description');
    table.time('start_time');
    table.time('end_time');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
