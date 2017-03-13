app.service('Store',function($document, $compile, jDB, jSQL){

  const self = this;
  this.cart = [];
  this.selected = [];
  this.category = [];
  this.total = 0;
  let cartID = 0;


  function remove(arr, item){
    let index = arr.indexOf(item);
    if(index != -1){ arr.splice( index, 1 );}
  }

  this.selectByCategory = function(category){
    console.log(category);
    // make select and search by without joining
    self.category = category;
    self.selected = jSQL.innerjoinArrays(
      jSQL.selectFromArray('category_id', category.id, jDB.item_category,'=='),
      jDB.items,'item_id','id','keep_right');
      console.log(self.selected);
  }

  this.addToCart = function(item){
    let inCart;
    inCart = self.cart.find(function(cart_obj){ return cart_obj.itemID == item.id; });
    if(inCart){ inCart.amt++; self.total = self.total + inCart.item.price;}
    else{
      self.cart.push({ cartID: cartID, itemID: item.id, item: item, amt: 1 });
      self.total = self.total + item.price;
      cartID++;
    }
  }
  this.removeFromCart = function(inCart){
    inCart.amt--;
    self.total = self.total - inCart.item.price;
    if(inCart.amt === 0){ remove(self.cart, inCart); }
  }
  this.addAmount = function(item){
    item.ammount++
  }
});
