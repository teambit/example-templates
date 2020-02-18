import generateVueTemplate from './vue-default-code';
import { expect } from 'chai';

it('should create default code', () => {
	const result = generateVueTemplate({ npmId: '@bit/bit.javascript.raw.code-generator' });

	expect(result).to.equal(
		[
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
		].join('\n')
	);
});
