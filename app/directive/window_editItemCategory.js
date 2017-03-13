app.directive('windowEditItemCategory',['ngShared', 'jSQL', 'jDB',
function(ngShared, jSQL, jDB){
  return{
    restrict: 'E',
    transclude: true,
    templateUrl:'app/template/window_editItemCategory.html',
    link: function(scope, element, attrs){

      const oItemWindow = ngShared.openElement[attrs.editObj];
      const oItem = oItemWindow.item;
      scope.item = Object.assign({}, oItem);

      let itemCategories = jSQL.selectFromArray(
        'item_id', '==', oItem.id,
        jDB.item_category
      );

      scope.usedCategories = [];
      scope.unusedCategories = [];

      jDB.categories.forEach(function(category){
        let used = false;
        itemCategories.forEach(function(ic){
          if(ic.category_id == category.id){
            used = true;
            scope.usedCategories.push(category);
          }
        });
        if(!used){ scope.unusedCategories.push(category); }

      });

      function remove(arr, item){
        let index = arr.indexOf(item);
        if(index != -1){ arr.splice( index, 1 );}
      }
      scope.addToUsed = function(category) {
        scope.usedCategories.push(category);
        remove(scope.unusedCategories, category);
      }
      scope.removeFromUsed = function(category) {
        scope.unusedCategories.push(category);
        remove(scope.usedCategories, category);
      }
      /* Pick Panel */
      scope.typedCategory = '';
      scope.pickPanel = function(){
        if(scope.typedCategory != ''){
          let rx = new RegExp(scope.typedCategory,'i');
          return scope.unusedCategories.filter(
            function(category){ return rx.test(category.name);}
          );
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

      scope.save = function(item){
        console.log('saved');
        if(oItem.name != item.name || oItem.description != item.description){
            jSQL.updateInArray(
              { name: item.name, description: item.description },
              'id', '==', scope.item.id, jDB.items
            );
        }

        let oldCategories = jSQL.selectFromArray('item_id','==', oItem.id, jDB.item_category);
        oldCategories.forEach(function(old, index){
          let removeCategory = true;
          scope.usedCategories.forEach(function(used){
            if(old.category_id == used.id){
              removeCategory = false,
              remove(scope.usedCategories, used);
            }
          });
          if(removeCategory){
            jSQL.deleteFromArray(
              ['category_id','item_id'],
              '== && ==',
              [old.category_id, item.id],
              jDB.item_category
            );
          }
        });
        if(scope.usedCategories.length){
          scope.usedCategories.forEach(function(used){
            jSQL.insertInArray({
              item_id: item.id,
              category_id: used.id
            },
              jDB.item_category);
          });
        }
        oItemWindow.close();
        oItemWindow.callback();
      }
      scope.cancel = function(){
        oItemWindow.close();
        oItemWindow.callback();
      }
    }
  }
}]);
