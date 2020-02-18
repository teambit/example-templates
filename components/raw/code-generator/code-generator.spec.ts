import { CodeGenerator } from './code-generator';
import { expect } from 'chai';

it('should construct', () => {
	const result = new CodeGenerator();
	expect(result).to.not.be.undefined;
});

it('should generate default export', () => {
	const codeGenerator = new CodeGenerator();

	const result = codeGenerator.generateExport({ defaultExport: `'cat'` });

	expect(result).to.equal([
		'export default (',
		"	'cat'",
		')'
	].join('\n'));
});
