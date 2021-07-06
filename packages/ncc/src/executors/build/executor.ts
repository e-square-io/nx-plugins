import {
  ExecutorContext,
  logger,
  offsetFromRoot,
  writeJsonFile,
  readJsonFile,
} from '@nrwl/devkit';
import { exec, execSync } from 'child_process';
import { createPackageJson } from '@nrwl/workspace/src/utilities/create-package-json';
import { basename, resolve } from 'path';
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';
import {
  assetGlobsToFiles,
  copyAssetFiles,
} from '@nrwl/workspace/src/utilities/assets';
import { NccBuildExecutorSchema } from './schema';
import { relative } from 'path';
import { Observable } from 'rxjs';
import { eachValueFrom } from 'rxjs-for-await';
import { readWorkspaceConfig } from '@nrwl/workspace';

export function normalizeOptions(
  opts: NccBuildExecutorSchema,
  context: ExecutorContext
): NccBuildExecutorSchema {
  const root = resolve(opts.root || context.root);
  const projectRoot = resolve(
    root,
    opts.projectRoot || context.workspace.projects[context.projectName].root
  );

  return {
    ...opts,
    assets: opts.assets ?? [],
    root,
    projectRoot,
    sourceRoot: resolve(root, opts.sourceRoot || ''),
    tsConfig: resolve(root, opts.tsConfig),
    main: resolve(root, opts.main),
    outputPath: resolve(root, opts.outputPath),
  };
}

export function normalizeArgs(opts: NccBuildExecutorSchema): string {
  const args = [];
  // push output path
  args.push(`-o ${opts.outputPath}`);

  // push skip cache (as nx cache is used)
  args.push('-C');

  if (opts.watch) {
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

  if (opts.externalModules?.length) {
    args.push(...opts.externalModules.map((module) => `--external ${module}`));
  }

  return args.join(' ');
}

export function generatePackageJson(
  projectName: string,
  options: NccBuildExecutorSchema
): void {
  try {
    const graph = createProjectGraph(
      readWorkspaceConfig({ path: `${options.root}`, format: 'angularCli' }),
      readJsonFile(`${options.root}/nx.json`)
    );
    const packageJson = createPackageJson(projectName, graph, options);
    packageJson.main = `./${basename(options.main, '.ts')}.js`;
    delete packageJson.devDependencies;
    writeJsonFile(`${options.outputPath}/package.json`, packageJson);
    logger.info(`Done writing package.json to ${options.outputPath}`);
  } catch (e) {
    logger.fatal(e);
    throw e;
  }
}

// solves https://github.com/vercel/ncc/issues/457
export function replaceTsConfigFiles(
  options: NccBuildExecutorSchema,
  revert?: boolean
): void {
  const resetFiles = () =>
    execSync(`git checkout ${options.projectRoot}/tsconfig.json`, {
      stdio: 'pipe',
    });

  try {
    if (revert) {
      resetFiles();
      return;
    }

    const finalTsConfig = JSON.parse(
      execSync(`tsc -p ${options.tsConfig} --showConfig`, {
        encoding: 'utf-8',
      }).toString()
    );

    writeJsonFile(`${options.projectRoot}/tsconfig.json`, finalTsConfig);
  } catch (e) {
    resetFiles();
    logger.fatal(e);
    throw e;
  }
}

export function runNccCommand(
  opts: NccBuildExecutorSchema
): Observable<{ success: boolean }> {
  return new Observable<{ success: boolean }>((observer) => {
    replaceTsConfigFiles(opts);

    const execProcess = exec(
      `npx --no-install -p="@vercel/ncc" ncc build ${opts.main} ${normalizeArgs(
        opts
      )}`
    );
    const processExitListener = () => {
      execProcess.kill(0);
      observer.complete();
    };

    process.on('exit', processExitListener);
    process.on('SIGTERM', processExitListener);
    execProcess.stdout.on('data', (chunk) => {
      logger.info(chunk);
      if (opts.watch && chunk.includes('Watching for changes...')) {
        observer.next({ success: true });
      }
    });
    execProcess.stderr.on('data', (chunk) => {
      logger.fatal(chunk);
    });

    execProcess.on('exit', (code) => {
      replaceTsConfigFiles(opts, true);
      observer.next({ success: code === 0 });
      observer.complete();
    });
  });
}

export default async function* runExecutor(
  options: NccBuildExecutorSchema,
  context: ExecutorContext
) {
  const opts = normalizeOptions(options, context);

  try {
    for await (const { success } of eachValueFrom<{ success: boolean }>(
      runNccCommand(opts)
    )) {
      if (success) {
        await copyAssetFiles(
          assetGlobsToFiles(opts.assets, opts.root, opts.outputPath)
        );
        generatePackageJson(context.projectName, opts);
      }
      yield { success };
    }
  } catch (e) {
    logger.error(e);
    yield { success: false };
  }
}
