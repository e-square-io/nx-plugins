import { Tree, updateJson } from '@nrwl/devkit';

export interface DepConstraint {
  sourceTag: string;
  onlyDependOnLibsWithTags: string[];
}

export const updateEslintDepConstraints = (
  tree: Tree,
  depConstraints: DepConstraint[]
): void => {
  const ruleName = '@nrwl/nx/enforce-module-boundaries';
  const eslintFilePath: string = getEslintFilePath(tree);
  updateJson(tree, eslintFilePath, (eslintJson) => {
    if (!eslintJson.overrides) {
      throw new Error(`Not found overrides property in ${eslintFilePath}`);
    }
    eslintJson.overrides.forEach((override) => {
      if (override && override.rules && override.rules[ruleName]) {
        const rule = override.rules[ruleName];
        const ruleInnerObj = rule[1];
        if (!ruleInnerObj) {
          throw new Error(`Found ${ruleName} but inner object doesn't exists`);
        }
        const depConstraintsWithoutGlob =
          removeGlobalDepConstraints(depConstraints);
        const depConstraintsWithoutDuplicates = filterDepConstraintsDuplicates(
          depConstraintsWithoutGlob,
          ruleInnerObj.depConstraints
        );
        ruleInnerObj.depConstraints = [
          ...ruleInnerObj.depConstraints,
          ...depConstraintsWithoutDuplicates,
        ];
      }
    });
    return eslintJson;
  });
};

export const getEslintFilePath = (tree: Tree): string => {
  const eslintFilePaths = ['.eslintrc', '.eslintrc.json'];
  const eslintFilePath = eslintFilePaths.find((eslintFilePath) => {
    return tree.exists(eslintFilePath);
  });
  if (!eslintFilePath) {
    throw new Error(`Couldn't find eslint file`);
  }
  return eslintFilePath;
};

export const filterDepConstraintsDuplicates = (
  depConstraints: DepConstraint[],
  ruleDepConstraints: DepConstraint[]
): DepConstraint[] => {
  return depConstraints.filter((depConstraint) => {
    return !ruleDepConstraints.find((ruleInnerObjDepConstraint) => {
      return (
        JSON.stringify(ruleInnerObjDepConstraint) ===
        JSON.stringify(depConstraint)
      );
    });
  });
};

export const removeGlobalDepConstraints = (
  depConstraints: DepConstraint[]
): DepConstraint[] => {
  const GLOB_TAG = '*';
  return depConstraints.filter((depConstraint) => {
    return !(
      depConstraint.sourceTag &&
      depConstraint.sourceTag === GLOB_TAG &&
      depConstraint.onlyDependOnLibsWithTags &&
      Array.isArray(depConstraint.onlyDependOnLibsWithTags) &&
      depConstraint.onlyDependOnLibsWithTags.length > 0 &&
      depConstraint.onlyDependOnLibsWithTags[0] === GLOB_TAG
    );
  });
};
