import { Tree } from '@nrwl/devkit';
import { componentGenerator, SupportedStyles } from '@nrwl/react';

export interface createReactComponentOptions {
  name: string;
  project: string;
  style: SupportedStyles;
  export: boolean;
  pascalCaseFiles: boolean;
  pascalCaseDirectory: boolean;
  classComponent: boolean;
  flat: boolean;
}

export const createReactComponent = async (
  tree: Tree,
  options: createReactComponentOptions
): Promise<void> => {
  await componentGenerator(tree, options);
};
