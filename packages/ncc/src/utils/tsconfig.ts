import { execSync } from 'child_process';
import { logger, writeJsonFile } from '@nrwl/devkit';
import { NormalizedExecutorSchema } from './normalize';

/** solves https://github.com/vercel/ncc/issues/457 */
export function replaceTsConfigFiles(
  options: NormalizedExecutorSchema,
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

    // get processed tsconfig file
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
