import {
  DDDLibraryFramework,
  DDDLibraryGlobalConfiguration,
  DEFAULT_DDD_LIBRARY_ANGULAR,
  DEFAULT_DDD_LIBRARY_REACT,
  DEFAULT_DOMAIN_TAG_NAME,
  DEFAULT_SHARED_DOMAIN,
} from './ddd-library';

export const normalizeDDDLibraryGlobalConfiguration = (
  globalConfiguration: Partial<DDDLibraryGlobalConfiguration>
): DDDLibraryGlobalConfiguration => {
  return {
    sharedDomain: globalConfiguration.sharedDomain || DEFAULT_SHARED_DOMAIN,
    domainTagName: globalConfiguration.domainTagName || DEFAULT_DOMAIN_TAG_NAME,
    [DDDLibraryFramework.Angular]: {
      ...DEFAULT_DDD_LIBRARY_ANGULAR,
      ...globalConfiguration[DDDLibraryFramework.Angular],
    },
    [DDDLibraryFramework.React]: {
      ...DEFAULT_DDD_LIBRARY_REACT,
      ...globalConfiguration[DDDLibraryFramework.React],
    },
  };
};
