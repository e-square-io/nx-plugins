import { readWorkspaceConfiguration, Tree } from '@nrwl/devkit';

export const getWorkspaceConfigurationGenerator = <T>(
  tree: Tree,
  name: string
): T | null => {
  const workspaceConfiguration = readWorkspaceConfiguration(tree);
  return (
    ((workspaceConfiguration.generators &&
      workspaceConfiguration.generators[name]) as T) || null
  );
};
