function Gamefield(eventManager) {
  this._eventManager = eventManager;
  this._sprites = new SpriteContainer();
  this._collisionDetector = new CollisionDetector(this._sprites, this._eventManager);
  this._pause = new Pause(this._eventManager);
}

Gamefield.prototype.update = function () {
  if (this._pause.isPaused()) return;
  this._sprites.update();
  this._collisionDetector.detectCollisions();
};

Gamefield.prototype.draw = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, Globals.CANVAS_WIDTH, Globals.CANVAS_HEIGHT);
  this._sprites.draw(ctx);
};

Gamefield.prototype.clear = function () {
  this._sprites.clear();
};

Gamefield.prototype.addSprite = function (sprite) {
  this._sprites.add(sprite);
};

Gamefield.prototype.removeSprite = function (sprite) {
  this._sprites.remove(sprite);
};
