function MainMenu() {
  this._items = [];
  this._item = 0;
}

MainMenu.prototype.setItems = function (items) {
  this._items = items;
};

MainMenu.prototype.getCurrentItem = function () {
  return this._items[this._item];
};

MainMenu.prototype.isCurrent = function (item) {
  return item === this.getCurrentItem();
};

MainMenu.prototype.nextItem = function () {
  this._item++;
  if (this._item >= this._items.length) {
    this._item = 0;
  }
};

MainMenu.prototype.executeCurrentItem = function () {
  this.getCurrentItem().execute();
};

MainMenu.prototype.getItemsInfo = function () {
  var result = [];
  
  this._items.forEach(function (item) {
    var info = {};
    info['name'] = item.getName();
    info['isCurrent'] = this.isCurrent(item);
    result.push(info);
  }, this);
  
  return result;
};

// ====================== НОВЫЙ ПУНКТ МЕНЮ ======================
// Добавлено: Controls сразу под Construction

function ControlsItem() {}

ControlsItem.prototype.getName = function() {
    return "CONTROLS";
};

ControlsItem.prototype.execute = function() {
    if (typeof ControlsMenu !== "undefined" && typeof ControlsMenu.show === "function") {
        ControlsMenu.show();
    } else {
        console.error("ControlsMenu не найден. Убедись, что файл ControlsMenu.js подключён.");
    }
};