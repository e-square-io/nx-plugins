import { NccBuildExecutorSchema } from './schema';

jest.mock('../../utils');

import executor from './executor';
import * as utils from '@nrwl/workspace/src/utilities/assets';

const options: NccBuildExecutorSchema = {
  main: '',
  tsConfig: 'test',
  outputPath: '',
};

describe('Build Executor', () => {
  let copyAssets;

  beforeEach(() => {
    copyAssets = jest
      .spyOn(utils, 'copyAssetFiles')
      .mockReturnValue(Promise.resolve({ success: true }));
  });

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
