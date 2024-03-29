import { formatFiles, Tree } from '@nrwl/devkit';

import {
  createDDDLibraryStructure,
  DDD_PACKAGE_NAME,
  DDDLibraryFramework,
  DDDLibraryGlobalConfiguration,
  DDDLibraryGlobalConfigurationGenerators,
  DDDLibraryStructure,
  deleteReadmeFile,
  DepConstraintTag,
  getWorkspaceConfigurationGenerator,
  normalizeDDDLibrary,
  normalizeDDDLibraryGlobalConfiguration,
  updateApplicationsTags,
  updateEslintDepConstraints,
  validateProjectBeforeCreation,
} from '../../utils';
import { createAngularGenerations } from './create-angular-generations';
import { createLibraryDataAccessFiles } from './create-library-data-access-files';
import { createReactGenerations } from './create-react-generations';
import { LibraryGeneratorSchema } from './schema';

export const dddLibraryGenerator = async (
  tree: Tree,
  options: LibraryGeneratorSchema,
  globalOptions: Partial<DDDLibraryGlobalConfiguration> = {}
): Promise<DDDLibraryStructure> => {
  const workspaceConfigurationGenerator = getWorkspaceConfigurationGenerator<
    DDDLibraryGlobalConfigurationGenerators[typeof DDD_PACKAGE_NAME]
  >(tree, DDD_PACKAGE_NAME);
  const globalConfiguration = normalizeDDDLibraryGlobalConfiguration({
    ...(workspaceConfigurationGenerator?.library || {}),
    ...globalOptions,
  });

  const dddLibrary = normalizeDDDLibrary(options);
  const dddLibraryStructure = createDDDLibraryStructure(
    dddLibrary,
    globalConfiguration
  );

  validateProjectBeforeCreation(tree, dddLibraryStructure.project);

  switch (dddLibraryStructure.framework) {
    case DDDLibraryFramework.Angular:
      await createAngularGenerations(tree, {
        dddLibraryStructure,
        dddLibraryAngular: globalConfiguration[DDDLibraryFramework.Angular],
      });
      break;
    case DDDLibraryFramework.React:
      await createReactGenerations(tree, {
        dddLibraryStructure,
        dddLibraryReact: globalConfiguration[DDDLibraryFramework.React],
      });
      break;
    default:
      throw new Error(
        `${dddLibraryStructure.framework} framework is not supported!`
      );
  }

  if (dddLibraryStructure.isDataAccess) {
    await createLibraryDataAccessFiles(tree, dddLibraryStructure.project);
  }

  if (globalConfiguration.removeReadme) {
    deleteReadmeFile(tree, dddLibraryStructure.project);
  }

  await updateEslintDepConstraints(tree, dddLibraryStructure.depConstraints);

  updateApplicationsTags(tree, [DepConstraintTag.Application]);

  await formatFiles(tree);

  return {
    ...dddLibraryStructure,
  };
};

export default async (
  tree: Tree,
  options: LibraryGeneratorSchema
): Promise<void> => {
  await dddLibraryGenerator(tree, options);
};
