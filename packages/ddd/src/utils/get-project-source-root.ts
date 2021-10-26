import { readProjectConfiguration, Tree } from '@nrwl/devkit';

export const getProjectSourceRoot = async (
  tree: Tree,
  project: string
): Promise<string> => {
  const { sourceRoot } = await readProjectConfiguration(tree, project);
  return sourceRoot;
};
