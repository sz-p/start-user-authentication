# node-express-starter
A starter template for express application

## scripts

|Name|Description|
|:---:|:---:|
|start|start this application|
|startDev|use this script during development|
|build|build this application|

## Features
|Name|Description|
|:---:|:---:|
|httpsConfig|edit configs/app.config.js to start https|
|auto reboot|restart app after modifying file|
|response format|format response data|
|build|use webpack to get bundle file|

## Package
|Name|Description|
|:---:|:---:|
|nodemon|Simple monitor script for use during development of a node.js app|

## Project Structure
The full folder structure of this app is explained below:

|Name|Description|
|:---:|:---:|
|.npmrc|use cnpmjs to accelerate download node_modules|
|.babelrc|babel`s config|
|.gitignore|git`s ignore config|
|.editorconfig|editor`s config ide use this file to format your code|
|nodemon.json|nodemon`s config|
|src|Contains your source code that will be compiled to the dist dir|
|src/routers/|app`s router|
|src/server.js|app`s main file start server|
|src/responseformat.js|response`s export file format your response|
|configs|Contains your config files|
|configs/app.config.js|this app`s config like host port|
|scripts|some scripts used in package.json|
