app.directive('windowEditCategory',['ngShared', function(ngShared){
  return{
    restrict: 'E',
    transclude: true,
    templateUrl:'app/template/window_editCategory.html',
    link: function(scope, element, attrs){

      const oCategory = ngShared.openElement[attrs.editObj];

      scope.text = {
        top: { name: 'Category' },
        button: {
          insert: 'INSERT CATEGORY',
          cancel: 'CANCEL',
          delete: 'REMOVE CATEGORY',
          save: 'SAVE CHANGES'
        }
      };
      const newCategory = {
        name: 'New category name',
        description:'Category description'
      };
      scope.new = true;
      if(!oCategory.item){
        scope.category = Object.assign({}, newCategory);
      }
      else{
        scope.new = false;
        scope.category = Object.assign({}, oCategory.item);
      }
      scope.insert = function(){ oCategory.callback(scope.category, 'insert');  oCategory.close(); }
      scope.delete = function(){ oCategory.callback(scope.category, 'delete' );  oCategory.close(); }
      scope.save = function(){ oCategory.callback(scope.category, 'save');  oCategory.close(); }
      scope.cancel = function(){
        oCategory.close();
      }
    }
  }
}]);
