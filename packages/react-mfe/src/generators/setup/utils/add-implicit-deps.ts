import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { MFEType, SetupReactMFE } from './react-mfe';

export const addImplicitDeps = (
  tree: Tree,
  { mfeType, remotes, appName }: SetupReactMFE
): void => {
  if (
    mfeType === MFEType.Host &&
    Array.isArray(remotes) &&
    remotes.length > 0
  ) {
    const appConfig = readProjectConfiguration(tree, appName);
    appConfig.implicitDependencies = Array.isArray(
      appConfig.implicitDependencies
    )
      ? [...appConfig.implicitDependencies, ...remotes]
      : [...remotes];
    updateProjectConfiguration(tree, appName, appConfig);
  }
};
