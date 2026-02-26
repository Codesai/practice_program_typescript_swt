/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const transformIgnorePatterns =  {
    transformIgnorePatterns: [
        "node_modules/(?!mariadb/)"
    ]
}
module.exports = {
    coverageDirectory: "reports/coverage",
    coverageReporters: ["lcov", "text"],
    collectCoverageFrom: ["src/**/*.ts"],
    preset: 'ts-jest',
    passWithNoTests: true,
    testEnvironment: 'node',
    verbose: true,
    testPathIgnorePatterns: [
        "<rootDir>/build/",
        "<rootDir>/node_modules/",
        "<rootDir>/.stryker-tmp"
    ],
    projects: [
        {
            displayName: 'all',
            testMatch: ['**/*.spec.ts'],
            globalSetup: '<rootDir>/tests/infrastructure/integration/persistence/setup/Setup.ts',
            globalTeardown: '<rootDir>/tests/infrastructure/integration/persistence/setup/Teardown.ts',
        },
        {
            displayName: 'unit',
            testMatch: [
                '**/*.spec.ts',
            ],
            testPathIgnorePatterns : ['<rootDir>/tests/infrastructure/integration/']
        },
        {
            ...transformIgnorePatterns,
            displayName: 'integration',
            testMatch: ['<rootDir>/tests/infrastructure/integration/**/*.spec.ts'],
            globalSetup: '<rootDir>/tests/infrastructure/integration/persistence/setup/Setup.ts',
            globalTeardown: '<rootDir>/tests/infrastructure/integration/persistence/setup/Teardown.ts',
        },
        {
            ...transformIgnorePatterns,
            displayName: 'persistence',
            testMatch: ['<rootDir>/tests/infrastructure/integration/persistence/*.spec.ts'],
            globalSetup: '<rootDir>/tests/infrastructure/integration/persistence/setup/Setup.ts',
            globalTeardown: '<rootDir>/tests/infrastructure/integration/persistence/setup/Teardown.ts',
        },
        {
            displayName: 'web',
            testMatch: ['<rootDir>/tests/infrastructure/integration/web/*.spec.ts'],
        }
    ]
};