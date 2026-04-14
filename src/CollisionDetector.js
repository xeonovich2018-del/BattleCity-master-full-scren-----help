function CollisionDetector(sprites, eventManager) {
  this._sprites = sprites;
  this._eventManager = eventManager;
}

CollisionDetector.Event = {
  COLLISION: 'CollisionDetector.Event.COLLISION',
  OUT_OF_BOUNDS: 'CollisionDetector.Event.OUT_OF_BOUNDS'
};

CollisionDetector.prototype.detectCollisions = function () {
  var sprites = this._sprites;
  for (var i = 0; i < sprites.length; i++) {
    for (var j = i + 1; j < sprites.length; j++) {
      var s1 = sprites[i];
      var s2 = sprites[j];
      if (s1 && s2 && !s1.isDestroyed && !s2.isDestroyed && s1.intersects && s1.intersects(s2)) {
        if (this._eventManager) {
          this._eventManager.fireEvent({
            name: CollisionDetector.Event.COLLISION,
            initiator: s1,
            sprite: s2
          });
        }
      }
    }
  }
};
