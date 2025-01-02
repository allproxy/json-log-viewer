import fs from 'fs';
import path from 'path';

const home = process.env.HOME ? process.env.HOME : process.env.USERPROFILE;
const dataDir = process.env.ALLPROXY_DATA_DIR;

const mkDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

const initDataDir = () => {
    mkDir(dataDir);
    mkDir(`${dataDir + path.sep}intercept`);
    mkDir(`${dataDir + path.sep}proto`);
    mkDir(`${dataDir + path.sep}bin`);
    mkDir(`${dataDir + path.sep}sessions`);
    mkDir(`${dataDir + path.sep}jsonFields`);
    mkDir(`${dataDir + path.sep}scripts`);
    mkDir(`${dataDir + path.sep}queries`);

    fetchApFileSystem();
};

function fetchApFileSystem() {
    const dataDirSep = `${dataDir + path.sep}`;
    const apFileSystemPath = 'docs' + path.sep + 'apFileSystem.json';
    const docsPluginsPath = 'docs' + path.sep + 'plugins';
    const nodeModulesPluginsPath = 'node_modules' + path.sep + 'allproxy' + path.sep + 'client' + path.sep + 'build' + path.sep + 'plugins';
    const json = JSON.parse(fs.readFileSync(apFileSystemPath));

    // jsonFields
    const fields = fs.readdirSync(dataDirSep + 'jsonFields');
    if (fields.length === 0) {
        console.log('Copying jsonFields');
        for (const field of json.jsonFields) {
            fs.writeFileSync(dataDirSep + 'jsonFields' + path.sep + field, field);
        }
        fs.writeFileSync(dataDirSep + 'briefJsonFields.json', json.briefJsonFields);
    }

    // scripts
    if (!fs.existsSync(dataDirSep + 'scripts' + path.sep + 'method')) {
        console.log('Setting parse method to ' + json.method);
        fs.writeFileSync(dataDirSep + 'scripts' + path.sep + 'method', json.method);
    }
    if (!fs.existsSync(dataDirSep + 'scripts' + path.sep + 'jsonLogScript')) {
        console.log('Copying jsonLogScript');
        fs.writeFileSync(dataDirSep + 'scripts' + path.sep + 'jsonLogScript', json.jsonLogScript);
    }

    // update the plugins in node_modules/allproxy...
    for (const pluginName of ["parsejson", "importjson"]) {
        console.log('Updating parsejson and importjson plugins');
        fs.copyFileSync(
            docsPluginsPath + path.sep + pluginName + path.sep + path.sep + 'plugin.js',
            nodeModulesPluginsPath + path.sep + pluginName + path.sep + 'plugin.js');
    }

    // Queries
    const queries = fs.readdirSync(dataDirSep + 'queries');
    if (queries.length === 0) {
        console.log('Copying queries');
        for (const dir in json.queries) {
            mkDir(dataDirSep + 'queries' + path.sep + dir);
            fs.writeFileSync(dataDirSep + 'queries' + path.sep + dir + path.sep + 'query.txt', json.queries[dir].query);
        }
    }

    let jsonQueries = [];
    if (fs.existsSync(dataDirSep + 'jsonQueries.json')) {
        jsonQueries = JSON.parse(fs.readFileSync(dataDirSep + 'jsonQueries.json'));
    }
    if (jsonQueries.length === 0) {
        console.log('Copying jsonQueries.json');
        fs.writeFileSync(dataDirSep + 'jsonQueries.json', json.jsonQueries);
    }

    let jsonSubQueries = [];
    if (fs.existsSync(dataDirSep + 'jsonSubQueries.json')) {
        jsonSubQueries = JSON.parse(fs.readFileSync(dataDirSep + 'jsonSubQueries.json'));
    }
    if (jsonSubQueries.length === 0) {
        console.log('Copying jsonSubQueries.json');
        fs.writeFileSync(dataDirSep + 'jsonSubQueries.json', json.jsonSubQueries);
    }
}

initDataDir();
