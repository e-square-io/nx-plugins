import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('ddd e2e', () => {
  let plugin: string;

  beforeEach(() => {
    plugin = uniq('ddd');
    ensureNxProject('@e-square/nx-ddd', 'dist/packages/ddd');
  });

  it('should create ddd', async (done) => {
    await runNxCommandAsync(`generate @e-square/nx-ddd:ddd ${plugin}`);
    const result = await runNxCommandAsync(`build ${plugin}`);

    expect(result.stdout).toContain('Executor ran');
    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      await runNxCommandAsync(
        `generate @e-square/nx-ddd:ddd ${plugin} --directory subdir`
      );

      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      await runNxCommandAsync(
        `generate @e-square/nx-ddd:ddd ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');

      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
