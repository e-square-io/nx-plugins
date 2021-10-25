import { strings } from '@angular-devkit/core';
import { joinPathFragments, normalizePath } from '@nrwl/devkit';

import { DepConstraint } from '../utils';
import { DDD } from './ddd';
import { DDDLibraryType } from './ddd-library-type';

export class DDDStructure {
  private readonly DOMAIN_SHARED = 'shared';
  private ddd: DDD;

  constructor(ddd: Partial<DDD>) {
    this.setDDD(ddd);
  }

  private _libraryName: string;

  get libraryName(): string {
    return this._libraryName;
  }

  private _libraryDirectory: string;

  get libraryDirectory(): string {
    return this._libraryDirectory;
  }

  private _libraryPrefix: string;

  get libraryPrefix(): string {
    return this._libraryPrefix;
  }

  private _projectName: string;

  get projectName(): string {
    return this._projectName;
  }

  get domainName(): string {
    return this.ddd.domainName;
  }

  get libraryType(): DDDLibraryType {
    return this.ddd.libraryType;
  }

  get librarySimpleName(): string {
    return this.ddd.libraryName || this.libraryType;
  }

  get flat(): boolean {
    return this.ddd.flat;
  }

  get standaloneConfig(): boolean {
    return this.ddd.standaloneConfig;
  }

  get tags(): string {
    return `scope:${this.domainName},type:${this.libraryType}`;
  }

  get depConstraints(): DepConstraint[] {
    const domainName = this.domainName;
    if (domainName === this.DOMAIN_SHARED) {
      return [];
    }
    return [
      {
        sourceTag: `scope:${domainName}`,
        onlyDependOnLibsWithTags: [
          `scope:${domainName}`,
          `scope:${this.DOMAIN_SHARED}`,
        ],
      },
    ];
  }

  get isDataAccess(): boolean {
    return this.libraryType === DDDLibraryType.DataAccess;
  }

  get isFeature(): boolean {
    return this.libraryType === DDDLibraryType.Feature;
  }

  get isUI(): boolean {
    return this.libraryType === DDDLibraryType.UI;
  }

  get isUtil(): boolean {
    return this.libraryType === DDDLibraryType.Util;
  }

  setDDD(ddd: Partial<DDD>) {
    if (!ddd.domainName) {
      throw new Error('domainName property is required!');
    }
    this.ddd = {
      libraryType: ddd.libraryType || DDDLibraryType.DataAccess,
      domainName: strings.dasherize(ddd.domainName),
      directory: strings.dasherize(ddd.directory || ''),
      libraryName: strings.dasherize(ddd.libraryName || ''),
      withoutLibraryTypePrefix: ddd.withoutLibraryTypePrefix ?? false,
      prefix: strings.dasherize(ddd.prefix || ''),
      flat: ddd.flat ?? false,
      standaloneConfig: ddd.standaloneConfig ?? false,
    };
    this.initProperties();
  }

  private initProperties(): void {
    const {
      libraryName,
      libraryType,
      withoutLibraryTypePrefix,
      domainName,
      directory,
      prefix,
    } = this.ddd;

    if (!libraryName) {
      this._libraryName = libraryType;
    } else if (libraryName && withoutLibraryTypePrefix) {
      this._libraryName = libraryName;
    } else {
      this._libraryName = `${libraryType}-${libraryName}`;
    }

    const libraryPaths: string[] = [domainName];
    if (directory) {
      libraryPaths.push(directory);
    }
    if (withoutLibraryTypePrefix) {
      libraryPaths.push(libraryType);
    }
    this._libraryDirectory = normalizePath(joinPathFragments(...libraryPaths));

    this._projectName = `${this.libraryDirectory.replace(/\//g, '-')}-${
      this.libraryName
    }`;

    if (prefix) {
      this._libraryPrefix = prefix;
    } else {
      this._libraryPrefix = domainName;
    }
  }
}
