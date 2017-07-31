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
  $scope.selectedYear = $scope.date.year;
  $scope.selectedDate = $scope.date.date;
  $scope.selectedDay = $scope.date.day;
  $scope.selectedMonth_text = monthNames[$scope.selectedMonth];
  $scope.events = [];

  $scope.classInfo = [];

  $scope.currentDaysEvents = [];
  $scope.eventsAfterToday = [];

  $scope.selectedObject;

  $scope.selectedClass;

  $scope.pointsList;

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

  function getPoints() {

    $http.get('getPoints')
    .then(function(data) {
      console.log(data)
      makePointsList(data.data[0].pointsData);
      $scope.selectedClass = $scope.pointsList[0];
    })
    .catch(function(err) {
      console.log(err);
    })

  }

  getPoints();

  function makePointsList(data) {

    // console.log(data);

    var splitBreaks = data.split(/\r?\n/).map(function(r) {
      return r.split('","');
    },[]);;

    var classes = [];
    var c = []
    for (var i = 0; i < splitBreaks.length; i++) {

      if (splitBreaks[i].length === 2) {
        c.push(splitBreaks[i][0])
        classes.push(c);
        c = [];
        c.push(splitBreaks[i][1]);
      } else {
        c.push(splitBreaks[i]);
      }

    }

    // console.log(classes.length);

    var pointsData = [];

    for (var i = 0; i < classes.length; i++) {

      // console.log(i)
      // console.log( 'i' , i)

      var c = classes[i];

      var classData = {
        name: '',
        drivers: [],
        dates:[],
        points: []
      };

      var counter = 0;
      var finished = false;

      for (var j = 0; j < c.length; j++) {
        // console.log('j', j)


        var d = c[j];

        // console.log(d)
        if (c.length === 3 ) {
          var driver = {
            name: 'No Data'
          }
          classData.drivers.push(driver);
        }

        if (j === 0) {
          if (i === 0) {
            d = d[0].slice(2,-29)
            // console.log('here');
          } else {
            d = d.slice(0,-29);
          }
          // console.log(d);
          classData.name = d;
          // console.log(d);
        } else if (j === 2) {

          d = d[0].split(",,");

          classData.dates = d;

          for (var l = 0; l < d.length; l++) {
            if (d[l][0] === ',') {
              classData.dates[l] = d[l].slice(1);
              l = d.length;
            }
          }


          // classData.dates[0] = JSON.stringify(classData.dates[0]).slice(1)

        } else if(j > 3) {

          var driver = {
            name: '',
            positions: [],
            points: [],
            totalPoints: 0
          }

          d = d[0].split(',');
          console.log(d)

          if (d[0] == 0) {
            finished = true;
          }

          if (d[0] !== "" && d[0] !== " " && finished === false) {


            if (counter + 35 >= classes[i].length) {

              var point = {
                pos: d[0],
                score: d[1]
              }
              
              classData.points.push(point);

            } else if(d[0] !== "Position = Point Value") {

              driver.name = d[0];

              pp = true;

              for (var k = 1; k < d.length; k++) {
                if (pp === true) {
                  driver.positions.push(d[k]);
                  pp = false;
                } else if (pp === false) {
                  driver.points.push(d[k]);
                  pp = true;
                }
              }
              driver.totalPoints = driver.positions[14];
              driver.positions[14] = '';
              classData.drivers.push(driver);

            }

          }


          // console.log(driver);

          counter++;

        }
        // console.log(d)
        //
        // console.log(classData);



        // console.log(classData);

        // console.log(d)

      }

      // classData.drivers.slice(0,-1);

      pointsData.push(classData);


    }

    // console.log(pointsData);

    $scope.pointsList = pointsData;

    console.log($scope.pointsList)

  }

  $scope.selectClass = function(c) {
    $scope.selectedClass = c;
    console.log(c)
  }



  $scope.selectDay = function(day) {

    var obj = day;

    obj.day = daysOfWeek[(day.day)-1];
    obj.month = monthNames[(day.month)-1];

    $scope.selectedObject = obj;

  }

  $scope.selectEvent = function(event) {

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


    $scope.eventInfo.input = {
      name: event.name,
      color: event.color,
      description: event.description,
      startDate: new Date(event.date),
      startTime: new Date('December 17, 1995 ' + ns),
      endTime: new Date('December 17, 1995 ' + ne)

    }

  }

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

      dayOfWeek ++;


      if (calendarDay == prevMonthDays && i < 6) {

        month_events.push(cellBody);

        activeMonth = true;

        calendarDay = 1;

      } else if(calendarDay === curMonthDays && i > 6) {

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = true;

        month_events.push(cellBody)

        activeMonth = false;

        calendarDay = 1;


      } else if(calendarDay < curMonthDays && i > 6 && activeMonth === false) {

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = false;

        calendarDay ++;

        month_events.push(cellBody);

      } else {

        cellBody.date = calendarDay;
        cellBody.day = dayOfWeek;
        cellBody.curMonth = activeMonth;

        calendarDay ++;


        month_events.push(cellBody);
      }

    }

    $scope.month_events = month_events;

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

        days = Number((monthDays[m-1] - d1) + d2);

      } else {

        days = Number((monthDays[m-1] - d1) + d2);

      }
    } else {

      days = d2-d1;

    }

    event.length = days;

  }

  function getEvents() {

    $http.get('/getEvents')
    .then(function(res) {
      $scope.events = res.data;

      console.log(res.data)

      var today = new Date();

      var current = {
        year: today.getYear()+1900,
        day: today.getDate(),
        month: today.getMonth()+1
      }

      var eventful = false;

      for (var i = 0; i < res.data.length; i++) {

        var date = res.data[i].date.slice(0,-14);
        var time = res.data[i].date.slice(11,-1);

        var y = Number(date.slice(0,-6));
        var d = Number(date.slice(8))
        var m = Number(date.slice(5,-3))

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

          if (m > current.month) {

            $scope.eventsAfterToday.push(e);

          } else if(d >= current.day) {

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

      buildCalendar();

    })
  }

  getEvents();


  $scope.goToPage = function(s) {

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

    if($scope.eventInfo.series === false) {

      $('#addSeriesEventBtn').css('display','none');
      $('#seriesSelectDiv').css('display','flex');

    } else {

      $('#addSeriesEventBtn').css('display','flex');
      $('#seriesSelectDiv').css('display','none');
      $scope.eventInfo.selectedSeriesInfo = null;

    }


  }

  $scope.toggleNewSeries = function() {



  }

  $scope.toggleDays = function() {

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

    daysBetweenDates(event);

    $scope.eventInfo.events.push(event);

    console.log($scope.eventInfo)

  }

  // function parseExcelData(file) {
  //
  //   console.log(file);
  //
  // }

  $scope.pointsLists = [];


  $scope.updatePoints = function() {

    // if (window.File && window.FileReader && window.FileList && window.Blob) {
    //   alert("File API supported.!");
    // } else {
    //   alert('The File APIs are not fully supported in this browser.');
    // }

    var list = [];

    var files = document.getElementById('newPointsListInput').files;

    var x = 0;

    // console.log(files);

    function read(callback) {

      for (var i = 0; i < files.length; i++) {

        var reader = new FileReader();
        reader.readAsText(files[i], "UTF-8");
        reader.onload = loaded;

        function loaded(evt) {
          console.log(i)
          var fs = evt.target.result
          console.log(fs)
          list.push(fs);
        }

      }

      setTimeout(callback, 2000)

    }

    read(function post() {

      var stringified = JSON.stringify(list);

      $http.post('updatePoints', stringified)
      .then(function(res){
        console.log(res.data);
      })

    })

    // setTimeout(post(),3000);



    // for(i = 0; i < files.length; i++) {
    //
    //
    //   var reader = new FileReader();
    //   reader.readAsText(files[i], "UTF-8");
    //   reader.onload = loaded;
    //
    //   function loaded(evt) {
    //     fs = JSON.stringify(evt.target.result);
    //     list.push(fs);
    //     // console.log(i);
    //     if (x == files.length) {
    //       $http.post('updatePoints', list)
    //       .then(function(res) {
    //         console.log(res.data)
    //       })
    //     }
    //     x++;
    //   }
    //
    // }

    // $http.post('updatePoints', files)

    // function getAsText(readFile) {
    //
    // }

    // function createList() {
    //
    //   for (var i = 0; i < files.length; i++) {
    //
    //     var f = files[i]
    //
    //     if (f) {
    //       //  getAsText(file);
    //       // alert("Name: " + f.name + "\n" + "Last Modified Date :" + f.lastModifiedDate);
    //       var reader = new FileReader();
    //       reader.readAsText(f, "UTF-8");
    //       reader.onload = loaded;
    //
    //       function loaded(evt) {
    //         // alert("File Loaded Successfully");
    //         var fileString = evt.target.result;
    //
    //         list.push(fileString)
    //
    //         // $("#op").text(fileString);
    //         // var splitFS = fileString.split(/\r?\n/);
    //         //
    //         // var parsedFS = [];
    //         //
    //         // for (var k = 0; k < splitFS.length; k++) {
    //         //   var row = splitFS[k].split(',');
    //         //   var newRow = [];
    //         //   for (var j = 0; j < row.length; j++) {
    //         //     if(row[j] !== "") {
    //         //       newRow.push(row[j]);
    //         //     }
    //         //   }
    //         //   if (newRow[0] !== "" && newRow[0]) {
    //         //     parsedFS.push(newRow);
    //         //   }
    //         // }
    //         //
    //         // list.push(parsedFS);
    //         // // $scope.pointsLists = list;
    //         // console.log(list)
    //         //
    //         // console.log(i, files.length)
    //         //
    //         // if (i === files.length) {
    //         //
    //         //   console.log('hit')
    //         //
    //         //   var listString = JSON.stringify(list);
    //         //
    //         //   $http.post('updatePoints', listString)
    //         //   .then(function(res) {
    //         //     console.log(res.data)
    //         //   })
    //         //
    //         // }
    //
    //
    //
    //       }
    //
    //     }
    //   }
    //
    //   if (list != null) {
    //     var listString = JSON.stringify(list);
    //
    //     $http.post('updatePoints', listString)
    //     .then(function(res) {
    //       console.log(res.data)
    //     })
    //   }
    //
    // }
    //
    // createList();


    // $scope.pointsLists = list;
    // console.log(list)


    // console.log($('#newPointsListInput')[0].files)
    //
    // var files = $('#newPointsListInput')[0].files
    //
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //   console.log(this.responseText)
    // };
    // xhttp.open('GET', files[0].name, true);
    // xhttp.send();

    // var file = $('#newPointsListInput')[0].files[0]
    //
    // var reader = new FileReader();
    // console.log(reader);
    //
    // reader.onload = function(e) {
    //   var data = e.target.result;
      // console.log(data);
      // var cfb = XLSX.read(data, {type: 'binary'});
      // console.log(cfb)

      // var wb = XLSX.parse_xlscfb(cfb);
      // Loop Over Each Sheet
      // wb.SheetNames.forEach(function(sheetName) {
        // Obtain The Current Row As CSV
        // var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
        // var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
        //
        // $("#my_file_output").html(sCSV);
        // console.log(oJS)
      // });
    // };
    // reader.readAsText(file);
    //
    // // console.log($scope.newPointsList);
    //
    //
    // console.log(file);
    //
    //
    // parseExcelData(file);
  }

  $scope.selectSeries = function(series_name,series) {

    $scope.eventInfo.selectedSeries = series_name;
    $scope.eventInfo.selectedSeriesInfo = series;

  }

  $scope.submitEvent = function() {

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

    }

    $http.post('submitEvent', $scope.eventInfo.events)
    .then(function(res){

    })

  }

  $http.get('/getSeries')
  .then(function(res) {

    $scope.eventInfo.event_groups = res.data

  })


  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/conditions/q/IN/New_Castle.json')
  .then(function(res) {

    var weather = res.data.current_observation;
    var url = weather.icon_url.slice(4);

    weather.icon_url = "https" + url;

    $scope.weather = weather;

  })
  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/forecast10day/q/IN/New_Castle.json')
  .then(function(res) {

    $scope.tenDayForecast = res.data.forecast.simpleforecast.forecastday;

  })



}])
