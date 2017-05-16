app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('https://api.wunderground.com/api/7c8eaaf84b5e5dd0/conditions/q/IN/New_Castle.json')
  .then(function(res) {
    console.log(res.data)
    $scope.weather = res.data.current_observation;
  })

}])
