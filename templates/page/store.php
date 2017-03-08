
<style>
.leftPanel{
  width: 250px;
  background-color: #FFF;
  float: left;
}
.rightPanel{
  width: calc(100% - 250px);
  float: right;
}
.listCategories{
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  line-height: 16px;
  height: 48px;
  width: 250px;
  padding: 16px;
  background-color: #FFF;
  border: none;
  outline: none;
  border-bottom: 1px solid #CCC;
}
.listCategories:last-child{
  border-bottom: none;
}
.categoryUsed{
  box-sizing: border-box;
  height: 16px;
  border-radius: 12px;
  padding: 2px 8px;
  line-height: 12px;
  font-size: 12px;
  border: none;
  outline: none;
  background-color: #7986CB;
  color: #FFF;
}
.listCategories:hover{
  background-color: #7986CB;
  color: #FFF;
  cursor: pointer;
}
.categoriesListed{
  margin-left: 16px;
}
</style>
<h1>SKILL SHOP</h1>
<div>
  <div class="leftPanel shadow">
    <button class="listCategories" ng-repeat="obj in categories" ng-click="selectByCategory(obj)">
      <div>{{obj.name}}</div>
      <div class="categoryUsed">{{categoryUsed(obj)}}</div>
    </button>
  </div>

  <div class="rightPanel shadow">
  <card-panel ng-repeat="item in selected" class="shop">
    <div class="flex">
      <div>
        <h1>{{item.name}}</h1>
        <p>{{item.description}}</p>
      </div>
      <div class="categoriesListed">
        <button class="category" ng-repeat="category in loadCategories(item)" ng-click="selectByCategory(category)">{{category.name}}</button>
      </div>
    </div>
    <div>
    <button ng-click="readMore(item)"><i class="fa fa-external-link"></i> More</button>
    <button ng-click="addToCart(item)"><i class="fa fa-plus-square"></i> BUY</button>
    </div>
  </card-panel>
  </div>
</div>
