function TankController(eventManager, tank) {
  this._eventManager = eventManager;
  this._tank = tank;
  this._active = true;

  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
}

TankController.prototype.notify = function (event) {
  if (event.name === Keyboard.Event.KEY_PRESSED) {
    this.keyPressed(event.key);
  }
  else if (event.name === Keyboard.Event.KEY_RELEASED) {
    this.keyReleased(event.key);
  }
};

TankController.prototype.keyPressed = function (key) {
  if (!this._active || !this._tank) return;

  // === ВЫСТРЕЛ ===
  if (key === Controls.getKey('fire') || key === Keyboard.Key.SPACE) {
    this._tank.shoot();
    return;
  }

  // === ДВИЖЕНИЕ — вызываем startMoving() КАЖДЫЙ кадр, пока клавиша зажата ===
  if (key === Controls.getKey('up')) {
    this._tank.turnUp();
    this._tank.startMoving();
  }
  else if (key === Controls.getKey('down')) {
    this._tank.turnDown();
    this._tank.startMoving();
  }
  else if (key === Controls.getKey('left')) {
    this._tank.turnLeft();
    this._tank.startMoving();
  }
  else if (key === Controls.getKey('right')) {
    this._tank.turnRight();
    this._tank.startMoving();
  }
};

TankController.prototype.keyReleased = function (key) {
  if (!this._tank) return;

  if (key === Controls.getKey('up') ||
      key === Controls.getKey('down') ||
      key === Controls.getKey('left') ||
      key === Controls.getKey('right')) {
    this._tank.stopMoving();
  }
};