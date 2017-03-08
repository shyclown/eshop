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
