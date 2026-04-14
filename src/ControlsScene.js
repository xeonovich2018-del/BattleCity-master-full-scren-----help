function ControlsScene(sceneManager) {
  this._sceneManager = sceneManager;
  this._eventManager = this._sceneManager.getEventManager();
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED]);

  this._actions = [
    { name: "ВВЕРХ",     action: "up" },
    { name: "ВНИЗ",      action: "down" },
    { name: "ВЛЕВО",     action: "left" },
    { name: "ВПРАВО",    action: "right" },
    { name: "ОГОНЬ",     action: "fire" },
    { name: "ПАУЗА",     action: "pause" }
  ];

  this._selected = 0;
  this._rebinding = false;
  this._rebindingAction = null;

  Controls.init(); // загружаем актуальные клавиши
}

ControlsScene.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED) {
    this.keyPressed(event.key);
  }
};

ControlsScene.prototype.keyPressed = function (keyCode) {
  if (this._rebinding) {
    // Меняем клавишу
    Controls.current[this._rebindingAction] = keyCode;
    Controls.save();
    this._rebinding = false;
    this._rebindingAction = null;
    return;
  }

  // Навигация
  if (keyCode == Keyboard.Key.UP) {
    this._selected = Math.max(0, this._selected - 1);
  }
  else if (keyCode == Keyboard.Key.DOWN) {
    this._selected = Math.min(this._actions.length - 1, this._selected + 1);
  }
  else if (keyCode == Keyboard.Key.FIRE || keyCode == Keyboard.Key.START) {
    // Начинаем переназначение
    this._rebinding = true;
    this._rebindingAction = this._actions[this._selected].action;
  }
  else if (keyCode == Keyboard.Key.SELECT) {
    // Выход в главное меню
    this._sceneManager.toMainMenuScene(true);
  }
};

ControlsScene.prototype.update = function () {
  // ничего не нужно
};

ControlsScene.prototype.draw = function (ctx) {
  // === ФОН И ШРИФТ КАК В ИГРЕ ===
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.font = "16px prstart";        // ← тот же шрифт, что и в главном меню
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "top";

  // Заголовок
  ctx.fillText("НАСТРОЙКИ УПРАВЛЕНИЯ", 72, 64);

  // Список действий
  for (var i = 0; i < this._actions.length; i++) {
    var y = 138 + i * 36;
    var action = this._actions[i];

    // Подсветка выбранного
    if (i === this._selected) {
      ctx.fillStyle = "#ffff00";
      ctx.fillRect(90, y - 4, 340, 28);
      ctx.fillStyle = "#000000";
    } else {
      ctx.fillStyle = "#ffffff";
    }

    ctx.fillText(action.name, 120, y);

    // Текущая клавиша
    var keyName = Controls.getKeyName(Controls.getKey(action.action));
    ctx.fillText(keyName, 320, y);
  }

  // Режим переназначения
  if (this._rebinding) {
    ctx.fillStyle = "#ff0000";
    ctx.fillText("НАЖМИ НОВУЮ КЛАВИШУ...", 98, 380);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.fillText("↑↓ — ВЫБОР    SPACE — ИЗМЕНИТЬ    SELECT — В МЕНЮ", 38, 380);
  }
};