const execSync = require('child_process').execSync;
const commandExistsSync = require('command-exists').sync;

const arg = process.argv.length >= 3 ? process.argv[2] : '';

console.log(`Starting index.js`, arg)

if (!commandExistsSync('allproxy')) {
    run('npm install -g allproxy');
}

let apCommand = '';
if (process.platform === 'win32') {
    const dir = process.env.AppData + '\\npm\\node_modules\\allproxy';
    process.chdir(dir);
    if (arg === 'headless') {
        apCommand = 'npm run headless';
    } else {
        apCommand = 'npm start';
    }
} else {
    apCommand = `ALLPROXY_APP=logviewer allproxy ${arg}`;
}

run(apCommand);

function run(command) {
    console.log(command);
    execSync(command, { stdio: 'inherit' });
}




