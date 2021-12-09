import { Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { libraryGenerator } from '@nrwl/react';

import {
  createReactComponent,
  createReactComponentStories,
  DDDLibraryReact,
  DDDLibraryStructure,
} from '../../utils';

export const createReactGenerations = async (
  tree: Tree,
  {
    dddLibraryStructure,
    dddLibraryReact,
  }: {
    dddLibraryStructure: DDDLibraryStructure;
    dddLibraryReact: DDDLibraryReact;
  }
): Promise<void> => {
  const libraryGeneratorSchema = {
    name: dddLibraryStructure.name,
    directory: dddLibraryStructure.directory,
    style: dddLibraryReact.style,
    skipTsConfig: false,
    skipFormat: false,
    tags: dddLibraryStructure.tags,
    pascalCaseFiles: dddLibraryReact.pascalCaseFiles,
    routing: dddLibraryStructure.isFeature,
    unitTestRunner: dddLibraryReact.unitTestRunner,
    linter: Linter.EsLint,
    standaloneConfig: dddLibraryStructure.standaloneConfig,
  };

  await libraryGenerator(tree, libraryGeneratorSchema);

  if (dddLibraryStructure.isUI || dddLibraryStructure.isFeature) {
    await createReactComponent(tree, {
      name: dddLibraryStructure.simpleName,
      project: dddLibraryStructure.project,
      style: dddLibraryReact.style,
      export: dddLibraryStructure.isUI,
      pascalCaseFiles: dddLibraryReact.pascalCaseFiles,
      pascalCaseDirectory: dddLibraryReact.pascalCaseDirectory,
      classComponent: dddLibraryReact.classComponent,
      flat: dddLibraryReact.flat,
    });
  }

  if (dddLibraryStructure.isUI && dddLibraryReact.createStories) {
    await createReactComponentStories(tree, dddLibraryStructure.project);
  }
};
