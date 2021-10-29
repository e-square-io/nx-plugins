import { logger, writeJsonFile } from '@nrwl/devkit';
import { createProjectGraphAsync } from '@nrwl/workspace/src/core/project-graph';
import { createPackageJson } from '@nrwl/workspace/src/utilities/create-package-json';
import { basename } from 'path';
import { NormalizedExecutorSchema } from './normalize';

export async function generatePackageJson(
  projectName: string,
  options: NormalizedExecutorSchema & { outputPath: string }
): Promise<void> {
  try {
    const graph = await createProjectGraphAsync();

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
