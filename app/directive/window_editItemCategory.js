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
        if(changedText(item)){ updateText(item); }

        let oldCategories = jSQL.selectFromArray('item_id','==', oItem.id, jDB.item_category);
        oldCategories.forEach(function(old, index)
        {
          let removeCategory = true;
          scope.usedCategories.forEach(function(used){
            if(old.category_id == used.id){ removeCategory = false,
              remove(scope.usedCategories, used);
          }});
          if(removeCategory){ deleteTag(old.category_id, item.id) }
        });
        updateTags(scope.usedCategories, item)
        oItemWindow.close();
        oItemWindow.callback();
      }

      scope.cancel = function(){
        oItemWindow.close();
        oItemWindow.callback();
      }
      /* Functions */
      const changedText = function(item){ return oItem.name != item.name || oItem.description != item.description; }
      const changedTags = function(){}

      const updateText = function(item){
        jSQL.updateInArray({ name: item.name, description: item.description },
          'id', '==', item.id,
          jDB.items
        );
      }
      const deleteTag = function(tagID, itemID){
        jSQL.deleteFromArray(
          ['category_id','item_id'], '== && ==', [tagID, itemID],
          jDB.item_category
        );
      }
      const insertTag = function(tagID, itemID){
        jSQL.insertInArray({ item_id: itemID, category_id: tagID },
          jDB.item_category
        );
      }
      const updateTags = function(newTags, item){
        if(newTags.length){ newTags.forEach(function(newTag){
            insertTag(newTag.id, item.id);
        });}
      }
    }
  }
}]);
