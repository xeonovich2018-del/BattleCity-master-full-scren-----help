function SceneManager(eventManager) {
  this._eventManager = eventManager;
  this._scene = null;
}

SceneManager.prototype.setScene = function (scene) {
  this._scene = scene;
};

SceneManager.prototype.getScene = function () {
  return this._scene;
};

SceneManager.prototype.toLoadingScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new LoadingScene(this);
};

SceneManager.prototype.toMainMenuScene = function (arrived) {
  this._eventManager.removeAllSubscribers();
  this._scene = new MainMenuScene(this);
  
  if (arrived === true) {
    this._scene.arrived();        // сразу показываем меню без анимации
  }
};

SceneManager.prototype.toGameScene = function (stage) {
  this._eventManager.removeAllSubscribers();
  this._scene = new GameScene(this, stage || 1);
};

SceneManager.prototype.toConstructionScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new Construction(this);
};

SceneManager.prototype.toStageStatisticsScene = function (stage, player, gameOver) {
  this._eventManager.removeAllSubscribers();
  this._scene = new StageStatisticsScene(this, stage, player, gameOver);
};

SceneManager.prototype.toGameOverScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new GameOverScene(this);
};

SceneManager.prototype.toControlsScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new ControlsScene(this);
};

SceneManager.prototype.update = function () {
  if (this._scene) {
    this._scene.update();
  }
};

SceneManager.prototype.draw = function (ctx) {
  if (this._scene) {
    this._scene.draw(ctx);
  }
};

SceneManager.prototype.getEventManager = function () {
  return this._eventManager;
};