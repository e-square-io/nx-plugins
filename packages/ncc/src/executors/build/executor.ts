import { ExecutorContext, logger } from '@nrwl/devkit';
import {
  assetGlobsToFiles,
  copyAssetFiles,
} from '@nrwl/workspace/src/utilities/assets';
import { NccBuildExecutorSchema } from './schema';
import { eachValueFrom } from 'rxjs-for-await';
import {
  generatePackageJson,
  normalizeOptions,
  runNccCommand,
} from '../../utils';

export default async function* runExecutor(
  options: NccBuildExecutorSchema,
  context: ExecutorContext
) {
  const opts = normalizeOptions(options, context);

  try {
    for await (const { success } of eachValueFrom<{ success: boolean }>(
      runNccCommand('build', opts)
    )) {
      if (success) {
        await copyAssetFiles(
          assetGlobsToFiles(opts.assets, opts.root, opts.outputPath)
        );
        if (opts.generatePackageJson)
          await generatePackageJson(context.projectName, opts);
      }
      yield { success };
    }
  } catch (e) {
    logger.fatal(e);
    yield { success: false };
  }
}
