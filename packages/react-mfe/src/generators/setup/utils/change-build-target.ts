import {
  logger,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { SetupReactMFE } from './react-mfe';

export const changeBuildTarget = (
  tree: Tree,
  { appName }: SetupReactMFE
): void => {
  const appConfig = readProjectConfiguration(tree, appName);

  if (!appConfig.targets?.build?.options) {
    throw new Error(
      `Not found build options from ${appName} project configuration`
    );
  }

  const appRoot = appConfig.root;

  appConfig.targets.build.options = {
    ...appConfig.targets.build.options,
    webpackConfig: `${appRoot}/webpack.config.js`,
  };

  if (!appConfig.targets?.build?.configurations?.production) {
    logger.warn(
      `Not found build configurations production from ${appName} project configuration, skipping setup webpack.prod.config.js`
    );
    return;
  }

  appConfig.targets.build.configurations.production = {
    ...appConfig.targets.build.configurations.production,
    webpackConfig: `${appRoot}/webpack.prod.config.js`,
  };

  updateProjectConfiguration(tree, appName, appConfig);
};
