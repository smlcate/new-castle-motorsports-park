
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      // return knex('events').insert([
      //   {id: 1, date: 'May 21, 2017', name: 'KRA 1', start_time: '8:00am', color:'lightblue', series_id: 1},
      //   {id: 2, date: 'May 24, 2017', name: 'Open Practice', color:'lightgreen'},
      //   {id: 3, date: 'May 25, 2017', name: 'Charity Event', color:'yellow', series_id: 3},
      //   {id: 4, date: 'June 1, 2017', name: 'Charity Event', color:'yellow', series_id: 3},
      //   {id: 5, date: 'June 2, 2017', name: 'Charity Event', color:'yellow', series_id: 3},
      //   {id: 6, date: 'June 30, 2017', name: 'Charity Event', color:'yellow', series_id: 3},
      //   {id: 7, date: 'May 21, 2017', name: 'Charity Event', start_time: '6:00pm', color:'yellow', series_id: 3},
      //   {id: 8, date: 'June 2, 2017', name: 'Open Practice', start_time: '8:00am', color:'lightgreen'},
      //   {id: 9, date: 'May 18, 2017', name: 'KRA Warmup', start_time: '8:00am', color:'lightblue'},
      //   {id: 10, date: 'June 4, 2017', name: 'KRA 2', start_time: '8:00am', color:'lightblue', series_id: 1},
      //   {id: 11, date: 'June 5, 2017', name: 'KRA 3', start_time: '8:00am', color:'lightblue', series_id: 1},
      //   {id: 12, date: 'July 4, 2017', name: 'Man Cup 1', start_time: '8:00am', color:'lightblue', series_id: 2},
      //   {id: 13, date: 'July 5, 2017', name: 'Man Cup 2', start_time: '8:00am', color:'lightblue', series_id: 2},
      //
      // ]);
    });
};
