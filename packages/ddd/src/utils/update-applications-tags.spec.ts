import { applicationGenerator } from '@nrwl/angular/generators';
import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/workspace';

import { updateApplicationsTags } from './update-applications-tags';

describe('deleteReadmeFile', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should update applications tags', async () => {
    const libName = 'utils';

    await libraryGenerator(appTree, {
      name: libName,
    });

    const appName1 = 'web1';
    const appName2 = 'web2';

    await applicationGenerator(appTree, {
      name: appName1,
    });
    await applicationGenerator(appTree, {
      name: appName2,
    });

    const tags = ['type:app'];
    updateApplicationsTags(appTree, tags);

    const libTags = readProjectConfiguration(appTree, libName).tags;
    expect(libTags).toHaveLength(0);
    expect(libTags).toEqual([]);

    const app1Tags = readProjectConfiguration(appTree, appName1).tags;
    expect(app1Tags).toHaveLength(1);
    expect(app1Tags).toEqual(tags);

    const app2Tags = readProjectConfiguration(appTree, appName2).tags;
    expect(app2Tags).toHaveLength(1);
    expect(app2Tags).toEqual(tags);
  });

  it('should update applications tags without duplicates', async () => {
    const appName = 'web';

    await applicationGenerator(appTree, {
      name: appName,
    });

    const tags = ['type:app', 'another:tag'];
    updateApplicationsTags(appTree, tags);
    updateApplicationsTags(appTree, tags);
    updateApplicationsTags(appTree, tags);
    updateApplicationsTags(appTree, tags);
    updateApplicationsTags(appTree, tags);

    const appTags = readProjectConfiguration(appTree, appName).tags;
    expect(appTags).toHaveLength(2);
    expect(appTags).toEqual(tags);
  });
});
