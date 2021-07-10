import { exec } from 'child_process';
import { logger } from '@nrwl/devkit';
import { Observable } from 'rxjs';
import { replaceTsConfigFiles } from './tsconfig';
import {
  BaseExecutorSchema,
  normalizeArgs,
  NormalizedExecutorSchema,
} from './normalize';

export type NccCommand = 'build' | 'run' | 'cache' | 'help' | 'version';

function shouldWatch<T extends BaseExecutorSchema>(
  command: NccCommand,
  opts: T
): boolean {
  return command === 'run' || !!(opts as any).watch;
}

export function runNccCommand<T extends BaseExecutorSchema>(
  command: NccCommand,
  opts: NormalizedExecutorSchema<T>
): Observable<{ success: boolean }> {
  return new Observable<{ success: boolean }>((observer) => {
    replaceTsConfigFiles(opts);

    const execProcess = exec(
      `npx --no-install -p="@vercel/ncc" ncc ${command} ${
        opts.main
      } ${normalizeArgs(opts)}`
    );
    const processExitListener = () => {
      execProcess.kill(0);
      observer.complete();
    };

    process.on('exit', processExitListener);
    process.on('SIGTERM', processExitListener);
    execProcess.stdout.on('data', (chunk) => {
      logger.info(chunk);
      if (
        shouldWatch(command, opts) &&
        chunk.includes('Watching for changes...')
      ) {
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
