
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event_group').del()
    .then(function () {
      // Inserts seed entries
      // return knex('event_group').insert([
      //   {id: 1, name: 'KRA'},
      //   {id: 2, name: 'Man Cup'},
      //   {id: 3, name: 'Charity Events'}
      // ]);
    });
};
