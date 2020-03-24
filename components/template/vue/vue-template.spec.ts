import { expect } from 'chai';
import generateVueDefaultCode from './vue-template';
import vueDefaultCodeSnapshot from './snapshots/vue-default-code';

it('should generate vue default code', () => {
	const vueDefaultCode = generateVueDefaultCode({ npmId: '@bit/bit.javascript.raw.code-generator' });
	expect(vueDefaultCode).to.equal(vueDefaultCodeSnapshot);
});
