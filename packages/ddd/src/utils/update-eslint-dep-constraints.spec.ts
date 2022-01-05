import { Tree, updateJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/workspace';

import {
  filterDepConstraintsDuplicates,
  getEslintFilePath,
  moveGlobalDepConstraintsToTheEnd,
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
    const eslintPath = getEslintFilePath(appTree);
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
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should throw an error if eslint not exists', () => {
    expect(() => getEslintFilePath(appTree)).toThrowError();
  });

  it('should find eslint path without an error', async () => {
    await libraryGenerator(appTree, {
      name: 'my-project',
    });
    expect(getEslintFilePath(appTree)).toBeDefined();
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

describe('moveGlobalDepConstraintsToTheEnd', () => {
  it('should glob tags stay the same', () => {
    const depConstraints = [
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*'],
      },
    ];
    const depConstraintsUpdated =
      moveGlobalDepConstraintsToTheEnd(depConstraints);
    expect(depConstraintsUpdated).toHaveLength(1);
    expect(depConstraintsUpdated).toEqual(depConstraints);
  });

  it('should not move mixed glob tags', () => {
    const depConstraints = [
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['scope:hi', '*'],
      },
    ];
    const depConstraintsUpdated =
      moveGlobalDepConstraintsToTheEnd(depConstraints);
    expect(depConstraintsUpdated).toHaveLength(1);
    expect(depConstraintsUpdated).toEqual(depConstraints);
  });

  it('should move glob tags from the middle to the end', () => {
    const scopeDepConstraints = [
      {
        sourceTag: 'scope:lol',
        onlyDependOnLibsWithTags: ['scope:lol'],
      },
    ];
    const depConstraints = [
      ...scopeDepConstraints,
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*'],
      },
      ...scopeDepConstraints,
    ];
    const updatedDepConstraints =
      moveGlobalDepConstraintsToTheEnd(depConstraints);
    expect(updatedDepConstraints).toHaveLength(2);
    expect(updatedDepConstraints).toEqual([
      ...scopeDepConstraints,
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*'],
      },
    ]);
  });

  it('should move glob tags to the end', () => {
    const scopeDepConstraints = [
      {
        sourceTag: 'scope:blog',
        onlyDependOnLibsWithTags: ['scope:blog', 'scope:shared'],
      },
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared'],
      },
    ];
    const depConstraints = [
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*'],
      },
      ...scopeDepConstraints,
    ];
    const updatedDepConstraints =
      moveGlobalDepConstraintsToTheEnd(depConstraints);
    expect(updatedDepConstraints).toHaveLength(2);
    expect(updatedDepConstraints).toEqual([
      ...scopeDepConstraints,
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*'],
      },
    ]);
  });
});
