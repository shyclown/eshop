app.directive('prompt',['ngShared', function(ngShared){
  return{
    restrict: 'E',
    transclude: true,
    scope:{},
    templateUrl:'app/template/prompt.html',
    link: function(scope, element, attrs){
      console.log(attrs);
      console.dir(ngShared.openElement);
      const popup = ngShared.openElement[attrs.editObj];
      console.log(popup);

      scope.message = popup.item.message;
      scope.description = popup.item.description;
      scope.acceptBtn = popup.item.acceptBtn;
      scope.cancelBtn = popup.item.cancelBtn;

      scope.accept = function(){
        popup.callback();
        popup.close();
      }
      scope.cancel = function(){
        popup.close();
      }
    }
  }
}]);
