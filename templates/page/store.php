<style>
h1{
  font-weight: bold;
}
</style>

<button ng-click="shopingCart()"><i class="fa fa-shopping-cart"></i> Cart</button>
<h1>SKILL SHOP</h1>
<p> Total: {{total}} <i class="fa fa-eur"></i></p>

<div class="shadow">
<card-panel ng-repeat="item in items" class="shop">
  <div class="flex">
    <div>
      <h1>{{item.name}}</h1>
      <p>{{item.description}}</p>
    </div>
    <div>
      <button class="category" ng-repeat="category in loadCategories(item)">{{category.category_name}}</button>
    </div>
  </div>
  <div>
  <button ng-click="readMore(item)"><i class="fa fa-external-link"></i> More</button>
  <button ng-click="addToCart(item)"><i class="fa fa-plus-square"></i> BUY</button>
  </div>
</card-panel>
</div>
