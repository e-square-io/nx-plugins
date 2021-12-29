import {
  joinPathFragments,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { tsquery } from '@phenomnomnominal/tsquery';
import { ObjectLiteralExpression } from 'typescript';

import { MFEType, SetupReactMFE } from './react-mfe';

export const addRemoteToHost = (
  tree: Tree,
  { mfeType, host, appName, port }: SetupReactMFE
): void => {
  if (mfeType !== MFEType.Remote || !host) {
    return;
  }

  const hostProject = readProjectConfiguration(tree, host);
  const targets = hostProject.targets;

  const hostWebpackPath = targets?.build?.options?.webpackConfig;
  const hostCustomWebpackPath =
    targets?.build?.options?.customWebpackConfig?.path;

  if (!hostWebpackPath && !hostCustomWebpackPath) {
    throw new Error(
      `The selected host application, ${host}, does not contain a webpack.config.js. Are you sure it has been set up as a host application?`
    );
  }

  const selectedWebpackPath = hostWebpackPath
    ? hostWebpackPath
    : hostCustomWebpackPath;

  const hostWebpackConfig = tree.read(selectedWebpackPath, 'utf-8') || '';
  const webpackAst = tsquery.ast(selectedWebpackPath);
  const mfRemotesNode = tsquery(
    webpackAst,
    'Identifier[name=remotes] ~ ObjectLiteralExpression',
    { visitAllChildren: true }
  )[0] as ObjectLiteralExpression;

  const endOfPropertiesPos = mfRemotesNode.properties.end;

  const updatedConfig = `${hostWebpackConfig.slice(0, endOfPropertiesPos)}
    \t\t"${appName}": '${appName}@http://localhost:${
    port ?? 4200
  }/remoteEntry.js',${hostWebpackConfig.slice(endOfPropertiesPos)}`;

  tree.write(selectedWebpackPath, updatedConfig);

  const declarationFilePath = joinPathFragments(
    hostProject.sourceRoot || '',
    'decl.d.ts'
  );

  const declarationFileContent =
    (tree.exists(declarationFilePath)
      ? tree.read(declarationFilePath, 'utf-8')
      : '') + `\ndeclare module '${appName}/Component';`;
  tree.write(declarationFilePath, declarationFileContent);
};
