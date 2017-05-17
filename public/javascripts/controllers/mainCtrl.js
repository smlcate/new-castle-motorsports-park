app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/conditions/q/IN/New_Castle.json')
  .then(function(res) {

    var weather = res.data.current_observation;
    var url = weather.icon_url.slice(4);

    weather.icon_url = "https" + url;

    $scope.weather = weather;

  })

  // $(window).scroll(function() {
  //   var windowY = $(window).height();
  //   var scrolledY = $(window).scrollTop();
  //   // console.log(windowY);
  //   // console.log(scrolledY);
  //
  //   var image_url = '../images/newCastleTurn1_001.jpg';
  //
  //   if (scrolledY > windowY) {
  //     image_url = '../images/NEW-CASTLE-MOTORSPORTS-PARK.jpg';
  //   }
  //
  //   $('.contentDiv').css('background', "image(" + image_url + ")");

  // })

}])
