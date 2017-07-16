'use strict';

// index.js (main process)
// - GUI (renderer process)

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

let mainWindow;
let settingsWindow;

let menuTemplate = [{
    label: 'Hello Electron',
    submenu: [
        { label: 'About', accelerator: 'CmdOrCtrl+Shift+A', click: function () { showAboutDialog(); } },
        { type: 'separator' },
        { label: 'Settings', accelerator: 'CmdOrCtrl+,', click: function () { showSettingWindow(); } },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function () { app.quit(); } }
    ]
}];

let menu = Menu.buildFromTemplate(menuTemplate);

ipcMain.on('settings_changed', function (event, color) {
    mainWindow.webContents.send('set_bgcolor', color);
});

function createMainWindow() {
    Menu.setApplicationMenu(menu);
    // create window
    mainWindow = new BrowserWindow({ width: 600, height: 400 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // For debug
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function showSettingWindow() {
    settingsWindow = new BrowserWindow({ width: 600, height: 400 });
    settingsWindow.loadURL('file://' + __dirname + '/settings.html')

    // For debug
    // settingsWindow.webContents.openDevTools();

    settingsWindow.show();
    settingsWindow.on('closed', function () {
        settingsWindow = null;
    })
}

function showAboutDialog() {
    dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        message: 'About This App',
        detail: 'This app was created by @su-kun1899'
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