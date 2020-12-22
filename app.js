(function () {
  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getItemsToBeBought();
    toBuyList.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtList = this;
    alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
      alreadyBoughtList.canceled = function (index) {
      ShoppingListCheckOffService.canceled(index);
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBeBought = [
      { name: "dark chocolates", quantity: 25 },
      { name: "chips", quantity: 20 },
      { name: "cookies", quantity: 10 },
      { name: "dates", quantity: 5 },
      { name: "popcorn", quantity: 5 },
    ];

    var boughtItems = [];

    service.buyItem = function (index) {
      var item = itemsToBeBought[index];
      boughtItems.push(item);
      itemsToBeBought.splice(index, 1);
    };

     service.canceled = function(index){
       var item = boughtItems[index];
        itemsToBeBought.push(item);
        boughtItems.splice(index , 1);
     }

    service.getItemsToBeBought = function () {
      return itemsToBeBought;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }
})();
