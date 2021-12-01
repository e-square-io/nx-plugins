import {
  formatFiles,
  joinPathFragments,
  readJsonFile,
  Tree,
} from '@nrwl/devkit';

import {
  DDD_PACKAGE_NAME,
  DDDLibraryGlobalConfigurationGenerators,
  DepConstraint,
  normalizeDDDLibraryGlobalConfiguration,
  updateEslintDepConstraints,
  updateWorkspaceConfigurationGenerators,
} from '../../utils';
import { InitGeneratorSchema } from './schema';

export default async (
  tree: Tree,
  options: InitGeneratorSchema
): Promise<void> => {
  updateWorkspaceConfigurationGenerators<DDDLibraryGlobalConfigurationGenerators>(
    tree,
    {
      [DDD_PACKAGE_NAME]: {
        library: {
          ...normalizeDDDLibraryGlobalConfiguration(options),
        },
      },
    }
  );

  const depConstraintsFilePath: string = joinPathFragments(
    __dirname,
    'data',
    'dep-constraints.json'
  );
  const depConstraints: DepConstraint[] = readJsonFile(depConstraintsFilePath);
  updateEslintDepConstraints(tree, depConstraints);

  await formatFiles(tree);
};
