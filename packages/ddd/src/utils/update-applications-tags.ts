import {
  getProjects,
  ProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';

interface UpdateApplication {
  name: string;
  configuration: ProjectConfiguration;
}

export const updateApplicationsTags = (tree: Tree, tags: string[]): void => {
  const projects = getProjects(tree);
  const applications: UpdateApplication[] = [];
  projects.forEach((project, name) => {
    if (project.projectType === 'application') {
      applications.push({
        name,
        configuration: project,
      });
    }
  });
  applications.forEach(({ name, configuration }) => {
    const updatedTags = [...new Set([...configuration.tags, ...tags])];
    updateProjectConfiguration(tree, name, {
      ...configuration,
      tags: updatedTags,
    });
  });
};
