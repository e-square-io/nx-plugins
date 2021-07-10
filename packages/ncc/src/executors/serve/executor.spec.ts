import { NccServeExecutorSchema } from './schema';

jest.mock('../../utils');

import executor from './executor';

const options: NccServeExecutorSchema = {
  main: '',
  tsConfig: 'test',
};

describe('Serve Executor', () => {
  afterEach(() => jest.clearAllMocks());

  it('can run', async () => {
    const output = await executor(options, {
      target: {
        executor: '',
      },
      root: '',
      projectName: 'test',
      cwd: process.cwd(),
      isVerbose: true,
      workspace: {
        version: 1,
        projects: {
          test: {
            root: '',
            sourceRoot: '',
            targets: {},
          },
        },
      },
    });
    expect((await output.next()).value).toEqual({ success: true });
  });
});
