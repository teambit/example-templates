import { canonizeNpmId, toCanonicalClassName } from '../utils/canonize';
import { CodeGenerator } from '@bit/bit.javascript.raw.code-generator';

const codeGenerator = new CodeGenerator();

export function generateReactDefaultCode(npmId: string): string {
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
