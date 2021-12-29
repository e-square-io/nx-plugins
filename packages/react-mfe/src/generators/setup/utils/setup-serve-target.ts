import {
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { MFEType, SetupReactMFE } from './react-mfe';

export const setupServeTarget = (
  tree: Tree,
  { appName, port, mfeType, remotes, host }: SetupReactMFE
): void => {
  const appConfig = readProjectConfiguration(tree, appName);

  appConfig.targets['serve'] = {
    ...appConfig.targets['serve'],
    options: {
      ...appConfig.targets['serve'].options,
      port: port ?? 4200,
      publicHost: `http://localhost:${port ?? 4200}`,
    },
  };

  if (mfeType === MFEType.Host) {
    const remoteServeCommands = remotes
      ? remotes.map((r) => `nx serve ${r}`)
      : undefined;
    const commands = remoteServeCommands
      ? [...remoteServeCommands, `nx serve ${appName}`]
      : [`nx serve ${appName}`];

    appConfig.targets['serve-mfe'] = {
      executor: '@nrwl/workspace:run-commands',
      options: {
        commands,
      },
    };
  }
  updateProjectConfiguration(tree, appName, appConfig);

  if (mfeType === MFEType.Remote && host) {
    const hostAppConfig = readProjectConfiguration(tree, host);

    hostAppConfig.targets['serve-mfe'] = {
      ...hostAppConfig.targets['serve-mfe'],
      options: {
        ...hostAppConfig.targets['serve-mfe'].options,
        commands: [
          `nx serve ${appName}`,
          ...hostAppConfig.targets['serve-mfe'].options.commands,
        ],
      },
    };

    updateProjectConfiguration(tree, host, hostAppConfig);
  }
};
