<style>
h1{
  font-weight: 100;
}


div.price{
  box-sizing: border-box;
  color: #666;
  padding: 16px;
  line-height: 16px;
}

div.amount.price{
  display: inline-block;
  color: black;
  font-weight: bold;
  background-color: #EAEAEA;
}
card-panel.cart{
  position: relative;
}
card-panel.cart h3{
  font-weight: 100;
  font-size: 32px;
  display: inline-block;
  padding: 0px;
  margin: 0px; }

card-panel.cart .wrap{
  height: 48px;
  display: flex;
  justify-content: flex-end;

  width: 100%;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

card-panel.cart .wrap .ctrlAMT{
  display: flex;
 background-color: #EFEFEF;
}
button.amt{
  box-sizing: border-box;
  line-height: 16px;
  font-size: 16px;
  height: 48px;
  padding: 16px;
  border: none;
  color: #000;
}
div.nrAMT{
  box-sizing: border-box;
  line-height: 16px;
  height: 48px;
  display: block;
  padding: 16px;
}
</style>

<h1><i class="fa fa-shopping-cart"></i> CART</h1>
<p> Total: {{total}} <i class="fa fa-eur"></i></p>
<div class="shadow">
  <card-panel class="cart" ng-repeat="stored in cart">
    <h3>{{stored.item.name}}</h3>
    <div class="price">{{stored.item.price}} <i class="fa fa-eur"></i></div>
    <div class="wrap">
      <div class="ctrlAMT">
        <button class="amt" ng-click="removeFromCart(stored)"><i class="fa fa-minus"></i></button>
        <div class="nrAMT">{{stored.amt}}</div>
        <button class="amt" ng-click="addToCart(stored.item)"><i class="fa fa-plus"></i></button>
      </div>
      <div class="amount price">{{stored.amt * stored.item.price}} <i class="fa fa-eur"></i></div>
    </div>
  </card-panel>
</div>
