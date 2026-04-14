// src/Controls.js
// Настраиваемые клавиши для BattleCity (совместимо с твоим Keyboard.js)

var Controls = {
    DEFAULT: {
        up:    38,   // ArrowUp
        down:  40,   // ArrowDown
        left:  37,   // ArrowLeft
        right: 39,   // ArrowRight
        fire:  32,   // Space (выстрел)
        pause: 80    // P (открытие меню настроек)
    },

    current: {
        up:    38,
        down:  40,
        left:  37,
        right: 39,
        fire:  32,
        pause: 80
    }
};

Controls.load = function() {
    var saved = localStorage.getItem('battleCityControls');
    if (saved) {
        Object.assign(Controls.current, JSON.parse(saved));
    } else {
        Object.assign(Controls.current, Controls.DEFAULT);
    }
};

Controls.save = function() {
    localStorage.setItem('battleCityControls', JSON.stringify(Controls.current));
};

Controls.getKey = function(action) {
    return Controls.current[action] || Controls.DEFAULT[action];
};

// Инициализация
Controls.init = function() {
    Controls.load();
};

// Вспомогательная функция для показа имени клавиши
Controls.getKeyName = function(code) {
    var names = {
        32: "Пробел", 37: "←", 38: "↑", 39: "→", 40: "↓",
        13: "Enter", 17: "Ctrl", 80: "P", 87: "W", 65: "A", 83: "S", 68: "D"
    };
    return names[code] || "Клавиша " + code;
};