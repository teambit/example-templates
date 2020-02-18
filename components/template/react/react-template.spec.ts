import { makeTemplate } from './react-template'; 
import { expect } from 'chai';

it('should create default code', () => {
	const result = makeTemplate({ npmId: '@bit/bit.javascript.raw.code-generator' });

	const indexjs = [
		`import React from 'react';`,
		`import CodeGenerator from '@bit/bit.javascript.raw.code-generator';`,
		``,
		`export default (`,
		`	<CodeGenerator/>`,
		`)`,
	].join('\n');

	expect(JSON.stringify(result)).to.deep.equal(
		JSON.stringify({
			files: {
				'index.js': indexjs,
			},
			mainFile: 'index.js',
		})
	);
});
