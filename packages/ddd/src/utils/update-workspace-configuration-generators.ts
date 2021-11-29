import {
  readWorkspaceConfiguration,
  Tree,
  updateWorkspaceConfiguration,
} from '@nrwl/devkit';

export const updateWorkspaceConfigurationGenerators = <T>(
  tree: Tree,
  generators: T
): void => {
  const workspaceConfiguration = readWorkspaceConfiguration(tree);
  updateWorkspaceConfiguration(tree, {
    ...workspaceConfiguration,
    generators: {
      ...workspaceConfiguration.generators,
      ...generators,
    },
  });
};
