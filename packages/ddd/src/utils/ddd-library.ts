import { SupportedStyles } from '@nrwl/react';

import { DDD_PACKAGE_NAME } from './ddd-pacakge-name';

export enum DDDLibraryFramework {
  Angular = 'angular',
  React = 'react',
}

export enum DDDLibraryType {
  DataAccess = 'data-access',
  Feature = 'feature',
  UI = 'ui',
  Util = 'util',
}

export interface DDDLibrary {
  framework: DDDLibraryFramework;
  type: DDDLibraryType;
  name: string;
  domain: string;
  directory: string;
  withoutTypePrefix: boolean;
  standaloneConfig: boolean;
}

export interface DDDLibraryAngular {
  prefix: string;
  flat: boolean;
  style: string;
  changeDetection: string;
  createStories: boolean;
}

export interface DDDLibraryReact {
  flat: boolean;
  style: SupportedStyles;
  pascalCaseFiles: boolean;
  pascalCaseDirectory: boolean;
  classComponent: boolean;
  createStories: boolean;
}

export interface DDDLibraryGlobalConfiguration {
  sharedDomain: string;
  domainTagName: string;
  [DDDLibraryFramework.Angular]: DDDLibraryAngular;
  [DDDLibraryFramework.React]: DDDLibraryReact;
}

export interface DDDLibraryGlobalConfigurationGenerators {
  [DDD_PACKAGE_NAME]: {
    library: DDDLibraryGlobalConfiguration;
  };
}

export const DEFAULT_DDD_LIBRARY: Pick<
  DDDLibrary,
  'name' | 'directory' | 'withoutTypePrefix' | 'standaloneConfig'
> = {
  name: '',
  directory: '',
  withoutTypePrefix: false,
  standaloneConfig: false,
};

export const DEFAULT_SHARED_DOMAIN = 'shared';
export const DEFAULT_DOMAIN_TAG_NAME = 'scope';

export const DEFAULT_DDD_LIBRARY_ANGULAR: DDDLibraryAngular = {
  prefix: '',
  flat: true,
  style: 'css',
  changeDetection: 'OnPush',
  createStories: false,
};

export const DEFAULT_DDD_LIBRARY_REACT: DDDLibraryReact = {
  flat: true,
  style: 'css',
  pascalCaseFiles: false,
  pascalCaseDirectory: false,
  classComponent: false,
  createStories: false,
};
