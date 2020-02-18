import { makeVueTemplate } from './vue-template';
import { expect } from 'chai';

it('should create default code', () => {
	const result = makeVueTemplate({ npmId: '@bit/bit.javascript.raw.code-generator' });

	const indexvue = [
		'<template>',
		'	<CodeGenerator/>',
		'</template>',
		'',
		'<script>',
		"	import Vue from 'vue';",
		"	import CodeGenerator from '@bit/bit.javascript.raw.code-generator';",
		'	',
		'	export default (',
		'		{',
		'			data: () => ({',
		'				var1: "world"',
		'			}),',
		'			components: {',
		'				CodeGenerator,',
		'			}',
		'		}',
		'	)',
		'</script>',
		'',
		'<style scoped>',
		'',
		'</style>',
	].join('\n');

	expect(JSON.stringify(result)).to.deep.equal(
		JSON.stringify({
			files: {
				'index.vue': indexvue,
			},
			mainFile: 'index.vue',
		})
	);
});
