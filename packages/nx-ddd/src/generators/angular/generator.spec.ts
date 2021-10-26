import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { DDDLibraryType } from '../../ddd';
import generator from './generator';
import { AngularGeneratorSchema } from './schema';

describe('angular generator', () => {
  let appTree: Tree;
  let options: AngularGeneratorSchema;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should create data-access library', async () => {
    options = {
      libraryType: DDDLibraryType.DataAccess,
      domainName: 'test',
      directory: '',
      libraryName: '',
      withoutLibraryTypePrefix: false,
      prefix: 'test-prefix',
      flat: false,
      standaloneConfig: false,
      style: 'scss',
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test-data-access');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:test', 'type:data-access']);
  });

  it('should create feature library', async () => {
    options = {
      libraryType: DDDLibraryType.Feature,
      domainName: 'blog',
      directory: 'auth',
      libraryName: 'home',
      withoutLibraryTypePrefix: false,
      prefix: 'myBlog',
      flat: true,
      standaloneConfig: true,
      style: 'scss',
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'blog-auth-feature-home');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:blog', 'type:feature']);
  });

  it('should create ui library', async () => {
    options = {
      libraryType: DDDLibraryType.UI,
      domainName: 'shared',
      directory: '',
      libraryName: 'button',
      withoutLibraryTypePrefix: true,
      prefix: 'shared',
      flat: true,
      standaloneConfig: true,
      style: 'scss',
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-ui-button');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:shared', 'type:ui']);
  });

  it('should create util library', async () => {
    options = {
      libraryType: DDDLibraryType.Util,
      domainName: 'shared',
      directory: '',
      libraryName: 'validators',
      withoutLibraryTypePrefix: false,
      prefix: 'shared',
      flat: true,
      standaloneConfig: false,
      style: 'scss',
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-util-validators');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:shared', 'type:util']);
  });
});
