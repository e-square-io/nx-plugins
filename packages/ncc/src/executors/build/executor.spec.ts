import { NccBuildExecutorSchema } from './schema';
import executor from './executor';

jest.mock('./executor');

import * as exec from './executor';
import * as utils from '@nrwl/workspace/src/utilities/assets';
import { of } from 'rxjs';

const options: NccBuildExecutorSchema = {
  main: '',
  tsConfig: 'test',
  outputPath: '',
};

describe('Build Executor', () => {
  let nccCommand, generateJson, replaceTsConfig, copyAssets;

  beforeEach(() => {
    jest
      .spyOn(exec, 'default')
      .mockImplementation((...args) => executor(...args));
    nccCommand = jest
      .spyOn(exec, 'runNccCommand')
      .mockReturnValue(of({ success: true }));
    generateJson = jest
      .spyOn(exec, 'generatePackageJson')
      .mockImplementation(() => undefined);
    replaceTsConfig = jest
      .spyOn(exec, 'replaceTsConfigFiles')
      .mockImplementation(() => undefined);
    copyAssets = jest
      .spyOn(utils, 'copyAssetFiles')
      .mockReturnValue(Promise.resolve({ success: true }));
  });

  afterEach(() => jest.clearAllMocks());

  it('can run', async () => {
    const output = await exec.default(options, {
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
    await expect((await output.next()).value).resolves.toBe(true);
  });
});
