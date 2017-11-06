const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const http = require('http');

let mainWindow;
let server;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 300,
    minWidth: 300,
    minHeight: 200,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    skipTaskbar: true,
    backgroundColor: '#80151617',
    icon: `${__dirname}/app.ico`,
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL(`file://${path.join(__dirname, './dist/index.html')}`); // load the react app
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

// on MacOS leave process running also with no windows
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    server && server.close();
    app.quit();
  }
});

// if there are no windows create one
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

module.exports = mainWindow;
