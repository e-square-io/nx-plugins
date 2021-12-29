import { joinPathFragments, logger, Tree } from '@nrwl/devkit';

import { SetupReactMFE } from './react-mfe';

export const fixBootstrap = (tree: Tree, { appRoot }: SetupReactMFE): void => {
  const bootstrapFilePath = joinPathFragments(appRoot, 'src/bootstrap.tsx');

  if (tree.exists(bootstrapFilePath)) {
    logger.warn(`bootstrap.tsx is already exists`);
    return;
  }

  const mainFilePath = joinPathFragments(appRoot, 'src/main.tsx');
  const bootstrapCode = tree.read(mainFilePath, 'utf-8');
  tree.write(bootstrapFilePath, bootstrapCode || '');

  tree.write(
    mainFilePath,
    `import('./bootstrap').catch(err => console.error(err));`
  );
};
