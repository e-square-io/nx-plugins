import { getProjects, Tree } from '@nrwl/devkit';

export const isProjectAlreadyExists = (
  tree: Tree,
  project: string
): boolean => {
  const projects = getProjects(tree);
  return projects.has(project);
};
