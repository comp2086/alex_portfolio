/*
File name: todo.routes.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: Main angular module routes
*/
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
