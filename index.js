'use strict';

// index.js (main process)
// - GUI (renderer process)

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow;

let menuTemplate = [{
    label: 'Hello Electron',
    submenu: [
        { label: 'About' },
        { type: 'separator' },
        { label: 'Settings' },
        { type: 'separator' },
        { label: 'Quit' }
    ]
}];

let menu = Menu.buildFromTemplate(menuTemplate);

function createMainWindow() {
    Menu.setApplicationMenu(menu);
    // create window
    mainWindow = new BrowserWindow({ width: 600, height: 400 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // TODO For debug
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', function () {
    createMainWindow();
});

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});