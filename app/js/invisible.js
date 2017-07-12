const ipc = require('electron').ipcRenderer
const BrowserWindow = require('electron').remote.BrowserWindow
const { exec, spawn } = require('child_process');

ipc.on('connect', function (event, fromWindowId) {
  const fromWindow = BrowserWindow.fromId(fromWindowId)
  // const result = exec("date", (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   fromWindow.webContents.send('connected', stdout)
  //   window.close()
  // })


})
