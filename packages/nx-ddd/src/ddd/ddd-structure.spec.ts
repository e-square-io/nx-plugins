import { DDDLibraryType } from './ddd-library-type';
import { DDDStructure } from './ddd-structure';

describe('dddStructure', () => {
  it('should be fail if domainName not provided', () => {
    expect(() => new DDDStructure({})).toThrow(Error);
    expect(
      () =>
        new DDDStructure({
          libraryName: 'test',
        })
    ).toThrow(Error);
  });

  it('should be valid data-access library', () => {
    const dddStructure = new DDDStructure({
      libraryType: DDDLibraryType.DataAccess,
      domainName: 'test',
      directory: '',
      libraryName: '',
      withoutLibraryTypePrefix: false,
      prefix: 'test-prefix',
      flat: false,
      standaloneConfig: false,
    });

    expect(dddStructure.libraryName).toBe('data-access');
    expect(dddStructure.libraryDirectory).toBe('test');
    expect(dddStructure.libraryPrefix).toBe('test-prefix');
    expect(dddStructure.projectName).toBe('test-data-access');
    expect(dddStructure.domainName).toBe('test');
    expect(dddStructure.libraryType).toBe(DDDLibraryType.DataAccess);
    expect(dddStructure.librarySimpleName).toBe('data-access');
    expect(dddStructure.flat).toBe(false);
    expect(dddStructure.standaloneConfig).toBe(false);
    expect(dddStructure.tags).toBe('scope:test,type:data-access');
    expect(dddStructure.depConstraints).toStrictEqual([
      {
        sourceTag: 'scope:test',
        onlyDependOnLibsWithTags: ['scope:test', 'scope:shared'],
      },
    ]);
    expect(dddStructure.isDataAccess).toBe(true);
    expect(dddStructure.isFeature).toBe(false);
    expect(dddStructure.isUI).toBe(false);
    expect(dddStructure.isUtil).toBe(false);
  });

  it('should be valid feature library', () => {
    const dddStructure = new DDDStructure({
      libraryType: DDDLibraryType.Feature,
      domainName: 'blog',
      directory: 'auth',
      libraryName: 'home',
      withoutLibraryTypePrefix: false,
      prefix: 'myBlog',
      flat: true,
      standaloneConfig: true,
    });

    expect(dddStructure.libraryName).toBe('feature-home');
    expect(dddStructure.libraryDirectory).toBe('blog/auth');
    expect(dddStructure.libraryPrefix).toBe('my-blog');
    expect(dddStructure.projectName).toBe('blog-auth-feature-home');
    expect(dddStructure.domainName).toBe('blog');
    expect(dddStructure.libraryType).toBe(DDDLibraryType.Feature);
    expect(dddStructure.librarySimpleName).toBe('home');
    expect(dddStructure.flat).toBe(true);
    expect(dddStructure.standaloneConfig).toBe(true);
    expect(dddStructure.tags).toBe('scope:blog,type:feature');
    expect(dddStructure.depConstraints).toStrictEqual([
      {
        sourceTag: 'scope:blog',
        onlyDependOnLibsWithTags: ['scope:blog', 'scope:shared'],
      },
    ]);
    expect(dddStructure.isDataAccess).toBe(false);
    expect(dddStructure.isFeature).toBe(true);
    expect(dddStructure.isUI).toBe(false);
    expect(dddStructure.isUtil).toBe(false);
  });

  it('should be valid ui library', () => {
    const dddStructure = new DDDStructure({
      libraryType: DDDLibraryType.UI,
      domainName: 'shared',
      directory: '',
      libraryName: 'button',
      withoutLibraryTypePrefix: true,
      flat: true,
      standaloneConfig: true,
    });

    expect(dddStructure.libraryName).toBe('button');
    expect(dddStructure.libraryDirectory).toBe('shared/ui');
    expect(dddStructure.libraryPrefix).toBe('shared');
    expect(dddStructure.projectName).toBe('shared-ui-button');
    expect(dddStructure.domainName).toBe('shared');
    expect(dddStructure.libraryType).toBe(DDDLibraryType.UI);
    expect(dddStructure.librarySimpleName).toBe('button');
    expect(dddStructure.flat).toBe(true);
    expect(dddStructure.standaloneConfig).toBe(true);
    expect(dddStructure.tags).toBe('scope:shared,type:ui');
    expect(dddStructure.depConstraints).toStrictEqual([]);
    expect(dddStructure.isDataAccess).toBe(false);
    expect(dddStructure.isFeature).toBe(false);
    expect(dddStructure.isUI).toBe(true);
    expect(dddStructure.isUtil).toBe(false);
  });

  it('should be valid util library', () => {
    const dddStructure = new DDDStructure({
      libraryType: DDDLibraryType.Util,
      domainName: 'shared',
      directory: '',
      libraryName: 'validators',
      withoutLibraryTypePrefix: false,
      flat: true,
      standaloneConfig: false,
    });

    expect(dddStructure.libraryName).toBe('util-validators');
    expect(dddStructure.libraryDirectory).toBe('shared');
    expect(dddStructure.libraryPrefix).toBe('shared');
    expect(dddStructure.projectName).toBe('shared-util-validators');
    expect(dddStructure.domainName).toBe('shared');
    expect(dddStructure.libraryType).toBe(DDDLibraryType.Util);
    expect(dddStructure.librarySimpleName).toBe('validators');
    expect(dddStructure.flat).toBe(true);
    expect(dddStructure.standaloneConfig).toBe(false);
    expect(dddStructure.tags).toBe('scope:shared,type:util');
    expect(dddStructure.depConstraints).toStrictEqual([]);
    expect(dddStructure.isDataAccess).toBe(false);
    expect(dddStructure.isFeature).toBe(false);
    expect(dddStructure.isUI).toBe(false);
    expect(dddStructure.isUtil).toBe(true);
  });
});
