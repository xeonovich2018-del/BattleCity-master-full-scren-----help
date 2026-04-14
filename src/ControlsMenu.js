// src/ControlsMenu.js
const ControlsMenu = {
    bindings: {
        up:    'ArrowUp',
        down:  'ArrowDown',
        left:  'ArrowLeft',
        right: 'ArrowRight',
        fire:  'Space',
        pause: 'KeyP'
    },

    show: function() {
        const mainMenu = document.getElementById('menu');
        if (mainMenu) mainMenu.style.display = 'none';

        const div = document.createElement('div');
        div.id = 'controls-menu';
        div.style.cssText = `
            position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
            background:rgba(0,0,0,0.95); border:6px solid #ffff00; padding:40px 80px;
            color:#fff; font-family:Courier New,monospace; font-size:26px; z-index:9999;
            min-width:500px; text-align:left;
        `;

        let html = `<h2 style="color:#ffff00;text-align:center;margin-bottom:30px;">CONTROLS</h2>`;

        Object.keys(this.bindings).forEach(action => {
            const name = action.charAt(0).toUpperCase() + action.slice(1);
            html += `
                <div style="margin:15px 0;cursor:pointer;" onclick="ControlsMenu.startBind('${action}')">
                    ${name.padEnd(8)} : <span id="bind-${action}" style="color:#00ff00;">${this.bindings[action]}</span>
                </div>`;
        });

        html += `<br><div style="text-align:center;margin-top:40px;color:#ff5555;cursor:pointer;" onclick="ControlsMenu.close()">← BACK</div>`;

        div.innerHTML = html;
        document.body.appendChild(div);
    },

    startBind: function(key) {
        this.currentBinding = key;
        const span = document.getElementById(`bind-${key}`);
        if (span) span.innerHTML = '[PRESS ANY KEY]';
    },

    handleKey: function(e) {
        if (!this.currentBinding) return;
        if (e.code === 'Escape') {
            this.currentBinding = null;
            return;
        }
        this.bindings[this.currentBinding] = e.code;
        this.currentBinding = null;
        this.refresh();
    },

    refresh: function() {
        const old = document.getElementById('controls-menu');
        if (old) old.remove();
        this.show();
    },

    close: function() {
        const menu = document.getElementById('controls-menu');
        if (menu) menu.remove();
        const mainMenu = document.getElementById('menu');
        if (mainMenu) mainMenu.style.display = 'block';
    },

    getKey: function(action) {
        return this.bindings[action];
    }
};

window.ControlsMenu = ControlsMenu;

document.addEventListener('keydown', e => {
    if (document.getElementById('controls-menu')) {
        ControlsMenu.handleKey(e);
    }
});