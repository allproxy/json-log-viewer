const exec = require('child_process').exec;
const commandExistsSync = require('command-exists').sync;

const arg = process.argv.length >= 3 ? process.argv[2] : '';

console.log(`Starting index.js`, arg)

if (!commandExistsSync('allproxy')) {
    const installProcess = exec('npm install -g allproxy', (e) => {
        console.log(e);
    })
    installProcess.stdout.on('data', (data) => console.log(data));
    installProcess.stderr.on('data', (data) => console.log(data));
}

let apCommand = '';
if (process.platform === 'win32') {
    if (arg === 'headless') {
        console.log('Windows will not run headless')
        return;
    }
    const dir = process.env.AppData + '\\npm\\node_modules\\allproxy';
    process.chdir(dir);
    apCommand = 'npm start'; // headless is not supported for windows
} else {
    apCommand = `ALLPROXY_APP=logviewer allproxy ${arg}`;
}

console.log(apCommand);
const apProcess = exec(apCommand, (e) => {
    if (e) {
        console.log(e);
        return;
    }
})

apProcess.stdout.on('data', (data) => console.log(data));
apProcess.stderr.on('data', (data) => console.log(data));




