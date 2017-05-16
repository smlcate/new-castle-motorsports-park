app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/conditions/q/IN/New_Castle.json')
  .then(function(res) {
    // console.log(res.data)
    // $scope.weather_icon = res.data.current_observation.weather_icon
    var weather = res.data.current_observation;
    var url = weather.icon_url.slice(4);

    weather.icon_url = "https" + url;

    $scope.weather = weather;

    // console.log($scope.weather);
  })

}])
