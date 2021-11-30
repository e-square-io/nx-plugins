import { generateFiles, joinPathFragments, Tree } from '@nrwl/devkit';

import { getProjectSourceRoot } from '../../utils';

export const createLibraryDataAccessFiles = async (
  tree: Tree,
  project: string
): Promise<void> => {
  const sourceRoot = await getProjectSourceRoot(tree, project);
  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files/data-access'),
    joinPathFragments(sourceRoot, 'lib'),
    {
      tmpl: '',
    }
  );
};
