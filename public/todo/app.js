/*
File name: app.js
Author: Alex Andriishyn
Website: http://alexandriishyn.azurewebsites.net/
File description: Main angular module
*/
var mainAppModuleName = 'todos';

var mainAppModule = angular.module(mainAppModuleName, ['ngRoute', 'ngResource']);

// Bootstrap with jqLite
angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAppModuleName]);
});
