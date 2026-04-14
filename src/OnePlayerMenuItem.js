function OnePlayerMenuItem(sceneManager) {
  this._sceneManager = sceneManager;
}

OnePlayerMenuItem.prototype.getName = function() {
  return "1 PLAYER";
};

OnePlayerMenuItem.prototype.execute = function() {
  console.log("[DEBUG] Запуск уровня 1...");

  // FIX: передаём ТОЛЬКО stage, чтобы Level не получал число вместо объекта Player
  setTimeout(() => {
    this._sceneManager.toGameScene(1);
  }, 10);
};