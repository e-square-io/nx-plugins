import { SupportedStyles } from '@nrwl/react';

import { DDD } from '../../ddd';

export interface ReactGeneratorSchema extends DDD {
  style: SupportedStyles;
  pascalCaseFiles: boolean;
  pascalCaseDirectory: boolean;
  classComponent: boolean;
}
