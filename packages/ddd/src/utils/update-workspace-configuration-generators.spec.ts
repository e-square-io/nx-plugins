import { readWorkspaceConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { updateWorkspaceConfigurationGenerators } from './update-workspace-configuration-generators';

interface TestGenerators {
  '@e-square/nx-ddd': {
    library: {
      framework: string;
    };
  };
}

interface ExistingTestGenerators {
  '@nrwl/angular': {
    library: {
      flat: boolean;
    };
  };
}

describe('updateWorkspaceConfigurationGenerators', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it("should update the generators when it's empty", () => {
    const workspaceConfigurationBefore = readWorkspaceConfiguration(appTree);
    expect(workspaceConfigurationBefore.generators).toBeUndefined();

    const generators: TestGenerators = {
      '@e-square/nx-ddd': {
        library: {
          framework: 'angular',
        },
      },
    };
    updateWorkspaceConfigurationGenerators<TestGenerators>(appTree, generators);

    const workspaceConfigurationAfter = readWorkspaceConfiguration(appTree);
    expect(workspaceConfigurationAfter.generators).toEqual(generators);
  });

  it('should update the generators when it has already other generators', () => {
    const workspaceConfigurationBefore = readWorkspaceConfiguration(appTree);
    expect(workspaceConfigurationBefore.generators).toBeUndefined();

    const existingGenerators: ExistingTestGenerators = {
      '@nrwl/angular': {
        library: {
          flat: true,
        },
      },
    };
    updateWorkspaceConfigurationGenerators<ExistingTestGenerators>(
      appTree,
      existingGenerators
    );

    const generators: TestGenerators = {
      '@e-square/nx-ddd': {
        library: {
          framework: 'angular',
        },
      },
    };
    updateWorkspaceConfigurationGenerators<TestGenerators>(appTree, generators);

    const workspaceConfigurationAfter = readWorkspaceConfiguration(appTree);
    expect(workspaceConfigurationAfter.generators).toEqual({
      ...existingGenerators,
      ...generators,
    });
  });
});
