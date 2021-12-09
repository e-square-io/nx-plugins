import { libraryGenerator } from '@nrwl/angular/generators';
import { Tree } from '@nrwl/devkit';

import {
  createAngularComponent,
  createAngularComponentStories,
  DDDLibraryAngular,
  DDDLibraryStructure,
} from '../../utils';
import { createLibraryDataAccessFiles } from './create-library-data-access-files';

export const createAngularGenerations = async (
  tree: Tree,
  {
    dddLibraryStructure,
    dddLibraryAngular,
  }: {
    dddLibraryStructure: DDDLibraryStructure;
    dddLibraryAngular: DDDLibraryAngular;
  }
): Promise<void> => {
  const prefix = dddLibraryAngular.prefix || dddLibraryStructure.domain;

  const libraryGeneratorSchema = {
    name: dddLibraryStructure.name,
    directory: dddLibraryStructure.directory,
    standaloneConfig: dddLibraryStructure.standaloneConfig,
    flat: dddLibraryAngular.flat,
    prefix,
    routing: dddLibraryStructure.isFeature,
    lazy: dddLibraryStructure.isFeature,
    tags: dddLibraryStructure.tags,
    unitTestRunner: dddLibraryAngular.unitTestRunner,
  };
  await libraryGenerator(tree, libraryGeneratorSchema);

  if (dddLibraryStructure.isUI || dddLibraryStructure.isFeature) {
    await createAngularComponent(tree, {
      name: dddLibraryStructure.simpleName,
      project: dddLibraryStructure.project,
      style: dddLibraryAngular.style,
      export: dddLibraryStructure.isUI,
      flat: dddLibraryAngular.flat,
      prefix,
      changeDetection: dddLibraryAngular.changeDetection,
    });
  }

  if (dddLibraryStructure.isUI && dddLibraryAngular.createStories) {
    await createAngularComponentStories(tree, dddLibraryStructure.project);
  }

  if (dddLibraryStructure.isDataAccess) {
    await createLibraryDataAccessFiles(tree, dddLibraryStructure.project);
  }
};
