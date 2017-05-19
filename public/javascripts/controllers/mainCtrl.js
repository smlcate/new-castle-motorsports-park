app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

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
  $scope.selectedMonth_text = monthNames[$scope.selectedMonth];

  function buildCalendar() {


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

    function getMonthStartDate() {

      monthStartDay = new Date(monthNames[$scope.selectedMonth] + " 1," + $scope.date.year).getDay();

      if (monthStartDay == 0) {
        firstN = 1;
        activeMonth = true;
      } else if(monthStartDay == 1) {
        firstN = prevMonthDays;
      } else {
        firstN = prevMonthDays - (monthStartDay-1);
      }

    }

    getMonthStartDate();


    var month_events = [];

    var calendarDay = firstN;

    for (var i = 0; i < 42; i++) {

      if (calendarDay == prevMonthDays && i < 6) {


        var cellBody = {
          date: calendarDay,
          curMonth: false
        }


        month_events.push(cellBody);

        activeMonth = true;

        calendarDay = 1;

      } else if(calendarDay === curMonthDays && i > 6) {

        var cellBody = {
          date: calendarDay,
          curMonth: true
        }

        month_events.push(cellBody)

        activeMonth = false;

        calendarDay = 1;


      } else if(calendarDay < curMonthDays && i > 6 && activeMonth === false) {



        var cellBody = {
          date: calendarDay,
          curMonth: false
        }

        calendarDay ++;

        month_events.push(cellBody);

      } else {

        var cellBody = {

          date: calendarDay,
          curMonth: activeMonth

        }

        calendarDay ++;

        month_events.push(cellBody);
      }


    }

    $scope.month_events = month_events;

  }

  buildCalendar();

  $scope.nextMonth = function() {

    if ($scope.selectedMonth == 11) {

      $scope.selectedMonth = 0;

    } else {

      $scope.selectedMonth ++;

    }

    $scope.selectedMonth_text = monthNames[$scope.selectedMonth];
    buildCalendar();
  }

  $scope.prevMonth = function() {

    if ($scope.selectedMonth == 0) {

      $scope.selectedMonth = 12;

    } else {

      $scope.selectedMonth --;

    }

    $scope.selectedMonth_text = monthNames[$scope.selectedMonth];
    buildCalendar();
  }

  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/conditions/q/IN/New_Castle.json')
  .then(function(res) {

    var weather = res.data.current_observation;
    var url = weather.icon_url.slice(4);

    weather.icon_url = "https" + url;

    $scope.weather = weather;

  })

}])
