import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        testTimeout: 100 * 1000,
        setupFiles: ['allure-vitest/setup', 'global-setup.ts'],
        reporters: [
            'basic',
            ['allure-vitest/reporter', { resultDir: './allure-results' }]
        ]
    }
});
