import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	globalSetup: "tests/global-setup.js",
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: "tests",
};

export default config;
