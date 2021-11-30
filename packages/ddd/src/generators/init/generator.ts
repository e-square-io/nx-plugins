import {
  formatFiles,
  joinPathFragments,
  readJsonFile,
  Tree,
} from '@nrwl/devkit';

import {
  DDDLibraryGlobalConfigurationGenerators,
  DepConstraint,
  normalizeDDDLibraryGlobalConfiguration,
  updateEslintDepConstraints,
  updateWorkspaceConfigurationGenerators,
} from '../../utils';

export default async (tree: Tree): Promise<void> => {
  updateWorkspaceConfigurationGenerators<DDDLibraryGlobalConfigurationGenerators>(
    tree,
    {
      '@e-square/nx-ddd': {
        library: {
          ...normalizeDDDLibraryGlobalConfiguration(),
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
