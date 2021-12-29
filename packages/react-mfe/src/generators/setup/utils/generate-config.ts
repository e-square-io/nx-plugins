import {
  generateFiles,
  joinPathFragments,
  logger,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';

import {
  RemotePorts,
  SetupReactMFE,
  SHARED_SINGLETON_LIBRARIES,
} from './react-mfe';

export const generateWebpackConfig = (
  tree: Tree,
  { appRoot, appName, mfeType }: SetupReactMFE,
  remotesWithPorts: RemotePorts[]
): void => {
  if (
    tree.exists(`${appRoot}/webpack.config.js`) ||
    tree.exists(`${appRoot}/webpack.prod.config.js`)
  ) {
    logger.warn(
      `NOTE: We encountered an existing webpack config for the app ${appName}. We have overwritten this file with the Module Federation Config.\n
      If this was not the outcome you expected, you can discard the changes we have made, create a backup of your current webpack config, and run the command again.`
    );
  }

  generateFiles(
    tree,
    joinPathFragments(__dirname, '../files/webpack'),
    appRoot,
    {
      tmpl: '',
      type: mfeType,
      name: appName,
      remotes: remotesWithPorts ?? [],
      sourceRoot: appRoot,
      sharedLibraries: SHARED_SINGLETON_LIBRARIES,
      offsetFromRoot: offsetFromRoot(appRoot),
    }
  );
};
