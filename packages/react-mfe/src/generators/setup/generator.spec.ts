import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { createApp } from '@nrwl/react/src/utils/testing-generators';

import generator from './generator';
import { SetupGeneratorSchema } from './schema';
import { MFEType } from './utils';

describe('setup generator', () => {
  let appTree: Tree;
  let options: Partial<SetupGeneratorSchema>;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace(2);
  });

  it('should create host mfe', async () => {
    const appName = 'foo';
    await createApp(appTree, appName, true);

    options = {
      appName,
      mfeType: MFEType.Host,
      port: 4200,
    };

    await generator(appTree, options);

    const config = readProjectConfiguration(appTree, appName);

    expect(appTree.exists(`${config.root}/webpack.config.js`)).toBeTruthy();
    expect(
      appTree.exists(`${config.root}/webpack.prod.config.js`)
    ).toBeTruthy();
    expect(appTree.exists(`${config.root}/src/main.tsx`)).toBeTruthy();
    expect(appTree.exists(`${config.root}/src/bootstrap.tsx`)).toBeTruthy();
  });

  it('should create remote mfe', async () => {
    const appHostName = 'foo';
    await createApp(appTree, appHostName, true);

    options = {
      appName: appHostName,
      mfeType: MFEType.Host,
      port: 4200,
    };

    await generator(appTree, options);

    const appRemoteName = 'bar';
    await createApp(appTree, appRemoteName, true);

    options = {
      appName: appRemoteName,
      mfeType: MFEType.Remote,
      port: 4300,
      host: appHostName,
    };

    await generator(appTree, options);

    const config = readProjectConfiguration(appTree, appRemoteName);

    expect(appTree.exists(`${config.root}/webpack.config.js`)).toBeTruthy();
    expect(
      appTree.exists(`${config.root}/webpack.prod.config.js`)
    ).toBeTruthy();
    expect(appTree.exists(`${config.root}/src/main.tsx`)).toBeTruthy();
    expect(appTree.exists(`${config.root}/src/bootstrap.tsx`)).toBeTruthy();
    expect(
      appTree.exists(`${config.root}/src/app/remote-entry.tsx`)
    ).toBeTruthy();
  });
});
