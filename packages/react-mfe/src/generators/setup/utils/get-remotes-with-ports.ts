import { readProjectConfiguration, Tree } from '@nrwl/devkit';

import { MFEType, RemotePorts, SetupReactMFE } from './react-mfe';

export const getRemotesWithPorts = (
  tree: Tree,
  { mfeType, remotes }: SetupReactMFE
) => {
  const remotesWithPort: RemotePorts[] = [];
  if (
    mfeType === MFEType.Host &&
    Array.isArray(remotes) &&
    remotes.length > 0
  ) {
    for (const remote of remotes) {
      const remoteConfig = readProjectConfiguration(tree, remote);
      remotesWithPort.push({
        remoteName: remote,
        port: remoteConfig?.targets['mfe-serve']?.options?.port ?? 4200,
      });
    }
  }

  return remotesWithPort;
};
