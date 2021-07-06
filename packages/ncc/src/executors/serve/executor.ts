import { NccServeExecutorSchema } from './schema';

export default async function runExecutor(options: NccServeExecutorSchema) {
  console.log('Executor ran for Serve', options);
  return {
    success: true,
  };
}
