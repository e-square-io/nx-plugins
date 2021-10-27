# @e-square/nx-ddd

![npm](https://img.shields.io/npm/v/@e-square/nx-ddd)
![GitHub](https://img.shields.io/github/license/e-square-io/nx-plugins)

Enforces domain-driven design development.

Works with `Angular` and `React` libraries!

## Table of Contents

1. [Prerequisites](#prerequisites)
1. [Overview](#overview)
1. [Type of Libraries](#types-of-libraries)
1. [Installation](#installation)
1. [Basic Usage](#basic-usage)
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
```

If you are you going to use Angular libraries.

```shell
npm i -D @nrwl/angular
```

If you are you going to use React libraries.

```shell
npm i -D @nrwl/react
```

**NOTE**: If you are going to use storybook you need to create storybook configuration for the component stories, check out this [video](https://www.youtube.com/watch?v=sFpqyjT7u4s&ab_channel=Nrwl-NarwhalTechnologiesInc.).

## Basic Usage

### Init

Add ESLint rules for enforce-module-boundaries.

This generator need to be run only once.

```shell
nx g @e-square/nx-ddd:init
```

### Angular

Create an Angular ddd library.

```shell
nx g @e-square/nx-ddd:angular
```

Create an Angular ddd feature library example.

```shell
nx g @e-square/nx-ddd:angular --libraryType feature --domainName blog --libraryName posts
```

### React

Create a React ddd library.

```shell
nx g @e-square/nx-ddd:react
```

Create a React ddd feature library example.

```shell
nx g @e-square/nx-ddd:react --libraryType feature --domainName blog --libraryName posts
```

## API

### `@e-square/nx-ddd:angular`

| Argument                   | Type                                                          | Default       | Description                                                                                                                               |
| -------------------------- | ------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `libraryType`              | 'feature' &#124; 'ui' &#124; 'data-access' &#124; 'util'      | 'data-access' | The library type                                                                                                                          |
| `domainName`               | string                                                        | ''            | The domain name of the library                                                                                                            |
| `directory`                | string                                                        | ''            | A directory where the library is placed inside the domain directory                                                                       |
| `libraryName`              | string                                                        | ''            | The name of the library                                                                                                                   |
| `withoutLibraryTypePrefix` | boolean                                                       | false         | Create the library inside library type directory `<domainName>/<libraryType>-<libraryName>` to `<domainName>/<libraryType>/<libraryName>` |
| `prefix`                   | string                                                        | ''            | The prefix to apply to generated selectors                                                                                                |
| `style`                    | 'css' &#124; 'scss' &#124; 'sass' &#124; 'less' &#124; 'none' | 'scss'        | The file extension or preprocessor to use for style files, or 'none' to skip generating the style file                                    |
| `flat`                     | boolean                                                       | false         | Create new files at the top level of the current project                                                                                  |
| `standaloneConfig`         | boolean                                                       | false         | Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`                        |

### `@e-square/nx-ddd:react`

| Argument                   | Type                                                                                                                                  | Default       | Description                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `libraryType`              | 'feature' &#124; 'ui' &#124; 'data-access' &#124; 'util'                                                                              | 'data-access' | The library type                                                                                                                          |
| `domainName`               | string                                                                                                                                | ''            | The domain name of the library                                                                                                            |
| `directory`                | string                                                                                                                                | ''            | A directory where the library is placed inside the domain directory                                                                       |
| `libraryName`              | string                                                                                                                                | ''            | The name of the library                                                                                                                   |
| `withoutLibraryTypePrefix` | boolean                                                                                                                               | false         | Create the library inside library type directory `<domainName>/<libraryType>-<libraryName>` to `<domainName>/<libraryType>/<libraryName>` |
| `style`                    | 'css' &#124; 'scss' &#124; 'styl' &#124; 'less' &#124; 'styled-components' &#124; '@emotion/styled' &#124; 'styled-jsx' &#124; 'none' | 'scss'        | The file extension to be used for style files                                                                                             |
| `flat`                     | boolean                                                                                                                               | false         | Create new files at the top level of the current project                                                                                  |
| `pascalCaseFiles`          | boolean                                                                                                                               | false         | Use pascal case component file name (e.g. App.tsx)                                                                                        |
| `pascalCaseDirectory`      | boolean                                                                                                                               | false         | Use pascal case directory name (e.g. App/App.tsx)                                                                                         |
| `classComponent`           | boolean                                                                                                                               | false         | Use class components instead of functional component                                                                                      |
| `standaloneConfig`         | boolean                                                                                                                               | false         | Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`                        |

# License

[MIT](LICENSE)
