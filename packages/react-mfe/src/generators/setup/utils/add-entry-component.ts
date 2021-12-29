import { generateFiles, joinPathFragments, Tree } from '@nrwl/devkit';

import { MFEType, SetupReactMFE } from './react-mfe';

export const addEntryComponent = (
  tree: Tree,
  { appName, mfeType, appRoot }: SetupReactMFE
): void => {
  if (mfeType !== MFEType.Remote) {
    return;
  }

  generateFiles(
    tree,
    joinPathFragments(__dirname, '../files/remote-entry'),
    `${appRoot}/src/app`,
    {
      tmpl: '',
      appName,
    }
  );
};
