import { libraryGenerator } from '@nrwl/angular/generators';
import { formatFiles, Tree } from '@nrwl/devkit';

import { DDDStructure } from '../../ddd';
import {
  createAngularComponent,
  createAngularComponentStories,
  updateEslintDepConstraints,
  validateProjectBeforeCreation,
} from '../../utils';
import { createLibraryDataAccessFiles } from './create-library-data-access-files';
import { AngularGeneratorSchema } from './schema';

export default async (
  tree: Tree,
  schema: AngularGeneratorSchema
): Promise<void> => {
  const dddStructure = new DDDStructure(schema);

  validateProjectBeforeCreation(tree, dddStructure.projectName);

  const libraryGeneratorSchema = {
    name: dddStructure.libraryName,
    directory: dddStructure.libraryDirectory,
    standaloneConfig: dddStructure.standaloneConfig,
    flat: dddStructure.flat,
    prefix: dddStructure.libraryPrefix,
    routing: dddStructure.isFeature,
    lazy: dddStructure.isFeature,
    tags: dddStructure.tags,
  };

  await libraryGenerator(tree, libraryGeneratorSchema);

  await updateEslintDepConstraints(tree, dddStructure.depConstraints);

  if (dddStructure.isUI || dddStructure.isFeature) {
    await createAngularComponent(tree, {
      name: dddStructure.librarySimpleName,
      project: dddStructure.projectName,
      style: schema.style,
      export: dddStructure.isUI,
      flat: dddStructure.flat,
      prefix: dddStructure.libraryPrefix,
      changeDetection: schema.changeDetection,
    });
  }

  if (dddStructure.isUI) {
    await createAngularComponentStories(tree, dddStructure.projectName);
  }

  if (dddStructure.isDataAccess) {
    await createLibraryDataAccessFiles(tree, dddStructure.projectName);
  }

  await formatFiles(tree);
};
