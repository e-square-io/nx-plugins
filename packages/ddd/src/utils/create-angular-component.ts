import { Tree } from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';

export interface createAngularComponentOptions {
  name: string;
  project: string;
  style: string;
  export: boolean;
  flat: boolean;
  prefix: string;
}

export const createAngularComponent = async (
  tree: Tree,
  options: createAngularComponentOptions
): Promise<void> => {
  const libraryGenerator = wrapAngularDevkitSchematic(
    '@nrwl/angular',
    'component'
  );
  await libraryGenerator(tree, {
    changeDetection: 'OnPush',
    ...options,
  });
};
