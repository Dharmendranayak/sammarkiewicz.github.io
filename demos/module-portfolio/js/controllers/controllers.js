var camAppControllers = angular.module('camAppControllers', []);

camAppControllers.controller('mainController', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('js/app/works.json').success(function(data){
      $scope.works = data;
    });
  }]);

camAppControllers.controller('WorkDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('js/app/' + $routeParams.workId + '.json').success(function(data) {
      $scope.work = data;
    });
  }
]);
