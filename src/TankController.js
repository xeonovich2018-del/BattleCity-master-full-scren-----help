function TankController(eventManager, tank) {
  SpriteController.call(this, eventManager, tank);
  this._eventManager.addSubscriber(this, [BaseExplosion.Event.DESTROYED]);
  this._active = true;
}

TankController.subclass(SpriteController);

TankController.prototype.notify = function (event) {
  SpriteController.prototype.notify.call(this, event);
  
  if (event.name == BaseExplosion.Event.DESTROYED) {
    this._sprite.stop();
    this._active = false;
  }
};

TankController.prototype.keyPressed = function (key) {
  if (!this._active || !this._sprite.canMove()) {
    return;
  }

  // === Стрельба ===
  if (key === ControlsMenu.getKey('fire') || key === Keyboard.Key.SPACE) {
    this._sprite.shoot();
    return;                    // важно: не передаём дальше, чтобы не было двойного срабатывания
  }

  // === Пауза ===
  if (key === ControlsMenu.getKey('pause')) {
    if (typeof togglePause === 'function') togglePause();
    return;
  }

  // === Движение (передаём в SpriteController) ===
  SpriteController.prototype.keyPressed.call(this, key);
};