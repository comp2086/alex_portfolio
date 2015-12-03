/*
File name: todo.service.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: a service for the todos module
*/
angular.module('todos').factory('Todos', ['$resource', function($resource) {
  return $resource('/todos/:id', null, {
    'update': { method: 'PUT' }
  });
}]);
