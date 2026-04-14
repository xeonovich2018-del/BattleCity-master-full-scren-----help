function SpriteController(eventManager, sprite) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
  this._sprite = sprite;
  this._pauseListener = new PauseListener(this._eventManager);
}

SpriteController.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED && !this._pauseListener.isPaused()) {
    this.keyPressed(event.key);
  }
  else if (event.name == Keyboard.Event.KEY_RELEASED) {
    this.keyReleased(event.key);
  }
};

SpriteController.prototype.keyPressed = function (key) {
  if (!this._sprite.canMove()) return;

  const upKey    = ControlsMenu.getKey('up');
  const downKey  = ControlsMenu.getKey('down');
  const leftKey  = ControlsMenu.getKey('left');
  const rightKey = ControlsMenu.getKey('right');

  console.log(`[KeyPressed] Получена клавиша: ${key} | Up:${upKey} Down:${downKey}`);

  if (key === upKey || key === Keyboard.Key.UP) {
    this._sprite.setDirection(Sprite.Direction.UP);
    this._sprite.toNormalSpeed();
  }
  else if (key === downKey || key === Keyboard.Key.DOWN) {
    this._sprite.setDirection(Sprite.Direction.DOWN);
    this._sprite.toNormalSpeed();
  }
  else if (key === leftKey || key === Keyboard.Key.LEFT) {
    this._sprite.setDirection(Sprite.Direction.LEFT);
    this._sprite.toNormalSpeed();
  }
  else if (key === rightKey || key === Keyboard.Key.RIGHT) {
    this._sprite.setDirection(Sprite.Direction.RIGHT);
    this._sprite.toNormalSpeed();
  }
};

SpriteController.prototype.keyReleased = function (key) {
  const dir = this._sprite.getDirection();

  const upKey    = ControlsMenu.getKey('up');
  const downKey  = ControlsMenu.getKey('down');
  const leftKey  = ControlsMenu.getKey('left');
  const rightKey = ControlsMenu.getKey('right');

  if ((dir === Sprite.Direction.LEFT  && (key === leftKey  || key === Keyboard.Key.LEFT)) ||
      (dir === Sprite.Direction.RIGHT && (key === rightKey || key === Keyboard.Key.RIGHT)) ||
      (dir === Sprite.Direction.UP    && (key === upKey    || key === Keyboard.Key.UP)) ||
      (dir === Sprite.Direction.DOWN  && (key === downKey  || key === Keyboard.Key.DOWN))) {
    
    this._sprite.stop();
  }
};