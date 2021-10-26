import { DDDLibraryType } from './ddd-library-type';

export interface DDD {
  libraryType: DDDLibraryType;
  domainName: string;
  directory: string;
  libraryName: string;
  withoutLibraryTypePrefix: boolean;
  prefix: string;
  flat: boolean;
  standaloneConfig: boolean;
}
