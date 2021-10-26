import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { DDDLibraryType } from '../../ddd';
import generator from './generator';
import { ReactGeneratorSchema } from './schema';

describe('react generator', () => {
  let appTree: Tree;
  let options: ReactGeneratorSchema;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should create data-access library', async () => {
    options = {
      libraryType: DDDLibraryType.DataAccess,
      domainName: 'bubble-game',
      directory: '',
      libraryName: 'players',
      withoutLibraryTypePrefix: false,
      prefix: 'bubbleGame',
      flat: false,
      standaloneConfig: false,
      style: 'scss',
      pascalCaseFiles: false,
      pascalCaseDirectory: false,
      classComponent: false,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(
      appTree,
      'bubble-game-data-access-players'
    );
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:bubble-game', 'type:data-access']);
  });

  it('should create feature library', async () => {
    options = {
      libraryType: DDDLibraryType.Feature,
      domainName: 'blog',
      directory: '',
      libraryName: 'posts',
      withoutLibraryTypePrefix: false,
      prefix: 'blog',
      flat: true,
      standaloneConfig: true,
      style: 'scss',
      pascalCaseFiles: false,
      pascalCaseDirectory: false,
      classComponent: false,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'blog-feature-posts');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:blog', 'type:feature']);
  });

  it('should create ui library', async () => {
    options = {
      libraryType: DDDLibraryType.UI,
      domainName: 'shared',
      directory: '',
      libraryName: 'navbar',
      withoutLibraryTypePrefix: true,
      prefix: 'shared',
      flat: true,
      standaloneConfig: true,
      style: 'scss',
      pascalCaseFiles: false,
      pascalCaseDirectory: false,
      classComponent: false,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-ui-navbar');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:shared', 'type:ui']);
  });

  it('should create util library', async () => {
    options = {
      libraryType: DDDLibraryType.Util,
      domainName: 'flights',
      directory: 'airport',
      libraryName: 'helpers',
      withoutLibraryTypePrefix: false,
      prefix: 'flights',
      flat: true,
      standaloneConfig: false,
      style: 'scss',
      pascalCaseFiles: false,
      pascalCaseDirectory: false,
      classComponent: false,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(
      appTree,
      'flights-airport-util-helpers'
    );
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:flights', 'type:util']);
  });
});
