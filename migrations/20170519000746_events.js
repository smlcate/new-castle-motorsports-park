
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
    table.increments();
    table.integer('series_id')
    table.date('date');
    table.string('name');
    table.text('description');
    table.time('start_time');
    table.time('end_time');
    table.string('color');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
