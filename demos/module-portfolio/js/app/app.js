var camApp = angular.module('camApp', [
  'ngAnimate',
  'ngRoute',
  'camAppControllers'
]);

camApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/app/:workId', {
        templateUrl: 'partials/work-detail.html',
        controller: 'WorkDetailCtrl'
      });
  }
]);
