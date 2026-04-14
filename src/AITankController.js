function AITankController(eventManager, tank) {
  this._eventManager = eventManager;
  this._tank = tank;
  this._active = true;

  // Таймер смены направления (каждые 25–55 кадров — как в оригинале)
  this._changeDirectionTimer = new BlinkTimer(25, 55);

  this._eventManager.addSubscriber(this, [Tank.Event.DESTROYED]);
}

AITankController.prototype.notify = function (event) {
  if (event.name === Tank.Event.DESTROYED && event.tank === this._tank) {
    this._active = false;
  }
};

AITankController.prototype.update = function () {
  if (!this._active || !this._tank) return;

  this._changeDirectionTimer.update();

  // Меняем направление, когда таймер срабатывает
  if (this._changeDirectionTimer.isOn()) {
    this._changeRandomDirection();
  }

  // Враги постоянно едут (как и игрок)
  this._tank.startMoving();
};

AITankController.prototype._changeRandomDirection = function () {
  var dirs = [
    Sprite.Direction.UP,
    Sprite.Direction.DOWN,
    Sprite.Direction.LEFT,
    Sprite.Direction.RIGHT
  ];

  // Выбираем случайное направление
  var newDir = dirs[Math.floor(Math.random() * dirs.length)];

  // Поворачиваем танк
  if (newDir === Sprite.Direction.UP)    this._tank.turnUp();
  if (newDir === Sprite.Direction.DOWN)  this._tank.turnDown();
  if (newDir === Sprite.Direction.LEFT)  this._tank.turnLeft();
  if (newDir === Sprite.Direction.RIGHT) this._tank.turnRight();

  // Сразу начинаем движение
  this._tank.startMoving();
};
