<body ng-app="myapp" ng-controller="mainController">
<div id="topNav">
  <div class="left">
    <nav>
      <ul>
          <li><a href="home">Home</a></li>
          <li><a href="store">Store</a></li>

      </ul>
    </nav>
  </div>
  <div class="right">
    {{total}}<i class="fa fa-eur"></i>
    <a href="cart"><i class="fa fa-shopping-cart"></i> Cart</a>
  </div>
</div>
<div ng-view></div>
</body>
