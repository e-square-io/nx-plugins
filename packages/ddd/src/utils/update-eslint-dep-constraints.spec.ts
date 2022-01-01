import { Tree, updateJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/workspace';

import {
  filterDepConstraintsDuplicates,
  getEslintFilePath,
  removeGlobalDepConstraints,
  updateEslintDepConstraints,
} from './update-eslint-dep-constraints';

describe('updateEslintDepConstraints', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should throw an error because of no eslint file at first', () => {
    const depConstraints = [
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared', 'scope:blog'],
      },
    ];
    expect(() => {
      return updateEslintDepConstraints(appTree, depConstraints);
    }).toThrowError();
  });

  it('should add depConstraints to eslint file', async () => {
    await libraryGenerator(appTree, {
      name: 'my-project',
    });
    const depConstraints = [
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared', 'scope:blog'],
      },
    ];
    updateEslintDepConstraints(appTree, depConstraints);
  });

  it('should throw an error if eslint file is not structured well', async () => {
    await libraryGenerator(appTree, {
      name: 'my-project',
    });
    const eslintPath = getEslintFilePath();
    updateJson(appTree, eslintPath, (eslintJson) => {
      eslintJson = {};
      return eslintJson;
    });
    const depConstraints = [
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared', 'scope:blog'],
      },
    ];
    expect(() => {
      return updateEslintDepConstraints(appTree, depConstraints);
    }).toThrowError();
  });
});

describe('getEslintFilePath', () => {
  it('should find eslint path without an error', () => {
    const eslintFilePath = getEslintFilePath();
    expect(eslintFilePath).toBeDefined();
  });
});

describe('filterDepConstraintsDuplicates', () => {
  it('should add depConstraints', () => {
    const depConstraints = [
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared', 'scope:blog'],
      },
    ];
    const ruleDepConstraints = [];
    const depConstraintsWithoutDuplicates = filterDepConstraintsDuplicates(
      depConstraints,
      ruleDepConstraints
    );
    expect(depConstraintsWithoutDuplicates).toHaveLength(1);
    expect(depConstraintsWithoutDuplicates).toEqual(depConstraints);
  });

  it('should not add depConstraints', () => {
    const depConstraints = [
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared', 'scope:blog'],
      },
    ];
    const ruleDepConstraints = [
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared', 'scope:blog'],
      },
    ];
    const depConstraintsWithoutDuplicates = filterDepConstraintsDuplicates(
      depConstraints,
      ruleDepConstraints
    );
    expect(depConstraintsWithoutDuplicates).toHaveLength(0);
    expect(depConstraintsWithoutDuplicates).toEqual([]);
  });
});

describe('removeGlobalDepConstraints', () => {
  it('should remove glob tags', () => {
    const depConstraints = [
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*'],
      },
    ];
    const depConstraintsWithoutGlob =
      removeGlobalDepConstraints(depConstraints);
    expect(depConstraintsWithoutGlob).toHaveLength(0);
    expect(depConstraintsWithoutGlob).toEqual([]);
  });

  it('should not remove mixed glob tags', () => {
    const depConstraints = [
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['scope:hi', '*'],
      },
    ];
    const depConstraintsWithoutGlob =
      removeGlobalDepConstraints(depConstraints);
    expect(depConstraintsWithoutGlob).toHaveLength(1);
    expect(depConstraintsWithoutGlob).toEqual(depConstraints);
  });

  it('should remove only glob tags', () => {
    const scopeDepConstraints = [
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared', 'scope:blog'],
      },
    ];
    const depConstraints = [
      ...scopeDepConstraints,
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*'],
      },
    ];
    const depConstraintsWithoutGlob =
      removeGlobalDepConstraints(depConstraints);
    expect(depConstraintsWithoutGlob).toHaveLength(1);
    expect(depConstraintsWithoutGlob).toEqual(scopeDepConstraints);
  });
});
