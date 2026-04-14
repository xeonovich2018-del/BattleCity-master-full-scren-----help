// src/ControlsMenu.js
// Меню настройки клавиш

var ControlsMenu = {};

ControlsMenu.show = function() {
    if (document.getElementById('controls-menu')) return;

    var menu = document.createElement('div');
    menu.id = 'controls-menu';
    menu.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.95); color: #ff0; padding: 30px; border: 5px solid #ff0;
        font-family: monospace; font-size: 18px; text-align: center; z-index: 10000;
        min-width: 420px; border-radius: 8px;
    `;

    menu.innerHTML = `
        <h2 style="margin: 0 0 20px 0; color:#ff0;">НАСТРОЙКА УПРАВЛЕНИЯ</h2>
        <p style="margin-bottom: 20px;">Кликни по действию и нажми новую клавишу</p>
        <div id="menu-list" style="text-align:left; display:inline-block;"></div>
        <div style="margin-top:25px;">
            <button id="reset-btn" style="padding:8px 16px; margin:5px;">Сбросить на стандартные</button>
            <button id="close-btn" style="padding:8px 16px; margin:5px;">Закрыть (P)</button>
        </div>
    `;

    document.body.appendChild(menu);

    var list = document.getElementById('menu-list');

    function addRow(label, action) {
        var currentKey = Controls.getKey(action);
        var row = document.createElement('div');
        row.style.cssText = 'margin:12px 0; cursor:pointer; padding:6px;';
        row.innerHTML = `<strong>${label}:</strong> <span style="background:#222; padding:6px 14px;">${Controls.getKeyName(currentKey)}</span>`;
        
        row.onclick = function() {
            var span = row.querySelector('span');
            span.textContent = 'Нажми клавишу...';
            
            var temp = function(e) {
                Controls.current[action] = e.which;
                Controls.save();
                span.textContent = Controls.getKeyName(e.which);
                document.removeEventListener('keydown', temp);
            };
            document.addEventListener('keydown', temp);
        };
        list.appendChild(row);
    }

    addRow('Вверх',    'up');
    addRow('Вниз',     'down');
    addRow('Влево',    'left');
    addRow('Вправо',   'right');
    addRow('Выстрел',  'fire');

    document.getElementById('reset-btn').onclick = function() {
        Object.assign(Controls.current, Controls.DEFAULT);
        Controls.save();
        menu.remove();
        ControlsMenu.show();
    };

    document.getElementById('close-btn').onclick = function() {
        menu.remove();
    };
};

// Глобальная функция для вызова из TankController
ControlsMenu.getKey = function(action) {
    return Controls.getKey(action);
};