import { addDependenciesToPackageJson, formatFiles, Tree } from '@nrwl/devkit';

import { normalizeSchema } from './normalize-schema';
import { SetupGeneratorSchema } from './schema';
import {
  addEntryComponent,
  addImplicitDeps,
  addRemoteToHost,
  changeBuildTarget,
  fixBootstrap,
  generateWebpackConfig,
  getRemotesWithPorts,
  SETUP_REACT_MFE_DEPENDENCIES,
  setupServeTarget,
  updateTsConfigTarget,
} from './utils';

export default async (tree: Tree, schema: Partial<SetupGeneratorSchema>) => {
  const setupReactMFE = normalizeSchema(tree, schema);

  const remotesWithPorts = getRemotesWithPorts(tree, setupReactMFE);
  addRemoteToHost(tree, setupReactMFE);

  generateWebpackConfig(tree, setupReactMFE, remotesWithPorts);

  addEntryComponent(tree, setupReactMFE);
  addImplicitDeps(tree, setupReactMFE);
  changeBuildTarget(tree, setupReactMFE);
  updateTsConfigTarget(tree, setupReactMFE);
  setupServeTarget(tree, setupReactMFE);

  fixBootstrap(tree, setupReactMFE);

  await formatFiles(tree);

  return addDependenciesToPackageJson(tree, SETUP_REACT_MFE_DEPENDENCIES, {});
};
