app.service('jSQL',function($document, $compile){

  const self = this;

  this.compareProperties = function(arrayName, arrayMatch, opString){
    op = opString.split(" "); // every %2 is pairing

    let str = '';
    arrayName.forEach(function(name, index){
      let sec = index*2;
      str += arrayName[index]+' '+op[sec]+' '+arrayMatch[index];
      if(index+1 != arrayName.length){ str += ' '+op[sec+1]+' '; }
    });
    //console.log('compare: ', str);

    let operator = {
      '>': function(a, b){ return a > b },
      '>=': function(a, b){ return a >= b },
      '<=': function(a, b){ return a <= b },
      '<': function(a, b){ return a < b },
      '!=': function(a, b){ return a != b },
      '&&': function(a, b){ return a && b },
      '||': function(a, b){ return a || b },
      '==': function(a, b){ return a == b }
    }

    let comparePart = [];
    arrayName.forEach(function(name, index){
      comparePart.push(operator[op[index*2]](arrayName[index],  arrayMatch[index]));
    });

    str = '';
    comparePart.forEach(function(name, index){
      let sec = index*2;
      str += comparePart[index];
      if(index+1 != comparePart.length){ str += ' '+op[sec+1]+' '; }
    });
    //console.log('compare: ', str);

    let i = 0; // operator of group
    let oFinal = false;

    if(comparePart.length > 1){
      while(i*2 < op.length){
        let even = i * 2;
        let compare = operator[op[even + 1]];
        if(i == 0){
          oFinal = compare(comparePart[0], comparePart[1]);
        }
        else{
          if(op[even+1]){
            oFinal = compare(oFinal, comparePart[i + 1]);
          }
        }
        i++;
      }
    }
    else{ oFinal = comparePart[0]; }
    //console.log('compared final: ',oFinal);
    return oFinal;
  }

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

  this.selectFromArray = function(name, matchOperator, arrayMatch, inArray){
    return inArray.filter(function(obj){
      if(matchOperator){
        if(!Array.isArray(name)){ name = [ name ];}
        if(!Array.isArray(arrayMatch)){ arrayMatch = [ arrayMatch ];}
        let arrayName = [];
        name.forEach( function(val){ arrayName.push(obj[val]); } );
        return self.compareProperties( arrayName, arrayMatch, matchOperator);
      }
      else{
        console.error('jSQL matchOperator is not set');
        return obj[name] === equalsValue
      }

    });
  };

  this.deleteFromArray = function(name, matchOperator, arrayMatch, inArray){
    inArray.forEach(function(obj, index, arr){
      if(matchOperator){
        if(!Array.isArray(name)){ name = [ name ];}
        if(!Array.isArray(arrayMatch)){ arrayMatch = [ arrayMatch ];}
        let arrayName = [];
        name.forEach( function(val){ arrayName.push(obj[val]); } );
        if(self.compareProperties( arrayName, arrayMatch, matchOperator)){
          console.log('removed: ', obj);
          arr.splice( index, 1 );
        }
      }
    });
    console.log('jSQL delete');
  }

  this.updateInArray = function( updatedRow, name, matchOperator, equalsValue, inArray){
    // find affected arrays
    let foundArrays = self.selectFromArray(name, matchOperator, equalsValue, inArray);
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
      console.log('jSQL inserted: ', newRow );
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
