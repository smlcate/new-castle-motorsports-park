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

  // console.log($scope.date)

  $scope.selectedMonth = $scope.date.month;
  $scope.selectedYear = $scope.date.year;
  $scope.selectedDate = $scope.date.date;
  $scope.selectedDay = $scope.date.day;
  $scope.selectedMonth_text = monthNames[$scope.selectedMonth];
  $scope.events = [];

  $scope.classInfo = [];

  $scope.currentDaysEvents = [];
  $scope.eventsAfterToday = [];

  $scope.selectedObject;

  function fillClassInfo() {

    var classes = [
      {
        name: '125cc Shifter',
        weight: 'ICC/Modified Moto 415 lbs, Stock Moto 390 lbs. Both engines will compete head to head with a weight break for the Stock Moto engine.',
        tires: 'Bridgestone YLM or YLC 450/710x5',
        notes: 'Air Boxes Mandatory. Ages 15 and up.  ICC - SKUSA Engine Rules.   Stock Moto - SKUSA Engine Rules for S3 Class, and RS Intake Boot Legal Modified Bottom Ends Can Be Ran with Stock Cylinder, Head, Piston and Ignition Box'
      },
      {
        name: 'Yamaha Junior Sportsman (Class #1 and #2, Runs Twice)',
        weight: '240 lbs',
        tires: 'YLC 450x5',
        notes: 'Air Boxes Mandatory. Ages 8-12. All Drivers Must Use an SFI Approved Ribvest.'
      },
      {
        name: 'Junior Novice Sportsman and Junior Novice',
        weight: 'Sportsman 250 lbs, Junior 305 lbs',
        tires: 'Sportsman YLC: 450x5,   Junior YLC: 450x5 front, 600x5 rear, 710x5 rear (710x5 only after race #5)',
        notes: 'Sportsman: Yamaha KT100 WA55 Carb Comer K80 can also be used at 235 lbs 8-12 Years Old SFI Approved Ribvest Mandatory.  Junior Novice: Yamaha KT100 WB3A Carb 12-15 Years Old SFI Approved Ribvest Recommended. (These classes are for less experienced kids and kids that need time to adjust to a racing environment. They are participation classes and not points classes.)'
      },
      {
        name: 'Rookie Yamaha: Yamaha Rookie will run with the Novice classes. Rookie Yamaha will run for points and requires a 3 Hole YBX exhaust.',
        weight: '230 lbs',
        tires: 'YLC 450x5',
        notes: 'Yamaha KT100 WA55 Carb 3 Hole YBX Can 7-12 Years Old SFI Approved Ribvest Mandatory'
      },
      {
        name: 'Yamaha Junior Can (Class #1 and #2, Runs Twice)',
        weight: '305 lbs',
        tires: 'YLC: 450x5 front, 600x5 rear or 710x5 rear (710x5 Mandatory after Race #5)',
        notes: 'Air Boxes Mandatory. 12-15 years old.'
      },
      {
        name: 'Briggs LO206 CIK Senior',
        weight: '365 lbs',
        tires: 'YLC 450x5 Front, 710x5 Rear. *See rules below for max wheel width',
        notes: '15 and up. Factory Briggs Rules for the LO206 engine. CIK Bodywork and Sprint Style Seats Legal Only. NCMP track race gas only, must pass tech. Scroll down to bottom of page for complete rules.'
      },
      {
        name: 'Briggs LO206 Senior',
        weight: '365 lbs',
        tires: 'YLC 450x5 Front, 710x5 Rear *See rules below for max wheel width',
        notes: '15 and up. Factory Briggs Rules for the LO206 engine. NCMP track race gas only, must pass tech. Traditional 4 Cycle Bodywork and Seats Legal, CIK Bodywork and Sprint Seats also legal. Scroll down to bottom of page for complete rules.'
      },
      {
        name: 'Briggs LO206 CIK Masters',
        weight: '370 lbs',
        tires: 'YLC 450x5 Front, 710x5 Rear *See rules below for max wheel width.',
        notes: '40 years old and up. Factory Briggs Rules for the LO206 engine. NCMP track race gas only, must pass tech. CIK Bodywork and Sprint Style Seats Legal Only. Scroll down to bottom of page for complete rules.'
      },
      {
        name: 'Briggs LO206 Junior CIK: This class will run on track with the Yamaha Novice and Rookie Classes.',
        weight: '320 lbs',
        tires: 'YLC 450x5 Front, 710x5 Rear *See rules below for max wheel width',
        notes: '12 to 15 years old. Factory Briggs Rules for the LO206 engine. Gold Carb Slide. CIK Bodywork and Sprint Style Seats Legal Only. NCMP track race gas only, must pass tech. Scroll down to bottom of page for complete rules.'
      },
      {
        name: 'Briggs LO206 Sportsman CIK: This class will run on track with the Yamaha Novice and Rookie Classes.',
        weight: '250 lbs',
        tires: 'YLC 450x5',
        notes: '8 to 12 years old. Factory Briggs Rules for the LO206 engine. Green Carb Slide. CIK Bodywork and Sprint Style Seats Legal Only. NCMP track race gas only, must pass tech. Scroll down to bottom of page for complete rules'
      },
      {
        name: 'Yamaha Can Senior',
        weight: '335 lbs',
        tires: 'YLC',
        notes: 'Air Boxes Mandatory 15 and up.'
      },
      {
        name: 'Yamaha Can Masters',
        weight: '360 lbs',
        tires: 'YLC',
        notes: 'Air Boxes Mandatory 30 years and up.'
      },
      {
        name: 'TaG Super Lite',
        weight: 'All Weights LISTED BELOW! Super Lite',
        tires: 'YLC',
        notes: 'Air Boxes Mandatory 15 and up. WKA Engine Rules'
      },
      {
        name: 'TaG Senior',
        weight: 'All Weights LISTED BELOW! SENIOR',
        tires: 'YLC',
        notes: 'Air Boxes Mandatory 15 and up. WKA Engine Rules'
      },
      {
        name: 'TaG Heavy',
        weight: 'All Weights LISTED BELOW! HEAVY',
        tires: 'YLC',
        notes: 'Air Boxes Mandatory 15 and up. WKA Engine Rules'
      },
      {
        name: 'TaG Junior',
        weight: '320 lbs.',
        tires: 'YLM',
        notes: 'Air Boxes Mandatory. 12-15 years old. WKA Engine Rules. Leopard 25mm Header. X30 29mm Header.'
      },
      {
        name: 'Unlimited (Will Run with Shifter)',
        weight: 'Weights and Rules Listed Below',
        tires: 'Any Bridgestone Tire',
        notes: 'Air Boxes Mandatory. 15 and Up.'
      },
      {
        name: 'Kid Karts',
        weight: '150 lbs',
        tires: '450x5 YLC Tires Only. Max Rear Tire Circumference 33 in.',
        notes: 'Class will Qualify and Race. 5-7 years old. All Drivers Must Use an SFI Approved Ribvest. The Honda GXH50 will be allowed to run in the class as well.'
      },





    ]

    $scope.classInfo = classes;

  }

  fillClassInfo();


  // $scope.goToFees = function() {
  //
  //   document.getElementById("pricesPar").scrollIntoView()
  //
  // }
  // $scope.goToPracticeRules = function() {
  //
  //   document.getElementById("pacticeRulesPar").scrollIntoView()
  //
  // }
  // $scope.goTopPitSpaces = function() {
  //
  //   document.getElementById("pitSpotPar").scrollIntoView()
  //
  // }
  // $scope.goToSeriesInfo = function() {
  //
  //   document.getElementById("seriesFormatInfoDiv").scrollIntoView()
  //
  // }
  // $scope.goToClassInfo = function() {
  //
  //   document.getElementById("classInfoPar").scrollIntoView()
  //
  // }

  $scope.selectDay = function(day) {
    // console.log(day)
    var obj = day;



    obj.day = daysOfWeek[(day.day)-1];
    obj.month = monthNames[(day.month)-1];

    $scope.selectedObject = obj;

    // console.log(obj)
    // if (obj.events.length >= 2) {
    //
    //   $('#selectedDayDiv').css('display','flex');
    //
    // } else {
    //
    //   $('#selectedDayDiv').css('display','none');
    //
    // }


    // console.log($scope.selectedObject)
  }

  $scope.selectEvent = function(event) {

    console.log(event)

    var y = event.date.slice(0,-20);
    var m = Number(event.date.slice(5,-17));
    var d = event.date.slice(8,-14);

    var dt = m + '/' + d + '/' + y;


    var sn1 = Number(event.start_time.slice(0,-6));

    var ss = event.start_time.slice(2);

    sn1 = sn1 - 5;

    var ns = sn1 + ss;

    var en1 = Number(event.end_time.slice(0,-6));

    var es = event.end_time.slice(2);

    if (Number(event.end_time.slice(0,-6)) >= 0 && Number(event.end_time.slice(0,-6)) <= 4) {

      en1 = 24 + en1 - 5

    } else {

      en1 = en1 - 5;

    }

    var ne = en1 + es;

    console.log(event.end_time)

    $scope.eventInfo.input = {
      name: event.name,
      color: event.color,
      description: event.description,
      startDate: new Date(event.date),
      startTime: new Date('December 17, 1995 ' + ns),
      endTime: new Date('December 17, 1995 ' + ne)

    }

    // console.log('0' + JSON.stringify(Number(event.start_time.slice(0,-6),-1)-5 + event.start_time.slice(2)))
    console.log(event.start_time)



    console.log($scope.eventInfo.input)

  }

  function buildCalendar() {

    // console.log('hit 2')

    // console.log($scope.events);

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
        month: $scope.selectedMonth+1,
        curMonth: false,
        events: []
      }

      if(dayOfWeek == 1) {
        // dayOfWeek = 1;
        cellBody.events.push(
          {
            name:'Track Closed',
            color: 'lightpink'
          }
        )
      } else if (dayOfWeek === 6) {
        dayOfWeek = -1;
        cellBody.events.push(
          {
            name:'Open Practice',
            color: 'lightgreen'
          }
        )
      } else {
        cellBody.events.push(
          {
            name:'Open Practice',
            color: 'lightgreen'
          }
        )
      }

      // cellBody.day = daysOfWeek[dayOfWeek-1];

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

    function getCurEvents() {
      var curDayEvent = {};
      var next3Events = [];
      // var today = new Date();
      // console.log(today);


    }

    getCurEvents();

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

      // console.log(date);

      if ($scope.selectedMonth === date - 1) {


        month_events[dateNumber -1 + (monthStartDay)].events.push($scope.events[i]);
        month_events[dateNumber -1 + (monthStartDay)].events[0] = null;

      }

    }

  }



  function daysBetweenDates(event) {
    var d1 = JSON.stringify(event.startDate).slice(9,-15);
    var d2 = JSON.stringify(event.endDate).slice(9,-15);
    // consolevent.log(d1)
    // consolevent.log(d2)
    var days;
    if (d1[0==='0']) {
      d1 = JSON.stringify(event.startDate).slice(11,-15)
    }
    if (d2[0==='0']) {
      d2 = JSON.stringify(event.endDate).slice(11,-15)
    }
    if (d2 < d1) {
      var m = Number(JSON.stringify(event.startDate).slice(6,-18));
      if (m[0]==='0') {
        m = m.slice(1)
        // consolevent.log(d1);
        // consolevent.log(JSON.stringify(event.endDate).slice(10,-15))
        days = Number((monthDays[m-1] - d1) + d2);
        // if (days[0]==='0') {
        //   days.slice(1)
        // }
        // consolevent.log(days);
      } else {
        days = Number((monthDays[m-1] - d1) + d2);
        // consolevent.log(days)
      }
    } else {
      days = d2-d1;
      // consolevent.log(days);
    }

    event.length = days;

  }

  function getEvents() {
    // console.log('hit 1');
    $http.get('/getEvents')
    .then(function(res) {
      $scope.events = res.data;

      console.log(res.data)

      // console.log(new Date())

      var today = new Date();

      var current = {
        year: today.getYear()+1900,
        day: today.getDate(),
        month: today.getMonth()+1
      }
      console.log(current);

      var eventful = false;

      for (var i = 0; i < res.data.length; i++) {

        var date = res.data[i].date.slice(0,-14);
        var time = res.data[i].date.slice(11,-1);

        var y = Number(date.slice(0,-6));
        var d = Number(date.slice(8))
        var m = Number(date.slice(5,-3))

        console.log(y, d, m);


        var e = res.data[i]

        if (e.start_time) {

          var sn1 = Number(e.start_time.slice(0,-6));

          var ss = e.start_time.slice(2);

          sn1 = sn1 - 5;

          var ns = sn1 + ss;

          var en1 = Number(e.end_time.slice(0,-6));

          var es = e.end_time.slice(2);

          if (Number(e.end_time.slice(0,-6)) >= 0 && Number(e.end_time.slice(0,-6)) <= 4) {

            en1 = 24 + en1 - 5

          } else {

            en1 = en1 - 5;

          }

          var ne = en1 + es;

          e.start_time = ns;
          e.end_time = ne;

        }


        if (y == current.year && d == current.day && m == current.month) {

          eventful = true;



          $scope.currentDaysEvents.push(e);
        }

        if (y == current.year && m >= current.month) {
          console.log('here 1')
          if (m > current.month) {
            console.log('here 2')
            $scope.eventsAfterToday.push(e);
          } else if(d >= current.day) {
            console.log('here 3')
            $scope.eventsAfterToday.push(e);
          }
        } else if (y > current.year) {
          $scope.eventsAfterToday.push(e);
        }

      }

      if (eventful === false) {
        if (today.getDay() === 1) {
          $scope.currentDaysEvents.push({
            name: 'Track Closed',
            color: 'lightpink',
            rentalKarts: false,
            start_time: '10:00:00',
            end_time: '19:00:00'
          })
        } else {
          $scope.currentDaysEvents.push({
            name: 'Open Practice',
            color: 'lightgreen',
            rentalKarts: true,
            start_time: '10:00:00',
            end_time: '19:00:00'
          })
        }
      }

      console.log($scope.eventsAfterToday)


      buildCalendar();
    })
  }

  getEvents();

  function getEventsFromTodayOn() {

  }

  $scope.goToPage = function(s) {
    console.log(s)

    document.getElementById(s).scrollIntoView()

  }


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

  $scope.eventInfo = {
    series: false,
    newSeries: true,
    selectedSeries: "None",
    events: [],
    event_groups: []
  }



  $scope.toggleSeries = function() {
    console.log($scope.eventInfo)

    if($scope.eventInfo.series === false) {
      $('#addSeriesEventBtn').css('display','none');
      $('#seriesSelectDiv').css('display','flex');
      // $('#eventDescriptionInput').css('width','100%');

    } else {
      $('#addSeriesEventBtn').css('display','flex');
      $('#seriesSelectDiv').css('display','none');
      $scope.eventInfo.selectedSeriesInfo = null;

      // $('#eventDescriptionInput').css('width','70%');
    }


  }

  $scope.toggleNewSeries = function() {



  }

  $scope.toggleDays = function() {

    console.log($scope.eventInfo)

    if($scope.eventInfo.singleDay === true) {
      $('#endDateSpan').css('display','none');
    } else {
      $('#endDateSpan').css('display','flex');
    }
  }

  $scope.addSeriesEvent = function(e) {


    var event = {
      startDate: e.startDate,
      endDate: e.endDate,
      name: e.name,
      description: e.description,
      color: e.color,
      repeatingEvent: $scope.eventInfo.series,
      newSeries: $scope.eventInfo.newSeries,
      selectedSeriesInfo: $scope.eventInfo.selectedSeriesInfo,
      start_time: e.startTime,
      end_time: e.endTime
    };

    event.displayDate = JSON.stringify(event.startDate).slice(6,-15)
    event.displayEndDate= JSON.stringify(event.endDate).slice(6,-15)
    // var d = e.startDate

    // event.id = $scope.eventInfo.events.length;

    console.log(JSON.stringify($('#eventStartDateInput').val()))

    // e.displayDate = JSON.stringify(e.startDate).slice(6,-15)
    // e.displayEndDate = JSON.stringify(e.endDate).slice(6,-15)

    // e.displayDate = JSON.stringify($('#eventStartDateInput').val())
    // e.displayEndDate = JSON.stringify($('#eventEndDateInput').val())
    //
    // e.startDate = d;
    // e.startDate = e.startDate.slice(5,-14);

    // e.id = $scope.eventInfo.events.length;



    daysBetweenDates(event);

    // var e = event;

    $scope.eventInfo.events.push(event);

    console.log($scope.eventInfo)

  }

  $scope.selectSeries = function(series_name,series) {

    console.log(series);

    $scope.eventInfo.selectedSeries = series_name;
    $scope.eventInfo.selectedSeriesInfo = series;

    console.log($scope.eventInfo);

  }

  $scope.submitEvent = function() {

    // var newEvent = {
    //   event: $scope.eventInfo.events,
    //   series: $scope.eventInfo.selectedSeriesInfo;
    // }

    if ($scope.eventInfo.series === false) {

      var event = {
        startDate: $scope.eventInfo.input.startDate,
        endDate: $scope.eventInfo.input.endDate,
        name: $scope.eventInfo.input.name,
        description: $scope.eventInfo.input.description,
        color: $scope.eventInfo.input.color,
        singleEvent: $scope.eventInfo.input.singleDay,
        seriesId: $scope.eventInfo.selectedSeriesInfo.id
      };


      daysBetweenDates(event);

      $scope.eventInfo.events.push(event);

      console.log('hit');

    }

    $http.post('submitEvent', $scope.eventInfo.events)
    .then(function(res){
      console.log(res.data)
    })

  }

  $http.get('/getSeries')
  .then(function(res) {
    $scope.eventInfo.event_groups = res.data

    console.log(res.data);

  })


  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/conditions/q/IN/New_Castle.json')
  .then(function(res) {

    console.log(res.data);

    var weather = res.data.current_observation;
    var url = weather.icon_url.slice(4);

    weather.icon_url = "https" + url;

    $scope.weather = weather;

  })
  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/forecast10day/q/IN/New_Castle.json')
  .then(function(res) {

    console.log(res.data);


    $scope.tenDayForecast = res.data.forecast.simpleforecast.forecastday;

  })



}])
