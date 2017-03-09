app.controller('storeController',function($scope, $routeParams, Store, jSQL, jDB, ngShared)
{
  $scope.addToCart = Store.addToCart;
  $scope.categories = jDB.categories;
  $scope.item_category = jDB.item_category;

  $scope.selectByCategory = Store.selectByCategory;

  const itemCategories = jSQL.innerjoinArrays(
    $scope.item_category, $scope.categories,
    'category_id', 'id', 'overwrite_left');

  $scope.addCategory = function(){
    new ngShared.directiveElement( 'window-edit-category', false ,
    function(newCategory){ jSQL.insertInArray(newCategory, jDB.categories);},
    $scope);
  }



  $scope.loadCategories = function(item){
    return itemCategories.filter(
    function(obj){
     return obj.item_id == item.id;
    });
  }

  // how many times

  $scope.categoryUsed = function(category){
    return itemCategories.filter( function(obj){
      return obj.category_id == category.id; }).length;
  }
});
