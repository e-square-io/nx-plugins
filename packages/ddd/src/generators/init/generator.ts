import {
  formatFiles,
  joinPathFragments,
  readJsonFile,
  Tree,
} from '@nrwl/devkit';

import { DepConstraint, updateEslintDepConstraints } from '../../utils';

export default async (tree: Tree): Promise<void> => {
  const depConstraintsFilePath: string = joinPathFragments(
    __dirname,
    'data',
    'dep-constraints.json'
  );
  const depConstraints: DepConstraint[] = readJsonFile(depConstraintsFilePath);
  updateEslintDepConstraints(tree, depConstraints);
  await formatFiles(tree);
};
