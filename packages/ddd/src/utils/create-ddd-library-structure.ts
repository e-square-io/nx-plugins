import { joinPathFragments, normalizePath } from '@nrwl/devkit';

import {
  DDDLibrary,
  DDDLibraryGlobalConfiguration,
  DDDLibraryType,
} from './ddd-library';
import { DepConstraint } from './update-eslint-dep-constraints';

export interface DDDLibraryStructure extends DDDLibrary {
  simpleName: string;
  project: string;
  tags: string;
  depConstraints: DepConstraint[];
  isDataAccess: boolean;
  isFeature: boolean;
  isUI: boolean;
  isUtil: boolean;
}

export const createDDDLibraryStructure = (
  dddLibrary: DDDLibrary,
  globalConfiguration: DDDLibraryGlobalConfiguration
): DDDLibraryStructure => {
  const { name, type, withoutTypePrefix, domain, directory } = dddLibrary;

  let updatedName: string;
  if (!name) {
    updatedName = type;
  } else if (name && withoutTypePrefix) {
    updatedName = name;
  } else {
    updatedName = `${type}-${name}`;
  }

  const libraryPaths: string[] = [domain];
  if (directory) {
    libraryPaths.push(directory);
  }
  if (withoutTypePrefix) {
    libraryPaths.push(type);
  }
  const updatedDirectory = normalizePath(joinPathFragments(...libraryPaths));

  const project = `${updatedDirectory.replace(/\//g, '-')}-${updatedName}`;

  return {
    ...dddLibrary,
    name: updatedName,
    simpleName: name || type,
    directory: updatedDirectory,
    project,
    tags: `${globalConfiguration.domainTagName}:${domain},type:${type}`,
    depConstraints: getDepConstraints(dddLibrary, globalConfiguration),
    isDataAccess: type === DDDLibraryType.DataAccess,
    isFeature: type === DDDLibraryType.Feature,
    isUI: type === DDDLibraryType.UI,
    isUtil: type === DDDLibraryType.Util,
  };
};

const getDepConstraints = (
  { domain }: DDDLibrary,
  { sharedDomain, domainTagName }: DDDLibraryGlobalConfiguration
): DepConstraint[] => {
  let onlyDependOnLibsWithTags: string[];
  if (domain === sharedDomain) {
    onlyDependOnLibsWithTags = [`${domainTagName}:${sharedDomain}`];
  } else {
    onlyDependOnLibsWithTags = [
      `${domainTagName}:${domain}`,
      `${domainTagName}:${sharedDomain}`,
    ];
  }
  return [
    {
      sourceTag: `${domainTagName}:${domain}`,
      onlyDependOnLibsWithTags,
    },
  ];
};
