app.controller('storeController',function($scope, $routeParams, Store, jSQL)
{
  console.log('store');

  $scope.addToCart = Store.addToCart;
  $scope.items = [
    { id: 1, name: 'PHP', description: 'item description', price:15},
    { id: 2, name: 'JAVASCRIPT', description: 'item description', price:15},
    { id: 3, name: 'CSS', description: 'item description', price:8},
    { id: 4, name: 'HTML', description: 'item description', price:8},
    { id: 5, name: 'ANGULARJS', description: 'item description', price:12}
  ];
  $scope.categories = [
    { id: 1, name: 'Backend', description: 'Description' },
    { id: 2, name: 'Frontend', description: 'Description' }
  ];
  $scope.item_category = [
    { id: 1, category_id: 1, item_id: 1 },
    { id: 2, category_id: 2, item_id: 1 },
    { id: 3, category_id: 1, item_id: 3 }
  ];


  let itemCategories = jSQL.innerjoinArrays( $scope.item_category, $scope.categories, 'category_id', 'id', 'category');
  $scope.loadCategories = function(item){ return itemCategories.filter(function(obj){ return obj.item_id == item.id; }); }

});
