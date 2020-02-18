import { canonizeNpmId, toCanonicalClassName } from '@bit/bit.javascript.default-generator.canonize';
import { CodeGenerator } from '@bit/bit.javascript.raw.code-generator';

const codeGenerator = new CodeGenerator();

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

function generateReactDefaultCode(npmId: string): string {
	const defaultName = toCanonicalClassName(npmId);
	const moduleId = canonizeNpmId(npmId);

	return codeGenerator.generateModule({
		imports: [
			{ defaultName: 'React', moduleId: 'react' },
			{ defaultName: defaultName, moduleId: moduleId },
		],
		defaultExport: `<${defaultName}/>`,
	});
}
