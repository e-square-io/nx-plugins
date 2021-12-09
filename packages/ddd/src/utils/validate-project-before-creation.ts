import { Tree } from '@nrwl/devkit';

import { isProjectAlreadyExists } from './is-project-already-exists';

export const validateProjectBeforeCreation = (
  tree: Tree,
  project: string
): void => {
  if (isProjectAlreadyExists(tree, project)) {
    throw new Error(`Project ${project} is already exists!`);
  }
};
