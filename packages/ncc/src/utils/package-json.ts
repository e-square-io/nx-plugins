import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';
import { readWorkspaceConfig } from '@nrwl/workspace';
import { logger, readJsonFile, writeJsonFile } from '@nrwl/devkit';
import { createPackageJson } from '@nrwl/workspace/src/utilities/create-package-json';
import { basename } from 'path';
import { NormalizedExecutorSchema } from './normalize';
import { workspaceFileName } from '@nrwl/workspace/src/core/file-utils';

export function generatePackageJson(
  projectName: string,
  options: NormalizedExecutorSchema & { outputPath: string }
): void {
  try {
    const graph = createProjectGraph(
      readWorkspaceConfig({
        path: `${options.root}`,
        format: workspaceFileName() === 'workspace.json' ? 'nx' : 'angularCli',
      }),
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
