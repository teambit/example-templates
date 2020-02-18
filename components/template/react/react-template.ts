import { generateReactDefaultCode } from '@bit/bit.javascript.default-generator.react';

export const mainFile = 'index.js';

export function makeReactTemplate({ npmId }: { npmId: string }) {
	const code = generateReactDefaultCode(npmId);

	return {
		files: {
			[mainFile]: code,
		},
		mainFile: mainFile,
	};
}
