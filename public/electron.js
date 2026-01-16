const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const isDev = process.env.ELECTRON_IS_DEV === '1';
const path = require('path');
const fs = require('fs');

let mainWindow;

// Get the database path
function getDatabasePath() {
  const appData = app.getPath('userData');
  const toolmasterDir = path.join(appData, 'ToolMaster');

  // Create directory if it doesn't exist
  if (!fs.existsSync(toolmasterDir)) {
    fs.mkdirSync(toolmasterDir, { recursive: true });
  }

  return path.join(toolmasterDir, 'toolmaster.db');
}

// Create window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
    },
  });

  if (isDev) {
    // In development, load from Next.js dev server
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built Next.js app
    const indexPath = path.join(__dirname, '../app/.next/standalone/public/index.html');
    if (fs.existsSync(indexPath)) {
      mainWindow.loadFile(indexPath);
    } else {
      // Fallback to loading from app directory
      mainWindow.loadURL(`file://${path.join(__dirname, '../app/public/index.html')}`);
    }
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create application menu
function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About ToolMaster',
          click: () => {
            // You can open an about dialog here
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers for database operations
ipcMain.handle('get-app-path', () => {
  return app.getAppPath();
});

ipcMain.handle('get-database-path', () => {
  return getDatabasePath();
});

ipcMain.handle('app-version', () => {
  return app.getVersion();
});

// App event handlers
app.on('ready', () => {
  // Set environment variable for database path
  process.env.DATABASE_URL = `file:${getDatabasePath()}`;
  createWindow();
  createMenu();
});

app.on('window-all-closed', () => {
  // On macOS, applications stay active until the user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
