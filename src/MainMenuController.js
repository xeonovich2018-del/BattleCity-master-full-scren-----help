function MainMenuController(eventManager, mainMenu) {
  this._eventManager = eventManager;
  this._mainMenu = mainMenu;
  this._active = false;

  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED]);
}

MainMenuController.prototype.activate = function () {
  this._active = true;
};

MainMenuController.prototype.deactivate = function () {
  this._active = false;
};

MainMenuController.prototype.notify = function (event) {
  if (!this._active) return;

  if (event.name === Keyboard.Event.KEY_PRESSED) {
    this.keyPressed(event.key);
  }
};

MainMenuController.prototype.keyPressed = function (key) {
  // Навигация по меню
  if (key === Keyboard.Key.UP || key === Controls.getKey('up')) {
    if (typeof this._mainMenu.previousItem === 'function') {
      this._mainMenu.previousItem();
    } else if (typeof this._mainMenu.prevItem === 'function') {
      this._mainMenu.prevItem();
    }
  }
  else if (key === Keyboard.Key.DOWN || key === Controls.getKey('down')) {
    if (typeof this._mainMenu.nextItem === 'function') {
      this._mainMenu.nextItem();
    } else if (typeof this._mainMenu.next === 'function') {
      this._mainMenu.next();
    }
  }
  // Выбор пункта (Enter, Space, Fire)
  else if (key === Keyboard.Key.FIRE || 
           key === Keyboard.Key.START || 
           key === 13 ||                    // Enter
           key === Controls.getKey('fire')) {
    
    this._active = false; // защита от повторного нажатия

    var selectedItem = this._mainMenu.getSelectedItem ? 
                       this._mainMenu.getSelectedItem() : 
                       this._mainMenu.getCurrentItem();

    if (selectedItem && typeof selectedItem.execute === 'function') {
      setTimeout(() => {
        selectedItem.execute();
      }, 10);
    }
  }
};