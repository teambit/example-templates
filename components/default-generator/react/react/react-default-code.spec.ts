// import CodeGenerator from './code-generator';
import { generateReactDefaultCode } from './react-default-code';
import { expect } from 'chai';

it('should create default code', () => {
	const result = generateReactDefaultCode('@bit/bit.javascript.raw.code-generator');

	expect(result).to.equal(
		[
			`import React from 'react';`,
			`import CodeGenerator from '@bit/bit.javascript.raw.code-generator';`,
			``,
			`export default (`,
			`	<CodeGenerator/>`,
			`)`,
		].join('\n')
	);

	//I think it is easier to have multiline with .join('\n')
});
