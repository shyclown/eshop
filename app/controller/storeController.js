app.controller('storeController',function($scope, $routeParams, Store, jSQL, jDB, ngShared)
{
  console.log('store');

  $scope.addToCart = Store.addToCart;
  $scope.categories = jDB.categories;
  $scope.item_category = jDB.item_category;

  $scope.selectByCategory = Store.selectByCategory;

  const itemCategories = jSQL.innerjoinArrays(
    $scope.item_category, $scope.categories,
    'category_id', 'id', 'overwrite');

  const test = function(){alert('propmt was displayed');}
  $scope.prompted = function(){
    new ngShared.directiveElement(
      'prompt',
      { message: 'Opened prompt', description:'', cancelBtn: 'cancel', acceptBtn: 'accept' },
      test,
      $scope
    );
  }


  $scope.loadCategories = function(item){
    console.log('ic',itemCategories);
    return itemCategories.filter(
    function(obj){
      if (obj.item_id == item.id) {
        console.log(obj);
      }

     return obj.item_id == item.id;
    });
  }

  // how many times

  $scope.categoryUsed = function(category){
    return itemCategories.filter( function(obj){
      return obj.category_id == category.id; }).length;
  }
});
