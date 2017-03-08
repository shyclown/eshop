app.service('Store',function($document, $compile){

  const self = this;
  this.cart = [];
  this.total = 0;
  let cartID = 0;

  function remove(arr, item){
    let index = arr.indexOf(item);
    if(index != -1){ arr.splice( index, 1 );}
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
