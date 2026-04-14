function AITankControllerContainer(eventManager) {
  this._eventManager = eventManager;
  this._controllers = [];

  // Подписываемся только после того, как Tank уже создан
  this._eventManager.addSubscriber(this, [Tank.Event.CREATED]);
}

AITankControllerContainer.prototype.notify = function (event) {
  if (event.name === Tank.Event.CREATED && event.tank && event.tank.isEnemy()) {
    var controller = new AITankController(this._eventManager, event.tank);
    this._controllers.push(controller);
  }
};

AITankControllerContainer.prototype.update = function () {
  for (var i = 0; i < this._controllers.length; i++) {
    if (this._controllers[i]) {
      this._controllers[i].update();
    }
  }
};

AITankControllerContainer.prototype.removeDestroyed = function () {
  for (var i = this._controllers.length - 1; i >= 0; i--) {
    if (!this._controllers[i] || !this._controllers[i]._active) {
      this._controllers.splice(i, 1);
    }
  }
};