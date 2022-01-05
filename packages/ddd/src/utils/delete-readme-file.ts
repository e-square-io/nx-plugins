import { readProjectConfiguration, Tree } from '@nrwl/devkit';

const readmeFileNames = ['readme.md', 'README.md'];

export const deleteReadmeFile = (tree: Tree, project: string): void => {
  const projectConfiguration = readProjectConfiguration(tree, project);
  const readmeFilPaths = readmeFileNames.map(
    (readmeFileName) => `${projectConfiguration.root}/${readmeFileName}`
  );
  readmeFilPaths.forEach((readmeFilPath) => {
    if (!tree.exists(readmeFilPath)) {
      return;
    }
    tree.delete(readmeFilPath);
  });
};
