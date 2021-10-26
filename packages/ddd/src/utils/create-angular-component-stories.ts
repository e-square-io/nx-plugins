import { angularStoriesGenerator } from '@nrwl/angular/generators';
import { Tree } from '@nrwl/devkit';

export const createAngularComponentStories = async (
  tree: Tree,
  project: string
): Promise<void> => {
  await angularStoriesGenerator(tree, {
    name: project,
  });
};
