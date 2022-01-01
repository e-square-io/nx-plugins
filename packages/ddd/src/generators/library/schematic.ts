import { convertNxGenerator, GeneratorCallback } from '@nrwl/devkit';

import dddLibraryGenerator from './generator';

export default convertNxGenerator(
  dddLibraryGenerator as unknown as GeneratorCallback
);
