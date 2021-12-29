import { joinPathFragments, Tree } from '@nrwl/devkit';
import { SetupReactMFE } from './react-mfe';

export const fixBootstrap = (tree: Tree, { appRoot }: SetupReactMFE): void => {
  const mainFilePath = joinPathFragments(appRoot, 'src/main.tsx');
  const bootstrapCode = tree.read(mainFilePath, 'utf-8');
  tree.write(
    joinPathFragments(appRoot, 'src/bootstrap.tsx'),
    bootstrapCode || ''
  );

  tree.write(
    mainFilePath,
    `import('./bootstrap').catch(err => console.error(err));`
  );
};
