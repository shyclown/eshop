app.service('ngShared',function($document, $compile){


  const self = this;
  let windowID = 0;
  self.openElement = [];
  //
  const directiveOBJ = function(name, generatedOBJ, item, callback, scope){
  this.html = '<'+name+' edit-obj="'+generatedOBJ+'"></'+name+'>';
  this.el = $compile( this.html )( scope );
  this.item = item;
  this.callback = callback;
  this.close = function(){ this.el.remove(); };
  }
  //

  this.directiveElement = function( name, item, callback, scope ){
    callback = callback || function(){};
    item = item || false;
    const generatedID = 'item_'+windowID;
    self.openElement[generatedID]= new directiveOBJ( name, generatedID, item, callback, scope);
    angular.element($document).find('body').append(self.openElement[generatedID].el);
    windowID++
  }




});
