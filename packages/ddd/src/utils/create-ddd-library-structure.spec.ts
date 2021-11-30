import { createDDDLibraryStructure } from './create-ddd-library-structure';
import { DDDLibraryFramework, DDDLibraryType } from './ddd-library';
import { normalizeDDDLibraryGlobalConfiguration } from './normalize-ddd-library-global-configuration';

describe('createDDDLibraryStructure', () => {
  it('should be valid data-access library', () => {
    const dddLibraryStructure = createDDDLibraryStructure(
      {
        framework: DDDLibraryFramework.Angular,
        type: DDDLibraryType.DataAccess,
        name: '',
        domain: 'test',
        directory: '',
        withoutTypePrefix: false,
        standaloneConfig: false,
      },
      normalizeDDDLibraryGlobalConfiguration({})
    );

    expect(dddLibraryStructure.framework).toBe(DDDLibraryFramework.Angular);
    expect(dddLibraryStructure.type).toBe(DDDLibraryType.DataAccess);
    expect(dddLibraryStructure.name).toBe('data-access');
    expect(dddLibraryStructure.domain).toBe('test');
    expect(dddLibraryStructure.directory).toBe('test');
    expect(dddLibraryStructure.withoutTypePrefix).toBe(false);
    expect(dddLibraryStructure.standaloneConfig).toBe(false);
    expect(dddLibraryStructure.simpleName).toBe('data-access');
    expect(dddLibraryStructure.project).toBe('test-data-access');
    expect(dddLibraryStructure.tags).toBe('scope:test,type:data-access');
    expect(dddLibraryStructure.depConstraints).toStrictEqual([
      {
        sourceTag: 'scope:test',
        onlyDependOnLibsWithTags: ['scope:test', 'scope:shared'],
      },
    ]);
    expect(dddLibraryStructure.isDataAccess).toBe(true);
    expect(dddLibraryStructure.isFeature).toBe(false);
    expect(dddLibraryStructure.isUI).toBe(false);
    expect(dddLibraryStructure.isUtil).toBe(false);
  });

  it('should be valid feature library', () => {
    const dddLibraryStructure = createDDDLibraryStructure(
      {
        framework: DDDLibraryFramework.Angular,
        type: DDDLibraryType.Feature,
        name: 'home',
        domain: 'blog',
        directory: 'auth',
        withoutTypePrefix: false,
        standaloneConfig: true,
      },
      normalizeDDDLibraryGlobalConfiguration({})
    );

    expect(dddLibraryStructure.framework).toBe(DDDLibraryFramework.Angular);
    expect(dddLibraryStructure.type).toBe(DDDLibraryType.Feature);
    expect(dddLibraryStructure.name).toBe('feature-home');
    expect(dddLibraryStructure.domain).toBe('blog');
    expect(dddLibraryStructure.directory).toBe('blog/auth');
    expect(dddLibraryStructure.withoutTypePrefix).toBe(false);
    expect(dddLibraryStructure.standaloneConfig).toBe(true);
    expect(dddLibraryStructure.simpleName).toBe('home');
    expect(dddLibraryStructure.project).toBe('blog-auth-feature-home');
    expect(dddLibraryStructure.tags).toBe('scope:blog,type:feature');
    expect(dddLibraryStructure.depConstraints).toStrictEqual([
      {
        sourceTag: 'scope:blog',
        onlyDependOnLibsWithTags: ['scope:blog', 'scope:shared'],
      },
    ]);
    expect(dddLibraryStructure.isDataAccess).toBe(false);
    expect(dddLibraryStructure.isFeature).toBe(true);
    expect(dddLibraryStructure.isUI).toBe(false);
    expect(dddLibraryStructure.isUtil).toBe(false);
  });

  it('should be valid ui library', () => {
    const dddLibraryStructure = createDDDLibraryStructure(
      {
        framework: DDDLibraryFramework.Angular,
        type: DDDLibraryType.UI,
        name: 'button',
        domain: 'shared',
        directory: '',
        withoutTypePrefix: true,
        standaloneConfig: true,
      },
      normalizeDDDLibraryGlobalConfiguration({})
    );

    expect(dddLibraryStructure.framework).toBe(DDDLibraryFramework.Angular);
    expect(dddLibraryStructure.type).toBe(DDDLibraryType.UI);
    expect(dddLibraryStructure.name).toBe('button');
    expect(dddLibraryStructure.domain).toBe('shared');
    expect(dddLibraryStructure.directory).toBe('shared/ui');
    expect(dddLibraryStructure.withoutTypePrefix).toBe(true);
    expect(dddLibraryStructure.standaloneConfig).toBe(true);
    expect(dddLibraryStructure.simpleName).toBe('button');
    expect(dddLibraryStructure.project).toBe('shared-ui-button');
    expect(dddLibraryStructure.tags).toBe('scope:shared,type:ui');
    expect(dddLibraryStructure.depConstraints).toStrictEqual([
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared'],
      },
    ]);
    expect(dddLibraryStructure.isDataAccess).toBe(false);
    expect(dddLibraryStructure.isFeature).toBe(false);
    expect(dddLibraryStructure.isUI).toBe(true);
    expect(dddLibraryStructure.isUtil).toBe(false);
  });

  it('should be valid util library', () => {
    const dddLibraryStructure = createDDDLibraryStructure(
      {
        framework: DDDLibraryFramework.Angular,
        type: DDDLibraryType.Util,
        name: 'validators',
        domain: 'shared',
        directory: '',
        withoutTypePrefix: false,
        standaloneConfig: false,
      },
      normalizeDDDLibraryGlobalConfiguration({})
    );

    expect(dddLibraryStructure.framework).toBe(DDDLibraryFramework.Angular);
    expect(dddLibraryStructure.type).toBe(DDDLibraryType.Util);
    expect(dddLibraryStructure.name).toBe('util-validators');
    expect(dddLibraryStructure.domain).toBe('shared');
    expect(dddLibraryStructure.directory).toBe('shared');
    expect(dddLibraryStructure.withoutTypePrefix).toBe(false);
    expect(dddLibraryStructure.standaloneConfig).toBe(false);
    expect(dddLibraryStructure.simpleName).toBe('validators');
    expect(dddLibraryStructure.project).toBe('shared-util-validators');
    expect(dddLibraryStructure.tags).toBe('scope:shared,type:util');
    expect(dddLibraryStructure.depConstraints).toStrictEqual([
      {
        sourceTag: 'scope:shared',
        onlyDependOnLibsWithTags: ['scope:shared'],
      },
    ]);
    expect(dddLibraryStructure.isDataAccess).toBe(false);
    expect(dddLibraryStructure.isFeature).toBe(false);
    expect(dddLibraryStructure.isUI).toBe(false);
    expect(dddLibraryStructure.isUtil).toBe(true);
  });
});
