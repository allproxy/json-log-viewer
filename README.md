<h1 align="center" style="border-bottom: none;">jlogviewer: JSON Log Viewer</h1>
JSON Log Viewer is a UI development tool that makes JSON logs human readable.
<p></p>
JSON fields can be automatically or manually annotated.  Filtering makes it easy to find relevant log records.
<p></p>
Source Code: [github.com/allproxy/jlogviewer](https://github.com/allproxy/jlogviewer)
<p></p>

![Alt text](image-4.png)
![Alt text](image-3.png)

The web application is provided by the [allproxy](https://github.com/allproxy/allproxy) package.
<p></p>

![image](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white)
![image](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![image](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)

## Install

**Install allproxy package**
```sh
$ npm install -g allproxy
```

**Install jlogviewer package**
```sh
$ npm install -g jlogviewer
```

To update the `allproxy` and `jlogviewer` packages re-run the `npm install -g xxx` command.

## Run in Browser
**Mac/Linux**
```sh
$ jlogviewer
```

**Windows**
```sh
$ jlogviewer_win.bat
```

**Open in browser:**
[localhost:8888/jlogviewer](http://localhost:8888/jlogviewer)

## Install AllProxy Application

The `JLogViewer` is integrated into the `AllProxy` application which can be installed [here](https://github.com/allproxy/allproxy/releases/).

## Filtering

Advanced JSON field and boolean filters can be used to find relevant log records.

Example filters:
* Filter `response:>400` shows responses with status greater than or equal to 400
* Filter `response:403` shows 403 responses
* Filter `agent:wget` shows `wget` clients
* Filter `bytes:>1000` shows responses that are greater than 1000 bytes
* Filter `remote_ip:*` can be used to sort remote IP addresses in ascending order
* Filter `-request:GET` shows non-GET requests

## License

This code is licensed under the [MIT License](https://opensource.org/licenses/MIT).

![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

