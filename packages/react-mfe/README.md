# @e-square/nx-react-mfe

![npm](https://img.shields.io/npm/v/@e-square/nx-react-mfe)
![GitHub](https://img.shields.io/github/license/e-square-io/nx-plugins)

Add Module Federation configuration to React application easily.

## Table of Contents

1. [Prerequisites](#prerequisites)
1. [Overview](#overview)
1. [Installation](#installation)
1. [Usage](#usage)
1. [API](#api)
1. [License](#license)

## Prerequisites

- [Nx workspace](https://nx.dev)

## Overview

This is Nx plugin which adds webpack module federation to react applications easily.

We have 2 module federation types:

1. Host - our shell application which consumes remote applications
2. Remote - regular application which has remote entry component that can be used in host applications

More about module federation concept: [Webpack Module Federation Concept](https://webpack.js.org/concepts/module-federation/)

## Installation

```shell
npm i -D @e-square/nx-react-mfe
```

## Usage

### Setup Host Application

```shell
nx g @e-square/nx-react-mfe:setup
```

### Setup Host Application With Existing Remote Applications

```shell
nx g @e-square/nx-react-mfe:setup --remotes <app-name-1>,<app-name-2>
```

### Setup Remote Application

```shell
nx g @e-square/nx-react-mfe:setup --host <app-name>
```

## API

### `@e-square/nx-react-mfe:setup`

| Argument | Alias | Type   | Default | Description                                                                      |
| -------- | ----- | ------ | ------- | -------------------------------------------------------------------------------- |
| appName  |       | string |         | The name of the application to generate the Module Federation configuration for  |
| mfeType  |       | string |         | Type of application to generate the Module Federation configuration for          |
| port     |       | string |         | The port at which the application should be served                               |
| remotes  |       | array  | []      | A list of remote application names that the host application should consume      |
| host     |       | string |         | The name of the host application that the remote application will be consumed by |

# License

[MIT](../../LICENSE)
