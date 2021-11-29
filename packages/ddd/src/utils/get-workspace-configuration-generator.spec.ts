import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { getWorkspaceConfigurationGenerator } from './get-workspace-configuration-generator';
import { updateWorkspaceConfigurationGenerators } from './update-workspace-configuration-generators';

interface TestGenerator {
  library: {
    framework: string;
  };
}

describe('getWorkspaceConfigurationGenerator', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should be null if the generator not exits', () => {
    const workspaceConfigurationGenerator =
      getWorkspaceConfigurationGenerator<TestGenerator>(
        appTree,
        '@e-square/nx-ddd'
      );

    expect(workspaceConfigurationGenerator).toBeNull();
  });

  it('should return the generator options', () => {
    const generator: TestGenerator = {
      library: {
        framework: 'angular',
      },
    };

    updateWorkspaceConfigurationGenerators(appTree, {
      '@e-square/nx-ddd': {
        ...generator,
      },
    });

    const workspaceConfigurationGenerator =
      getWorkspaceConfigurationGenerator<TestGenerator>(
        appTree,
        '@e-square/nx-ddd'
      );

    expect(workspaceConfigurationGenerator).toEqual(generator);
  });
});
