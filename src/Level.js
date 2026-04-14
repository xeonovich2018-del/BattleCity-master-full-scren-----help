function Level(sceneManager, stage) {
  this._sceneManager = sceneManager;
  this._eventManager = this._sceneManager.getEventManager();   // ← теперь безопасно
  
  this._stage = stage || 1;
  this._playerLives = 3;
  this._enemyCount = 20;

  this._gamefield = new Gamefield(this._eventManager);   // ← передаём eventManager
  this._builder = new Builder(this._eventManager, this._gamefield);

  this._playerTankFactory = new PlayerTankFactory(this._eventManager, this._gamefield);
  this._enemyFactory = new EnemyFactory(this._eventManager, this._gamefield);
  this._aiTankControllerContainer = new AITankControllerContainer(this._eventManager);

  this._livesView = new LivesView(this._eventManager);
  this._enemyFactoryView = new EnemyFactoryView(this._eventManager);

  this._eventManager.addSubscriber(this, [
    Tank.Event.PLAYER_DESTROYED,
    Tank.Event.ENEMY_DESTROYED,
    Tank.Event.CREATED
  ]);

  this._initLevel();
}

Level.prototype._initLevel = function () {
  this._gamefield.clear();
  this._builder.buildStage(this._stage);

  this._playerTank = this._playerTankFactory.create(Globals.PLAYER_SPAWN_X, Globals.PLAYER_SPAWN_Y);
  this._player = new Player(this._playerTank, this._eventManager);

  this._enemiesLeft = this._enemyCount;
  this._enemiesOnField = 0;
};

Level.prototype.notify = function (event) {
  if (event.name === Tank.Event.PLAYER_DESTROYED) {
    this._playerLives--;
    if (this._playerLives <= 0) {
      this._sceneManager.toGameOverScene();
    } else {
      setTimeout(() => {
        this._playerTank = this._playerTankFactory.create(Globals.PLAYER_SPAWN_X, Globals.PLAYER_SPAWN_Y);
        this._player.setTank(this._playerTank);
      }, 500);
    }
  }

  if (event.name === Tank.Event.ENEMY_DESTROYED) {
    this._enemiesLeft--;
    this._enemiesOnField--;
    this._enemyFactoryView.decrease();
    
    if (this._enemiesLeft <= 0) {
      setTimeout(() => {
        this._sceneManager.toStageStatisticsScene(this._stage, this._player, false);
      }, 800);
    }
  }

  if (event.name === Tank.Event.CREATED && event.tank && event.tank.isEnemy()) {
    this._enemiesOnField++;
  }
};

Level.prototype.update = function () {
  if (this._enemiesOnField < 4 && this._enemiesLeft > this._enemiesOnField) {
    if (Math.random() < 0.03) {
      this._enemyFactory.createRandom();
    }
  }

  this._aiTankControllerContainer.update();
  this._aiTankControllerContainer.removeDestroyed();

  this._gamefield.update();
  this._livesView.update();
  this._enemyFactoryView.update();
};

Level.prototype.draw = function (ctx) {
  this._gamefield.draw(ctx);
  this._livesView.draw(ctx);
  this._enemyFactoryView.draw(ctx);
};

Level.prototype.getGamefield = function () {
  return this._gamefield;
};

Level.prototype.getPlayer = function () {
  return this._player;
};

Level.prototype.getStage = function () {
  return this._stage;
};