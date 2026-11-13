const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('index.html');
}

autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Available',
        message: 'A new update is available. It is downloading in the background.'
    });
});

autoUpdater.on('update-downloaded', async () => {
    const result = await dialog.showMessageBox({
        type: 'info',
        title: 'Update Ready',
        message: 'The update is ready. Restart the app to install it.',
        buttons: ['Restart Now', 'Later']
    });

    if (result.response === 0) {
        autoUpdater.quitAndInstall();
    }
});

autoUpdater.on('error', (error) => {
    console.log('Update error:', error);
});

app.whenReady().then(() => {
    createWindow();

    if (app.isPackaged) {
        autoUpdater.checkForUpdates();
    }
});