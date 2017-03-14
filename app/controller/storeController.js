app.controller('storeController',function($scope, $routeParams, Store, jSQL, jDB, ngShared)
{
  $scope.addToCart = Store.addToCart;
  $scope.categories = jDB.categories;
  $scope.item_category = jDB.item_category;
  $scope.selectByCategory = Store.selectByCategory;

  const itemCategoryMerge = function(){
    return jSQL.innerjoinArrays(
      $scope.item_category, $scope.categories,
      'category_id', 'id', 'overwrite_left'
    );
  }

  let itemCategories = itemCategoryMerge();

  $scope.addCategory = function(){
    new ngShared.directiveElement( 'window-edit-category', false ,
    function(newCategory){
      jSQL.insertInArray(newCategory, jDB.categories);},
    $scope);
  }
  $scope.loadCategories = function(item){
    return itemCategories.filter( function(obj){ return obj.item_id == item.id; });
  }
  $scope.editCategory = function(category){
    new ngShared.directiveElement(
      'window-edit-category', category ,
      function(editCategory, act){
        if(act === 'save'){
          console.log(editCategory);
          jSQL.updateInArray(editCategory, 'id', '==',editCategory.id, jDB.categories); }
        if(act === 'delete'){ jSQL.deleteFromArray('id','==', editCategory.id, jDB.categories); }
        itemCategories = itemCategoryMerge();
      },
      $scope);
  }
  $scope.editItemCategory = function(item){
    new ngShared.directiveElement('window-edit-item-category', item,
    function(res){
      $scope.selectByCategory($scope.category);
      itemCategories = itemCategoryMerge();
    },
    $scope);
  }
  // returns number
  $scope.categoryUsed = function(category){
    return jDB.item_category.filter(
      function(obj){ return obj.category_id == category.id; }
    ).length;
  }
});
