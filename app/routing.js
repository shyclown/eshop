

// Dynamically Add Routing
app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider ){
  let ctrl = 'homeController';
  $routeProvider.when('/home', {
      templateUrl: 'templates/page/home.php',
      controller: 'homeController'
  }).when('/store', {
      templateUrl: 'templates/page/store.php',
      controller: 'storeController'
  }).when('/cart', {
      templateUrl: 'templates/page/cart.php',
      controller: 'cartController'
  })
  .otherwise({ redirectTo: '/home' });

  $locationProvider.html5Mode(true);
}]);
