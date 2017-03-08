app.controller('cartController',function($scope, $routeParams, Store)
{
  console.log('store');
  $scope.$watch(
    function(){ return Store.cart; },
    function(){ $scope.cart = Store.cart; },
  true);
  $scope.addToCart = Store.addToCart;
  $scope.removeFromCart = Store.removeFromCart;
  $scope.addAmount = function(cart_item){ console.log(cart_item); cart_item.amt++; }
  $scope.cart = [];
  $scope.params = $routeParams;
});
