import type { AssetGlob } from '@nrwl/workspace/src/utilities/assets';
import type { SourceMapOptions } from '@nrwl/node/src/utils/types';

export interface NccBuildExecutorSchema {
  main: string;
  outputPath: string;
  tsConfig: string;
  watch?: boolean;
  sourceMap?: boolean | Pick<SourceMapOptions, 'hidden'>;
  optimization?: boolean;
  assets?: (string | AssetGlob)[];
  statsJson?: boolean;
  quiet?: boolean;
  target?: string;
  externalModules?: string[];
  root?: string;
  sourceRoot?: string;
  projectRoot?: string;
}
