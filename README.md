<h1 align="center" style="border-bottom: none;">jlogviewer: JSON Log Viewer</h1>
JSON Log Viewer is a UI development tool for working with structured JSON logging.
<p></p>

![Alt text](image-4.png)
![Alt text](image-3.png)

The web application is provided by the [allproxy](https://github.com/allproxy/allproxy) package.
<p>

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

The `JLogViewer` is also supported by the `AllProxy` application which can be installed [here](https://github.com/allproxy/allproxy/releases/).

## Filtering

Show responses with status greater than or equal to 400:

![Alt text](image-2.png)

Show 403 responses:

![Alt text](image-8.png)

Show `wget` clients:

![Alt text](image-9.png)

Show responses that are greater than 1000 bytes:

![Alt text](image-5.png)

Sort by remote_ip in ascending order:

![Alt text](image-6.png)

Show non-GET requests:

![Alt text](image-7.png)

## License

This code is licensed under the [MIT License](https://opensource.org/licenses/MIT).

![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

