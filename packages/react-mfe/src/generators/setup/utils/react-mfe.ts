export enum MFEType {
  Host = 'host',
  Remote = 'remote',
}

export interface SetupReactMFE {
  appName: string;
  mfeType: MFEType;
  port: number;
  remotes: string[];
  host: string | null;
  appRoot: string;
}

export interface RemotePorts {
  remoteName: string;
  port: number;
}

export const SHARED_SINGLETON_LIBRARIES = ['react', 'react-dom'];

export const SETUP_REACT_MFE_DEPENDENCIES = {
  '@angular-architects/module-federation': '^13.0.1',
};
