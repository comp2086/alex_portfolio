angular.module('todos').factory('Todos', ['$resource', function($resource) {
  return $resource('/todos/:id', null, {

  });
}]);
