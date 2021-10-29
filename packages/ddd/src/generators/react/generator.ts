import { formatFiles, Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { libraryGenerator } from '@nrwl/react';

import { DDDStructure } from '../../ddd';
import {
  createReactComponent,
  createReactComponentStories,
  updateEslintDepConstraints,
  validateProjectBeforeCreation,
} from '../../utils';
import { ReactGeneratorSchema } from './schema';

export default async (
  tree: Tree,
  schema: ReactGeneratorSchema
): Promise<void> => {
  const dddStructure = new DDDStructure(schema);

  validateProjectBeforeCreation(tree, dddStructure.projectName);

  const libraryGeneratorSchema = {
    name: dddStructure.libraryName,
    directory: dddStructure.libraryDirectory,
    style: schema.style,
    skipTsConfig: false,
    skipFormat: false,
    tags: dddStructure.tags,
    pascalCaseFiles: schema.pascalCaseFiles,
    routing: dddStructure.isFeature,
    unitTestRunner: 'jest' as const,
    linter: Linter.EsLint,
    standaloneConfig: dddStructure.standaloneConfig,
  };

  await libraryGenerator(tree, libraryGeneratorSchema);

  await updateEslintDepConstraints(tree, dddStructure.depConstraints);

  if (dddStructure.isUI || dddStructure.isFeature) {
    await createReactComponent(tree, {
      name: dddStructure.librarySimpleName,
      project: dddStructure.projectName,
      style: schema.style,
      export: dddStructure.isUI,
      pascalCaseFiles: schema.pascalCaseFiles,
      pascalCaseDirectory: schema.pascalCaseDirectory,
      classComponent: schema.classComponent,
      flat: dddStructure.flat,
    });
  }

  if (dddStructure.isUI) {
    await createReactComponentStories(tree, dddStructure.projectName);
  }

  await formatFiles(tree);
};
