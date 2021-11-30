import { DDDLibraryFramework, DDDLibraryType } from './ddd-library';
import { normalizeDDDLibrary } from './normalize-ddd-library';

describe('normalizeDDDLibrary', () => {
  it('should throw an error when framework property not provided', () => {
    expect(() => normalizeDDDLibrary({})).toThrowError();
  });

  it('should throw an error when domain property not provided', () => {
    expect(() =>
      normalizeDDDLibrary({
        framework: DDDLibraryFramework.Angular,
      })
    ).toThrowError();
  });

  it('should throw an error when type property not provided', () => {
    expect(() =>
      normalizeDDDLibrary({
        framework: DDDLibraryFramework.Angular,
        domain: 'blog',
      })
    ).toThrowError();
  });

  it(`should not throw an error when framework and domain properties provided`, () => {
    expect(
      normalizeDDDLibrary({
        framework: DDDLibraryFramework.Angular,
        domain: 'blog',
        type: DDDLibraryType.UI,
      })
    ).toBeTruthy();
  });

  it('should return default values', () => {
    expect(
      normalizeDDDLibrary({
        framework: DDDLibraryFramework.Angular,
        domain: 'myBlog',
        type: DDDLibraryType.UI,
      })
    ).toEqual({
      framework: DDDLibraryFramework.Angular,
      type: DDDLibraryType.UI,
      name: '',
      domain: 'my-blog',
      directory: '',
      withoutTypePrefix: false,
      standaloneConfig: false,
    });
  });

  it('should normalize values correctly', () => {
    expect(
      normalizeDDDLibrary({
        framework: DDDLibraryFramework.React,
        type: DDDLibraryType.UI,
        name: 'specialButton',
        domain: 'myApp',
        directory: 'insideIn/someAwesome/directory_ah',
        withoutTypePrefix: true,
        standaloneConfig: true,
      })
    ).toEqual({
      framework: DDDLibraryFramework.React,
      type: DDDLibraryType.UI,
      name: 'special-button',
      domain: 'my-app',
      directory: 'inside-in/some-awesome/directory-ah',
      withoutTypePrefix: true,
      standaloneConfig: true,
    });
  });
});
