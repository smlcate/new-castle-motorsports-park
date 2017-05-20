app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  // $http.get('/getEvents')
  // .then(function(res) {
  //   console.log(res.data);
  // })

  var monthNames =  ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

  var daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


  var date = new Date();


  $scope.date = {
    month: date.getMonth(),
    month_text: monthNames[date.getMonth()],
    date: date.getDate(),
    day: date.getDay()+1,
    year: date.getFullYear()
  }

  $scope.selectedMonth = $scope.date.month;
  $scope.selectedYear = $scope.date.year;
  $scope.selectedDate = $scope.date.date;
  $scope.selectedDay = $scope.date.day;
  $scope.selectedMonth_text = monthNames[$scope.selectedMonth];
  $scope.events = [];

  function buildCalendar() {

    console.log('hit 2')

    console.log($scope.events);

    var curMonthDays = monthDays[$scope.selectedMonth];
    var prevMonthDays;

    if ($scope.selectedMonth === 0) {
      prevMonthDays = monthDays[12];
    } else {
      prevMonthDays = monthDays[$scope.selectedMonth-1];
    }

    var monthStartDay;
    var firstN;

    var activeMonth = false;

    monthStartDay = new Date(monthNames[$scope.selectedMonth] + " 1," + $scope.selectedYear).getDay();

    if (monthStartDay == 0) {
      firstN = 1;
      activeMonth = true;
    } else if(monthStartDay == 1) {
      firstN = prevMonthDays;
    } else {
      firstN = prevMonthDays - (monthStartDay-1);
    }


    var month_events = [];

    var calendarDay = firstN;

    var dayOfWeek = 0;

    for (var i = 0; i < 42; i++) {

      var events = [];

      if ($scope.selectedMonth < 10) {

        var thisDate = $scope.selectedYear + '-0' + ($scope.selectedMonth + 1) + '-' + calendarDay + 'T04:00:00.000Z';

      } else {

        var thisDate = $scope.selectedYear + '-' + ($scope.selectedMonth + 1) + '-' + calendarDay + 'T04:00:00.000Z';

      }

      var cellBody = {
        date: calendarDay,
        day: dayOfWeek,
        curMonth: false,
        events: []
      }

      if(dayOfWeek == 1) {
        cellBody.events.push(
          {name:'Track Closed'}
        )
      } else if (dayOfWeek === 6) {
        dayOfWeek = 0;
        cellBody.events.push(
          {name:'Open Practice'}
        )
      } else {
        cellBody.events.push(
          {name:'Open Practice'}
        )
      }

      dayOfWeek ++;

      // console.log(cellBody.events, 'hit 1')

      // $http.post('/getEventByDate', {date: thisDate})
      // .then(function(res) {
      //   if (res.data[0] != 'undefined') {
      //     cellBody.events = res.data;
      //     console.log(cellBody)
      //     console.log(i)
      //     console.log(res.data);
      //
      //     cellBody.events = res.data[0];
      //     console.log(cellBody.events, 'hit 2');
      //
      //   }
      //
      // })
      // .catch(function(err) {
      //   console.log(err);
      // })


      if (calendarDay == prevMonthDays && i < 6) {


        // console.log(cellBody)
        month_events.push(cellBody);

        activeMonth = true;

        calendarDay = 1;

      } else if(calendarDay === curMonthDays && i > 6) {

        // cellBody = {
        //   date: calendarDay,
        //   day: dayOfWeek,
        //   curMonth: true
        // }

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = true;



        month_events.push(cellBody)

        activeMonth = false;

        calendarDay = 1;


      } else if(calendarDay < curMonthDays && i > 6 && activeMonth === false) {



        // cellBody = {
        //   date: calendarDay,
        //   day: dayOfWeek,
        //   curMonth: false
        // }
        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = false;

        calendarDay ++;



        month_events.push(cellBody);

      } else {

        // cellBody = {
        //   date: calendarDay,
        //   curMonth: activeMonth,
        //   day: dayOfWeek
        // }

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = activeMonth;

        calendarDay ++;


        month_events.push(cellBody);
      }

      // console.log(cellBody)

    }

    $scope.month_events = month_events;

    // console.log($scope.month_events);

    for (var i = 0; i < $scope.events.length; i++) {

      var date = $scope.events[i].date.slice(5,-17);
      var dateNumber = $scope.events[i].date.slice(8,-14);

      if (date[0] === 0) {
        date.slice(1)
      }
      if (date[0] === 0) {
        dateNumber.slice(1)
        console.log(dateNumber);
      }

      console.log(date);

      if ($scope.selectedMonth === date - 1) {


        month_events[dateNumber -1 + (monthStartDay)].events.push($scope.events[i]);
        month_events[dateNumber -1 + (monthStartDay)].events[0] = null;

      }

    }

  }

  function getEvents() {
    console.log('hit 1');
    $http.get('/getEvents')
    .then(function(res) {
      $scope.events = res.data;

      buildCalendar();
    })
  }

  getEvents();



  $scope.nextMonth = function() {

    if ($scope.selectedMonth == 11) {

      $scope.selectedMonth = 0;
      $scope.selectedYear ++;

    } else {

      $scope.selectedMonth ++;

    }

    $scope.selectedMonth_text = monthNames[$scope.selectedMonth];
    getEvents();
  }

  $scope.prevMonth = function() {

    if ($scope.selectedMonth == 0) {

      $scope.selectedMonth = 11;
      $scope.selectedYear --;

    } else {

      $scope.selectedMonth --;

    }

    $scope.selectedMonth_text = monthNames[$scope.selectedMonth];
    getEvents();
  }

  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/conditions/q/IN/New_Castle.json')
  .then(function(res) {

    var weather = res.data.current_observation;
    var url = weather.icon_url.slice(4);

    weather.icon_url = "https" + url;

    $scope.weather = weather;

  })

}])
