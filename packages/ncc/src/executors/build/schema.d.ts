import { BaseExecutorSchema } from '../../utils';

export interface NccBuildExecutorSchema extends BaseExecutorSchema {
  outputPath: string;
  generatePackageJson?: boolean;
  watch?: boolean;
}
