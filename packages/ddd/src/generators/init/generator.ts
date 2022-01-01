import { formatFiles, Tree } from '@nrwl/devkit';

import {
  DDD_PACKAGE_NAME,
  DDDLibraryGlobalConfigurationGenerators,
  DepConstraintTag,
  normalizeDDDLibraryGlobalConfiguration,
  updateApplicationsTags,
  updateEslintDepConstraints,
  updateWorkspaceConfigurationGenerators,
} from '../../utils';
import { DEFAULT_DEP_CONSTRAINTS } from './default-dep-constraints';
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

  updateEslintDepConstraints(tree, DEFAULT_DEP_CONSTRAINTS);

  updateApplicationsTags(tree, [DepConstraintTag.Application]);

  await formatFiles(tree);
};
