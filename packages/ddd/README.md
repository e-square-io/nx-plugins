# @e-square/nx-ddd

![npm](https://img.shields.io/npm/v/@e-square/nx-ddd)
![GitHub](https://img.shields.io/github/license/e-square-io/nx-plugins)

Enforces domain-driven design development.

✅ Support [Angular](https://angular.io) and [React](https://reactjs.org)

## Table of Contents

1. [Prerequisites](#prerequisites)
1. [Overview](#overview)
1. [Type of Libraries](#types-of-libraries)
1. [Installation](#installation)
1. [Usage](#usage)
1. [API](#api)
1. [License](#license)

## Prerequisites

- [Nx workspace](https://nx.dev)

## Overview

Applications grow in size and complexity and in a large organization there are many ways to reuse code to maintain consistency and to lower the development effort.

Developing in a modular way can be done using libraries, which are simply a collection of related files that perform a certain task. These are composed together to make up an application.

Libraries require classifiers to describe their contents and intended purpose. These classifiers help to organize the libraries and to provide a way to locate them.

### Scope

Scope relates to a logical grouping, business use-case, or domain contain libraries that manage a sub-domain of application logic.

### Type

Type relates to the contents of the library and indicates its purpose and usage. Examples of types are `data-access`, `feature`, `ui`, and `util`.

## Types of Libraries

### Feature Libraries

Developers should consider feature libraries as libraries that implement smart UI (with access to data sources) for specific business use cases or pages in an application.

### UI Libraries

A UI library contains only presentational components (also called "dumb" components).

### Data-Access Libraries

A data-access library contains code for interacting with a back-end system. It also includes all the code related to state management.

- `+state` - for state files
- `application` - for facades
- `entities` - for interfaces, enums
- `infrastructure` - for services

### Utility Libraries

A utility library contains low-level utilities used by many libraries and applications.

## Installation

```shell
npm i -D @e-square/nx-ddd

nx g @e-square/nx-ddd:init
```

OR

```shell
ng add @e-square/nx-ddd
```

## Usage

### Create a DDD Library

```shell
nx g @e-square/nx-ddd:library
```

Create an Angular ddd feature library example.

```shell
nx g @e-square/nx-ddd:library posts --framework angular --type feature --domain blog
```

Create a React ddd feature library example.

```shell
nx g @e-square/nx-ddd:library posts --framework react --type feature --domain blog
```

## API

### `@e-square/nx-ddd:init`

| Argument      | Alias | Type   | Default  | Description         |
| ------------- | ----- | ------ | -------- | ------------------- |
| sharedDomain  |       | string | 'shared' | The shared domain   |
| domainTagName |       | string | 'scope'  | The domain tag name |

### `@e-square/nx-ddd:library`

| Argument            | Alias | Type                                                     | Default       | Description                                                                                                                               |
| ------------------- | ----- | -------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `framework`         | `f`   | 'angular' &#124; 'react'                                 | ''            | The framework to be used for library generation                                                                                           |
| `type`              | `t`   | 'feature' &#124; 'ui' &#124; 'data-access' &#124; 'util' | 'data-access' | The library type                                                                                                                          |
| `name`              |       | string                                                   | ''            | The name of the library                                                                                                                   |
| `domain`            | `d`   | string                                                   | ''            | The domain the library belongs to                                                                                                         |
| `directory`         |       | string                                                   | ''            | A directory where the library is placed inside the domain directory                                                                       |
| `withoutTypePrefix` |       | boolean                                                  | false         | Create the library inside library type directory `<domainName>/<libraryType>-<libraryName>` to `<domainName>/<libraryType>/<libraryName>` |
| `standaloneConfig`  |       | boolean                                                  | false         | Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`                        |

# License

[MIT](../../LICENSE)
