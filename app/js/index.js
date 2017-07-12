'use strict';

const BrowserWindow = require('electron').remote.BrowserWindow
const ipcRenderer = require('electron').ipcRenderer
const path = require('path')
const tmp = require('tmp')
const fs = require('fs')
const { exec, spawn } = require('child_process');

function hide(element) {
    element.style.display = 'none'
}

function show(element) {
  element.style.display = ''
}

function append(element, text) {
  element.innerHTML = element.innerHTML + '<br>' + text
}

const credentialsForm = document.getElementById('credentials')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const connectButton = document.getElementById('connect')
const disconnectButton = document.getElementById('disconnect')
const details = document.getElementById('details')

var openvpn

credentialsForm.addEventListener('submit', function (e) {
  e.preventDefault()

  hide(credentialsForm)
  show(disconnectButton)

  var tmpobj = tmp.fileSync();

  fs.writeFileSync(tmpobj.fd, `${usernameInput.value}\n${passwordInput.value}`)

  console.log('starting openvpn')

  openvpn = spawn("openvpn", ["--config", "profile.ovpn", "--auth-user-pass", tmpobj.name])

  openvpn.stdout.on('data', (data) => {
    append(details, data)
  });

  openvpn.stderr.on('data', (data) => {
    append(details, data)
  });

  openvpn.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    hide(disconnectButton)
    show(credentialsForm)
  });
})

disconnectButton.addEventListener('click', function (e) {
  openvpn.kill('SIGINT')
})
