app.service('jSQL',function($document, $compile){

  const self = this;

  this.innerjoinArrays = function(arrOne, arrTwo, match_one, match_two, rename){
    return arr = arrOne.filter(function(itemOne)
    {
      let matched = arrTwo.filter(function(itemTwo)
      {
        return itemTwo[match_two] == itemOne[match_one];
      })[0]; // only first matched
      if(matched)
      {
        if(!rename){ self.copyUniqueProperties(itemOne, matched); }
        else if(rename == 'overwrite'){ self.overrideProperties(itemOne, matched); }
        else if(rename == 'keep_right'){ angular.copy(matched, itemOne); }
        else if(rename == 'keep_left'){ angular.copy(itemOne, matched); }
        else{ self.attachNamedProperties(itemOne, matched, rename); }
      }
      return true;
    });
  };

  this.selectFromArray = function(name, equalsValue, inArray){
    return inArray.filter(function(obj){ return obj[name] == equalsValue});
  };

  this.copyUniqueProperties = function(target_obj, source_obj){
    for( let property in source_obj){
      let exist = false;
      for( let target_property in target_obj){
        if( target_property == property ){ exist = true; }
      }
      if(!exist){ target_obj[property] = source_obj[property]; }
    }
  }

  this.overrideProperties = function(target_obj, source_obj){
    for( let property in source_obj){
      let exist = false;
      for( let target_property in target_obj){
        if( target_property == property ){ exist = true; }
      }
      if(exist){ target_obj[property] = source_obj[property]; }
      else{ target_obj[property] = source_obj[property]; }
    }
  }

  this.attachNamedProperties = function(target_obj, source_obj, rename){
    for( let property in source_obj){
      let newProperty = rename +'_'+ property;
      target_obj[newProperty] = source_obj[property];
    }
  }


});
