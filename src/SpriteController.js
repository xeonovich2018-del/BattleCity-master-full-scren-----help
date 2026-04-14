function SpriteController(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
}

SpriteController.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED) {
    this.keyPressed(event.key);
  }
  else if (event.name == Keyboard.Event.KEY_RELEASED) {
    this.keyReleased(event.key);
  }
};

SpriteController.prototype.keyPressed = function (key) {
  // базовый класс — ничего не делает, всё в TankController
};

SpriteController.prototype.keyReleased = function (key) {
  // базовый класс — ничего не делает
};