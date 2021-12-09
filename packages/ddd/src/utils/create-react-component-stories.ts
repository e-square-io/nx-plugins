import { Tree } from '@nrwl/devkit';
import { storiesGenerator } from '@nrwl/react';

export const createReactComponentStories = async (
  tree: Tree,
  project: string
): Promise<void> => {
  await storiesGenerator(tree, {
    project,
    generateCypressSpecs: false,
  });
};
