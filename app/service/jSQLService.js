app.service('jSQL',function($document, $compile){

  const self = this;

  this.innerjoinArrays = function(arrOne, arrTwo, match_one, match_two, action, rename){
    let arrLeft = [];
    let arrRight = [];

    arrOne.forEach( function(itemOne){
      let matched = arrTwo.filter(function(itemTwo){
        return itemTwo[match_two] == itemOne[match_one];
      })[0]; // only first matched
      if(matched){
        arrLeft.push(Object.assign({},itemOne));
        arrRight.push(Object.assign({},matched));
      }
    });

    let oReturn = [];
    if(action == 'keep_left'){ return arrLeft; }
    else if (action == 'keep_right'){ return arrRight; }
    else{
      targetLeft = true;
      for (var i = 0; i < arrLeft.length; i++) {
        let itemOne = arrLeft[i];
        let matched = arrRight[i];
        if(!action){ console.error('jSQL: action needs to be set'); }
        else if(action == 'unique_left'){ self.copyUniqueProperties(itemOne, matched); }
        else if(action == 'unique_right'){ self.copyUniqueProperties(matched, itemOne); targetLeft = false; }
        else if(action == 'overwrite_left'){ self.overrideProperties(itemOne, matched); }
        else if(action == 'overwrite_right'){ self.overrideProperties(matched, itemOne); targetLeft = false; }
        else if(action == 'rename_right'){ self.attachNamedProperties(itemOne, matched, rename); }
        else if(action == 'rename_left'){ self.attachNamedProperties(matched, itemOne, rename); targetLeft = false; }
      }
      oReturn = targetLeft ? arrLeft : arrRight; // operations are done on left array
    }
    return oReturn;
  };

  this.selectFromArray = function(name, equalsValue, inArray){
    return inArray.filter(function(obj){ return obj[name] === equalsValue });
  };

  this.deleteFromArray = function(name, equalsValue, inArray){
    let foundArrays = this.selectFromArray(name, equalsValue, inArray);
    inArray.forEach(function(item, index, arr){
      if( item[name] === equalsValue ){ arr.splice( index, 1 ); }
    });
    console.log('jSQL delete');
  }

  this.updateInArray = function( updatedRow, name, equalsValue, inArray){
    // find affected arrays
    let foundArrays = self.selectFromArray(name, equalsValue, inArray);
    let properties = [];
    for (let property in inArray[0]){ properties.push(property); }
    if(self.allPropertiesExist(properties, updatedRow)){
      properties.forEach(function(prop){
        if(prop!='id'){
          foundArrays.forEach(function(row){
            inArray[row.id-1][prop] = updatedRow[prop];
          });
        }
      });
      console.log('jSQL updated: ', foundArrays );
    }
  }

  this.insertInArray = function( newRow, inArray){
    // check properties
    let error = false;
    let properties = [];

    for( let property in inArray[0]){ properties.push(property); }
    if(self.allPropertiesExist(properties, newRow)){
      // build object
      let newObj = {};
      properties.forEach(function(prop){
        if(prop === 'id'){  newObj[prop] = inArray[inArray.length-1].id + 1; }
        else{
          if(!newRow[prop]){ newObj[prop] = false; }
          else{ newObj[prop] = newRow[prop]; }
        }
      });
      inArray.push(newObj);
    }
  }

  this.allPropertiesExist = function(properties, newArray){
    for( let property in newArray){
      if( property === 'id'){ console.warn( 'Warning: jSQL provided ID will be ignored and overwriten by GeneratedID')}
      if(!properties.find(function(item){ return item === property; })){
        console.error('Error: jSQL to jDB Array: [Array.'+property+'] is not defined in target.');
        return false;
      }
    }
    return true;
  }


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
