import { ExecutorContext } from '@nrwl/devkit';
import { resolve } from 'path';
import { SourceMapOptions } from '@nrwl/node/src/utils/types';
import { AssetGlob } from '@nrwl/workspace/src/utilities/assets';

export interface BaseExecutorSchema {
  main: string;
  tsConfig: string;
  sourceMap?: boolean | Pick<SourceMapOptions, 'hidden'>;
  optimization?: boolean;
  statsJson?: boolean;
  quiet?: boolean;
  target?: string;
  externalDependencies?: string[];
  assets?: (string | AssetGlob)[];
}

export type NormalizedExecutorSchema<
  T extends BaseExecutorSchema = BaseExecutorSchema
> = T & {
  root: string;
  sourceRoot: string;
  projectRoot: string;
};

export function normalizeOptions<T extends BaseExecutorSchema>(
  opts: T,
  context: ExecutorContext
): NormalizedExecutorSchema<T> {
  const root = resolve(context.root);
  const projectConfig = context.workspace.projects[context.projectName];
  const projectRoot = resolve(root, projectConfig.root);

  return {
    ...opts,
    assets: opts.assets ?? [],
    root,
    projectRoot,
    sourceRoot: resolve(root, projectConfig.sourceRoot || ''),
    tsConfig: resolve(root, opts.tsConfig),
    main: resolve(root, opts.main),
  };
}

export function normalizeArgs<T extends NormalizedExecutorSchema>(
  opts: T
): string {
  const args = [];
  // push skip cache (as nx cache is used)
  args.push('-C');

  // push output path
  if ((opts as any).outputPath) {
    args.push(`-o ${(opts as any).outputPath}`);
  }

  if ((opts as any).watch) {
    args.push(`-w`);
  }

  if (opts.sourceMap) {
    args.push(`-s`);
    if (typeof opts.sourceMap !== 'boolean' && opts.sourceMap.hidden) {
      args.push('--no-source-map-register');
    }
  }

  if (opts.optimization) {
    args.push('-m');
  }

  if (opts.quiet) {
    args.push('-q');
  }

  if (opts.externalDependencies?.length) {
    args.push(
      ...opts.externalDependencies.map((module) => `--external ${module}`)
    );
  }

  return args.join(' ');
}
