import { ExecutorContext, logger } from '@nrwl/devkit';
import { eachValueFrom } from 'rxjs-for-await';
import { normalizeOptions, runNccCommand } from '../../utils';
import { NccServeExecutorSchema } from './schema';

export default async function* runExecutor(
  options: NccServeExecutorSchema,
  context: ExecutorContext
) {
  const opts = normalizeOptions(options, context);

  try {
    for await (const { success } of eachValueFrom<{ success: boolean }>(
      runNccCommand('run', opts)
    )) {
      yield { success };
    }
  } catch (e) {
    logger.fatal(e);
    yield { success: false };
  }
}
