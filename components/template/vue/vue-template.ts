import {
	canonizeNpmId,
	toCanonicalClassName,
} from '@bit/bit.javascript.default-generator.canonize';
import { CodeGenerator } from '@bit/bit.javascript.raw.code-generator';

export const mainFile = 'index.vue';

export function makeTemplate({ npmId }: { npmId: string }) {
	const code = generateVueDefaultCode({ npmId });

	return {
		files: {
			[mainFile]: code,
		},
		mainFile: mainFile,
	};
}

const codeGenerator = new CodeGenerator();

export default function generateVueDefaultCode({ npmId }: { npmId: string }): string {
	const moduleName = toCanonicalClassName(npmId);
	const moduleId = canonizeNpmId(npmId);

	const vueTemplate = generateVueTemplate({ moduleName })
	const vueModule = generateVueModule({ moduleName, moduleId })
		.split('\n')
		.map(x => `	${x}`)
		.join('\n')
	const vueStyle = generateVueStyle()

	return [
		`${vueTemplate}`,
		``,
		`<script>`,
		`${vueModule}`,
		`</script>`,
		``,
		`${vueStyle}`
	].join('\n')
}

function generateVueTemplate({ moduleName }: { moduleName: string }): string {
	return [
		`<template>`,
		`	<${moduleName} />`,
		`</template>`,
	].join('\n')
}

function generateVueModule({
	moduleId,
	moduleName,
}: {
	moduleId: string;
	moduleName: string;
}): string {
	const imports = [
		{ defaultName: moduleName, moduleId: moduleId },
	]

	const defaultExport = [
		`{`,
		`	data () {`,
		`		return {`,
		`			var1: 'World'`,
		`		}`,
		`	},`,
		`	components: {`,
		`		${moduleName}`,
		`	}`,
		`}`
	].join('\n')

	return codeGenerator.generateModule({
		imports,
		defaultExport
	});
}

function generateVueStyle() {
	return [
		`<style scoped>`,
		``,
		`</style>`
	].join('\n')
}
