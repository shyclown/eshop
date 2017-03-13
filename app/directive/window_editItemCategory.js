app.directive('windowEditItemCategory',['ngShared', 'jSQL', 'jDB',
function(ngShared, jSQL, jDB){
  return{
    restrict: 'E',
    transclude: true,
    templateUrl:'app/template/window_editItemCategory.html',
    link: function(scope, element, attrs){

      const oItem = ngShared.openElement[attrs.editObj];
      scope.item = oItem.item;
      let itemCategories = jSQL.selectFromArray('item_id', oItem.item.id, jDB.item_category);

      scope.usedCategories = [];
      scope.unusedCategories = [];

      jDB.categories.forEach(function(category){
        used = false;
        itemCategories.forEach(function(ic){
          used = ic.category_id == category.id;
        });
        if(used){ scope.usedCategories.push(category); }
        else{ scope.unusedCategories.push(category); }
      });

      function remove(arr, item){
        let index = arr.indexOf(item);
        if(index != -1){ arr.splice( index, 1 );}
      }

      scope.addToUsed = function(category) {
        scope.usedCategories.push(category);
        jSQL.insertInArray(
          {category_id: category.id, item_id: oItem.item.id},
          jDB.item_category);
        remove(scope.unusedCategories, category);
      }

      scope.removeFromUsed = function(category) {
        scope.unusedCategories.push(category);
        jSQL.deleteFromArray('item_id', oItem.item.id,
        jSQL.selectFromArray('category_id', category.id,
        jDB.item_category));
        remove(scope.usedCategories, category);
      }

      scope.typedCategory = '';

      scope.pickPanel = function(){
        if(scope.typedCategory != ''){
          let rx = new RegExp(scope.typedCategory,'i');
          return scope.unusedCategories.filter(function(category){
          return rx.test(category.name);
          });
        }
        else return scope.unusedCategories;
      }



      scope.text = {
        top: { name: 'Category' },
        button: {
          insert: 'INSERT CATEGORY',
          cancel: 'CANCEL',
          delete: 'REMOVE CATEGORY',
          save: 'SAVE CHANGES'
        }
      };

      scope.cancel = function(){
        oItem.close();
      }
    }
  }
}]);
