import { readProjectConfiguration, Tree } from '@nrwl/devkit';

import { SetupGeneratorSchema } from './schema';

import { MFEType, SetupReactMFE } from './utils';

export const normalizeSchema = (
  tree: Tree,
  schema: SetupGeneratorSchema
): SetupReactMFE => {
  const appName = schema.appName;
  if (!appName) {
    throw new Error('appName argument is required!');
  }

  const mfeType = schema.mfeType;
  if (!mfeType) {
    throw new Error('mfeType argument is required!');
  }

  if (!Object.values(MFEType).includes(mfeType)) {
    throw new Error('mfeType argument is invalid!');
  }

  const port = schema.port;
  if (!port) {
    throw new Error('port argument is required!');
  }

  const appRoot = readProjectConfiguration(tree, appName).root;

  return {
    appName,
    mfeType,
    host: schema.host ?? null,
    port: +port,
    remotes: schema.remotes ?? [],
    appRoot,
  };
};
