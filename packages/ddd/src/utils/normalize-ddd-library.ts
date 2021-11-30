import { names } from '@nrwl/devkit';

import {
  DDDLibrary,
  DDDLibraryFramework,
  DDDLibraryType,
  DEFAULT_DDD_LIBRARY,
} from './ddd-library';

export const normalizeDDDLibrary = (
  dddLibrary: Partial<DDDLibrary>
): DDDLibrary => {
  if (!dddLibrary.framework) {
    throw new Error('framework property is required!');
  }
  const frameworks = Object.values(DDDLibraryFramework);
  if (!frameworks.includes(dddLibrary.framework)) {
    throw new Error(
      `framework property value must to be one of those values: ${frameworks.join(
        ', '
      )}`
    );
  }
  if (!dddLibrary.type) {
    throw new Error('type property is required!');
  }
  const types = Object.values(DDDLibraryType);
  if (!types.includes(dddLibrary.type)) {
    throw new Error(
      `type property value must to be one of those values: ${types.join(', ')}`
    );
  }
  if (!dddLibrary.domain) {
    throw new Error('domain property is required!');
  }
  return {
    framework: dddLibrary.framework,
    type: dddLibrary.type,
    name: names(dddLibrary.name || DEFAULT_DDD_LIBRARY.name).fileName,
    domain: names(dddLibrary.domain).fileName,
    directory: names(dddLibrary.directory || DEFAULT_DDD_LIBRARY.directory)
      .fileName,
    withoutTypePrefix:
      dddLibrary.withoutTypePrefix ?? DEFAULT_DDD_LIBRARY.withoutTypePrefix,
    standaloneConfig:
      dddLibrary.standaloneConfig ?? DEFAULT_DDD_LIBRARY.standaloneConfig,
  };
};
