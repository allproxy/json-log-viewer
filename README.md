<h1 align="center" style="border-bottom: none;">jlogviewer: JSON Log Viewer</h1>
JSON Log Viewer is a UI development tool for working with structured JSON logging.
<p></p>

![Alt text](image-3.png)
![Alt text](image-1.png)

It is designed to efficiently view JSON logs that are smaller than 10,000 records.  The ideal use case is to first filter a very large log to a smaller size that can be handled by `jlogviewer`.

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

## License

This code is licensed under the [MIT License](https://opensource.org/licenses/MIT).

![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

