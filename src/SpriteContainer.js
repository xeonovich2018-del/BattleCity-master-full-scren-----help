function SpriteContainer() {
  this._sprites = [];
}

SpriteContainer.prototype.add = function (sprite) {
  if (sprite) this._sprites.push(sprite);
};

SpriteContainer.prototype.remove = function (sprite) {
  var index = this._sprites.indexOf(sprite);
  if (index > -1) this._sprites.splice(index, 1);
};

SpriteContainer.prototype.update = function () {
  for (var i = 0; i < this._sprites.length; i++) {
    if (this._sprites[i]) this._sprites[i].update();
  }
};

SpriteContainer.prototype.draw = function (ctx) {
  for (var i = 0; i < this._sprites.length; i++) {
    if (this._sprites[i]) this._sprites[i].draw(ctx);
  }
};

SpriteContainer.prototype.clear = function () {
  this._sprites = [];
};
