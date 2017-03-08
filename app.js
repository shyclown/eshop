const app = angular.module('myapp',['ngRoute','ngSanitize']);

app.controller('mainController',function($scope, Store)
{
  // init with values
  $scope.total = 0;

  // watch change in values
  $scope.$watch(
    function(){ return Store.total; },
    function(){ $scope.total = Store.total; },
  true);
  $scope.$watch(
    function(){ return Store.category; },
    function(){ $scope.category = Store.category; },
  true);
  $scope.$watch(
    function(){ return Store.selected; },
    function(){ $scope.selected = Store.selected; },
  true);
  // main nav routing
  $scope.links = [
    { name : 'HOME', href:'home'},
    { name : 'STORE', href:'store'},
    { name : 'CART', href:'cart'}
  ];
});
