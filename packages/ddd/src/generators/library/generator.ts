import { formatFiles, Tree } from '@nrwl/devkit';

import {
  createDDDLibraryStructure,
  DDD_PACKAGE_NAME,
  DDDLibraryFramework,
  DDDLibraryGlobalConfigurationGenerators,
  getWorkspaceConfigurationGenerator,
  normalizeDDDLibrary,
  normalizeDDDLibraryGlobalConfiguration,
  updateEslintDepConstraints,
  validateProjectBeforeCreation,
} from '../../utils';
import { createAngularGenerations } from './create-angular-generations';
import { createReactGenerations } from './create-react-generations';
import { LibraryGeneratorSchema } from './schema';

export default async (
  tree: Tree,
  options: LibraryGeneratorSchema
): Promise<void> => {
  const workspaceConfigurationGenerator = getWorkspaceConfigurationGenerator<
    DDDLibraryGlobalConfigurationGenerators[typeof DDD_PACKAGE_NAME]
  >(tree, DDD_PACKAGE_NAME);
  const globalConfiguration = normalizeDDDLibraryGlobalConfiguration(
    workspaceConfigurationGenerator?.library || {}
  );

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

  await updateEslintDepConstraints(tree, dddLibraryStructure.depConstraints);

  await formatFiles(tree);
};
