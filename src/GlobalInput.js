// src/GlobalInput.js — глобальный перехват клавиш

const originalKeyPressed = Keyboard.prototype.keyPressed || function(){};

document.addEventListener('keydown', function(e) {
    const code = e.code;

    // Если открыто меню Controls — не трогаем
    if (document.getElementById('controls-menu')) return;

    // Переопределяем клавиши для игрока
    if (code === ControlsMenu.getKey('up'))    e.code = 'ArrowUp';
    if (code === ControlsMenu.getKey('down'))  e.code = 'ArrowDown';
    if (code === ControlsMenu.getKey('left'))  e.code = 'ArrowLeft';
    if (code === ControlsMenu.getKey('right')) e.code = 'ArrowRight';
    if (code === ControlsMenu.getKey('fire'))  e.code = 'Space';
    if (code === ControlsMenu.getKey('pause')) e.code = 'KeyP';
});
