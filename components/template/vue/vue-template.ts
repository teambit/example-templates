import vueGenerator from '@bit/bit.javascript.default-generator.vue';

export const mainFile = 'index.vue';

export function makeVueTemplate({ npmId }: { npmId: string }) {
	const code = vueGenerator({ npmId });

	return {
		files: {
			[mainFile]: code,
		},
		mainFile: mainFile,
	};
};
