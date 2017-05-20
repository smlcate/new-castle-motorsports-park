
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, date: 'May 21, 2017', name: 'KRA 1', start_time: '8:00am'},
        {id: 2, date: 'May 24, 2017', name: 'Open Practice'},
        {id: 3, date: 'May 25, 2017', name: 'Charity Event'},
        {id: 4, date: 'June 1, 2017', name: 'Charity Event'},
        {id: 5, date: 'June 2, 2017', name: 'Charity Event'},
        {id: 6, date: 'June 30, 2017', name: 'Charity Event'},
        {id: 7, date: 'May 21, 2017', name: 'Charity Event', start_time: '6:00pm'},
        {id: 8, date: 'June 2, 2017', name: 'Open Practice', start_time: '8:00am'},
        {id: 9, date: 'May 18, 2017', name: 'KRA Warmup', start_time: '8:00am'},

      ]);
    });
};
