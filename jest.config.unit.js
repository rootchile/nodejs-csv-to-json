module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["<rootDir>/(src|db-config)/**/?(*.)test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
};
