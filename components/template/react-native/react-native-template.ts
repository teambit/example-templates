import { CodeGenerator } from '@bit/bit.javascript.raw.code-generator';
import {
	canonizeNpmId,
	toCanonicalClassName,
} from '@bit/bit.javascript.default-generator.canonize';

const codeGenerator = new CodeGenerator();

export const mainFile = 'index.tsx';
export function makeReactNativeTemplate({ npmId }: { npmId: string }) {
	const code = genrateMainFile(npmId);

	return {
		files: {
			[mainFile]: code,
		},
		mainFile: mainFile,
	};
}

function genrateMainFile(npmId: string): string {
	const defaultName = toCanonicalClassName(npmId);
	const moduleId = canonizeNpmId(npmId);

	return [
		codeGenerator.generateImport({ defaultName: 'React', moduleId: 'react' }),
		codeGenerator.generateImport({
			nonDefaults: ['StyleSheet', 'View', 'Text'],
			moduleId: 'react-native',
		}),
		codeGenerator.generateImport({ defaultName: defaultName, moduleId: moduleId }),
		'',
		`const styles = StyleSheet.create({`,
		`	container: { flex: 1 }, //etc`,
		`});`,
		'',
		`export default () => (`,
		`	<View style={styles.container}>`,
		`		<${defaultName}/>`,
		`	</View>`,
		`)`
	].join('\n');
}
