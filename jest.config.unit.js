module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  testMatch: ["<rootDir>/(src|db-config)/**/?(*.)test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: [
    "json-summary", 
    "text",
    "lcov"
  ],
};
