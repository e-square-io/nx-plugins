const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/e2e/ddd-e2e',
    '<rootDir>/e2e/ncc-e2e',
    '<rootDir>/e2e/semantic-release-e2e',
  ],
};
