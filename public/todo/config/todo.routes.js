angular.module('todos').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/todos.html',
    controller: 'TodoController'
  })
  .when('/:id', {
    templateUrl: '/todoDetails.html',
    controller: 'TodoDetailCtrl'
  });
}]);
