import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('ncc e2e', () => {
  it('should create ncc', async () => {
    const plugin = uniq('ncc');
    ensureNxProject('@e-square/nx-ncc', 'dist/packages/ncc');
    await runNxCommandAsync(`generate @e-square/nx-ncc:ncc ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('ncc');
      ensureNxProject('@e-square/nx-ncc', 'dist/packages/ncc');
      await runNxCommandAsync(
        `generate @e-square/nx-ncc:ncc ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('ncc');
      ensureNxProject('@e-square/nx-ncc', 'dist/packages/ncc');
      await runNxCommandAsync(
        `generate @e-square/nx-ncc:ncc ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
