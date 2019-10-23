# *resv*
>A tool made of TypeScript that allows you to check the responsive design of each breakpoint at a glance. Start from the command line, monitor files and update automatically.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

### Tech
* [Node.js](https://github.com/nodejs/node)
* [TypeScript](https://github.com/microsoft/TypeScript)
* [reload](https://github.com/alallier/reload)
* [webpack](https://github.com/webpack/webpack)
* [Jest](https://github.com/facebook/jest)
* [node-sass](https://github.com/sass/node-sass)
* [Pug](https://github.com/pugjs/pug)
* [Commander.js](https://github.com/tj/commander.js/)

### Installation
```sh
npm install [-g] [--save-dev] resv
```

### Usage
**If index.html you want to display is in the current directory:**
```sh
resv
```
**If you want to specify the directory where index.html is located:**
```sh
resv [directory]
```
**or you can specify a URL:**
```sh
resv [url(e.g. http://localhost)]
```
**If you want to specify a directory to be monitored separately from the directory where index.html is located:**
```sh
resv -w [watch-directory]
```
**If you want to specify a port number(default: 8080):**
```sh
resv -p 80
```

### Options
|options|description|
|---|---|
| -w, ---watch-dir [directory] | The directory to watch. Defaults the serving directory |
| -p, --port [port] | The port to bind to. Defaults to 8080(default: "8080") |
| -h, --help | output usage information |
