import {
	canonizeNpmId,
	toCanonicalClassName,
} from '@bit/bit.javascript.default-generator.canonize';
import { CodeGenerator } from '@bit/bit.javascript.raw.code-generator';

const codeGenerator = new CodeGenerator();

export default function generateVueDefaultCode({ npmId }: { npmId: string }): string {
	const moduleName = toCanonicalClassName(npmId);
	const moduleId = canonizeNpmId(npmId);

	return [
		generateVueTemplate({ moduleName }),
		'',
		'<script>',
		generateVueModule({ moduleName, moduleId }).split('\n').map(x => `	${x}`).join('\n'),
		'</script>',
		'',
		generateVueStyle(),
	].join('\n');
}

function generateVueTemplate({ moduleName }: { moduleName: string }): string {
	return (
`<template>
	<${moduleName}/>
</template>`
)
}

function generateVueModule({ moduleId, moduleName }: { moduleId: string, moduleName: string }): string {
	return codeGenerator.generateModule({
		imports: [
			{ defaultName: "Vue", moduleId: "vue" },
			{ defaultName: moduleName, moduleId: moduleId }
		  ],
		defaultExport: [
			`{`,
			'	data: () => ({',
			'		var1: "world"',
			'	}),',
			'	components: {',
			`		${moduleName},`,
			'	}',
			'}',
		].join('\n'),
	});
}

function generateVueStyle() {
	return ['<style scoped>', '', '</style>'].join('\n');
}
