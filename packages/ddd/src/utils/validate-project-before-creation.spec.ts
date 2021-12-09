import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/workspace';

import { validateProjectBeforeCreation } from './validate-project-before-creation';

describe('validateProjectBeforeCreation', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should not throw an error', () => {
    validateProjectBeforeCreation(appTree, 'my-project');
  });

  it('should throw an error', async () => {
    await libraryGenerator(appTree, {
      name: 'my-project',
    });
    expect(() => {
      return validateProjectBeforeCreation(appTree, 'my-project');
    }).toThrowError();
  });
});
