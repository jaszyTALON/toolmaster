const { contextBridge, ipcRenderer } = require('electron');

// Expose secure APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  getDatabasePath: () => ipcRenderer.invoke('get-database-path'),
  getVersion: () => ipcRenderer.invoke('app-version'),

  // Platform info
  platform: process.platform,
  arch: process.arch,

  // File operations (can be extended later for import/export)
  openExternal: (url) => {
    // Implement external link opening
  },
});
