import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/workspace';

import { deleteReadmeFile } from './delete-readme-file';

describe('deleteReadmeFile', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should throw an error if the project does not exists', () => {
    expect(() => deleteReadmeFile(appTree, 'hello')).toThrowError();
  });

  it('should remove readme file', () => {
    const name = 'hello';

    libraryGenerator(appTree, {
      name,
    });

    const projectConfiguration = readProjectConfiguration(appTree, name);
    const readmeFilePath = `${projectConfiguration.root}/README.md`;
    expect(appTree.exists(readmeFilePath)).toBeTruthy();
    deleteReadmeFile(appTree, name);
    expect(appTree.exists(readmeFilePath)).toBeFalsy();
  });
});
