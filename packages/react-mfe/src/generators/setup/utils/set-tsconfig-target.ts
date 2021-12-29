import { joinPathFragments, Tree, updateJson } from '@nrwl/devkit';
import { SetupReactMFE } from './react-mfe';

export const updateTsConfigTarget = (
  tree: Tree,
  { appRoot }: SetupReactMFE
): void => {
  updateJson(tree, joinPathFragments(appRoot, `tsconfig.app.json`), (json) => ({
    ...json,
    compilerOptions: {
      ...json.compilerOptions,
      target: 'ES2020',
    },
  }));
};
