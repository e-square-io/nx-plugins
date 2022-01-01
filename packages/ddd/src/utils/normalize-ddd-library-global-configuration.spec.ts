import { UnitTestRunner as AngularUnitTestRunner } from '@nrwl/angular/src/utils/test-runners';
import {
  DDDLibraryFramework,
  DDDLibraryGlobalConfiguration,
  DEFAULT_DDD_LIBRARY_ANGULAR,
  DEFAULT_DDD_LIBRARY_REACT,
  DEFAULT_DOMAIN_TAG_NAME,
  DEFAULT_REMOVE_README,
  DEFAULT_SHARED_DOMAIN,
  ReactUnitTestRunner,
} from './ddd-library';
import { normalizeDDDLibraryGlobalConfiguration } from './normalize-ddd-library-global-configuration';

describe('normalizeDDDLibraryGlobalConfiguration', () => {
  it('should return default values on empty object', () => {
    expect(normalizeDDDLibraryGlobalConfiguration()).toEqual({
      sharedDomain: DEFAULT_SHARED_DOMAIN,
      domainTagName: DEFAULT_DOMAIN_TAG_NAME,
      removeReadme: DEFAULT_REMOVE_README,
      [DDDLibraryFramework.Angular]: {
        ...DEFAULT_DDD_LIBRARY_ANGULAR,
      },
      [DDDLibraryFramework.React]: {
        ...DEFAULT_DDD_LIBRARY_REACT,
      },
    });
  });

  it('should override default values if it was given', () => {
    const defaultValues: DDDLibraryGlobalConfiguration = {
      sharedDomain: 'myCustomShared',
      domainTagName: 'domain_da',
      removeReadme: true,
      [DDDLibraryFramework.Angular]: {
        prefix: 'myApp',
        flat: false,
        style: 'scss',
        changeDetection: 'OnPush',
        createStories: false,
        unitTestRunner: AngularUnitTestRunner.Jest,
      },
      [DDDLibraryFramework.React]: {
        flat: false,
        style: 'scss',
        pascalCaseFiles: true,
        pascalCaseDirectory: true,
        classComponent: true,
        createStories: true,
        unitTestRunner: ReactUnitTestRunner.Jest,
      },
    };
    expect(normalizeDDDLibraryGlobalConfiguration(defaultValues)).toEqual(
      defaultValues
    );
  });
});
