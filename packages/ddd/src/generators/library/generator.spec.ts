import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { DDDLibraryFramework, DDDLibraryType } from '../../utils';
import generator, { dddLibraryGenerator } from './generator';
import { LibraryGeneratorSchema } from './schema';

describe('library generator', () => {
  let appTree: Tree;
  let options: LibraryGeneratorSchema;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should create angular data-access library', async () => {
    options = {
      framework: DDDLibraryFramework.Angular,
      type: DDDLibraryType.DataAccess,
      name: '',
      domain: 'test',
      directory: '',
      withoutTypePrefix: false,
      standaloneConfig: false,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test-data-access');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:test', 'type:data-access']);
  });

  it('should create angular feature library', async () => {
    options = {
      framework: DDDLibraryFramework.Angular,
      type: DDDLibraryType.Feature,
      name: 'home',
      domain: 'blog',
      directory: 'auth',
      withoutTypePrefix: false,
      standaloneConfig: true,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'blog-auth-feature-home');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:blog', 'type:feature']);
  });

  it('should create angular ui library', async () => {
    options = {
      framework: DDDLibraryFramework.Angular,
      type: DDDLibraryType.UI,
      name: 'button',
      domain: 'shared',
      directory: '',
      withoutTypePrefix: true,
      standaloneConfig: true,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-ui-button');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:shared', 'type:ui']);
  });

  it('should create angular util library', async () => {
    options = {
      framework: DDDLibraryFramework.Angular,
      type: DDDLibraryType.Util,
      name: 'validators',
      domain: 'shared',
      directory: '',
      withoutTypePrefix: false,
      standaloneConfig: false,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-util-validators');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:shared', 'type:util']);
  });

  it('should create react data-access library', async () => {
    options = {
      framework: DDDLibraryFramework.React,
      type: DDDLibraryType.DataAccess,
      name: '',
      domain: 'test',
      directory: '',
      withoutTypePrefix: false,
      standaloneConfig: false,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test-data-access');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:test', 'type:data-access']);
  });

  it('should create react feature library', async () => {
    options = {
      framework: DDDLibraryFramework.React,
      type: DDDLibraryType.Feature,
      name: 'home',
      domain: 'blog',
      directory: 'auth',
      withoutTypePrefix: false,
      standaloneConfig: true,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'blog-auth-feature-home');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:blog', 'type:feature']);
  });

  it('should create react ui library', async () => {
    options = {
      framework: DDDLibraryFramework.React,
      type: DDDLibraryType.UI,
      name: 'button',
      domain: 'shared',
      directory: '',
      withoutTypePrefix: true,
      standaloneConfig: true,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-ui-button');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:shared', 'type:ui']);
  });

  it('should create react util library', async () => {
    options = {
      framework: DDDLibraryFramework.React,
      type: DDDLibraryType.Util,
      name: 'validators',
      domain: 'shared',
      directory: '',
      withoutTypePrefix: false,
      standaloneConfig: false,
    };
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-util-validators');
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:shared', 'type:util']);
  });

  it('should return DDDLibraryStructure', async () => {
    options = {
      framework: DDDLibraryFramework.Angular,
      type: DDDLibraryType.Feature,
      name: 'check-the-structure',
      domain: 'shared',
      directory: '',
      withoutTypePrefix: false,
      standaloneConfig: false,
    };
    const dddLibraryStructure = await dddLibraryGenerator(appTree, options);
    expect(dddLibraryStructure).toBeDefined();
    expect(dddLibraryStructure.simpleName).toBeDefined();
    expect(dddLibraryStructure.project).toBeDefined();
    expect(dddLibraryStructure.tags).toBeDefined();
    expect(dddLibraryStructure.depConstraints).toBeDefined();
    expect(dddLibraryStructure.isDataAccess).toBeDefined();
    expect(dddLibraryStructure.isFeature).toBeDefined();
    expect(dddLibraryStructure.isUI).toBeDefined();
    expect(dddLibraryStructure.isUtil).toBeDefined();
    const config = readProjectConfiguration(
      appTree,
      dddLibraryStructure.project
    );
    expect(config).toBeDefined();
  });
});
