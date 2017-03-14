
<div id="StorePage">
  <h1>SKILL SHOP</h1>
  <div class="leftPanel shadow">
    <button class="listCategories" ng-click='addCategory()'>New Category</button>
    <button class="listCategories" ng-repeat="category in categories" ng-click="selectByCategory(category)">
      <div>
        {{category.name}}
      </div>
      <div class="categoryUsed">{{categoryUsed(category)}}</div>
    </button>
  </div>
  <div class="rightPanel shadow">
    <div class="top">
      <div class="categoryName">{{category.name}}  <i class="fa fa-cog" ng-click="editCategory(category)"></i></div>
      <button class="addNewItem" ng-click="editItemCategory()"><i class="fa fa-plus"></i> Add Item</button>
    </div>
  <card-panel ng-repeat="item in selected" class="shop">
    <div class="flex">
      <div>
        <h1>{{item.name}}</h1>
        <p>{{item.description}}</p>
      </div>
      <div class="categoriesListed">
        <button class="category" ng-repeat="category in loadCategories(item)" ng-click="selectByCategory(category)">{{category.name}}</button>
        <button class="category" ng-click="editItemCategory(item)"><i class="fa fa-pencil"></i></button>
      </div>
    </div>
    <div class="verticalFlex">
      <div class="store price">
        <div>
        {{ item.price }}
        <i class="fa fa-eur"></i>
        </div>
        <button> <i class="fa fa-edit"></i></button>
      </div>
      <button class="buy" ng-click="addToCart(item)">
        <i class="fa fa-plus-square"></i> BUY
      </button>
    </div>
  </card-panel>
  </div>
  <div style="clear:both"></div>
</div>
