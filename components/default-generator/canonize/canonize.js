import NpmId from '@bit/bit.javascript.component.npm-id';
import BitNameId from '@bit/bit.javascript.component.id';
import camelcase from 'camelcase';

const CLASS_CAMELCASE_OPTIONS = { pascalCase: true };

export function canonizeNpmId(rawId: string) {
	const parsed = NpmId.fromNpmId(rawId);
	if (parsed === undefined) return undefined;

	return parsed.toNpmId({ includeVersion: false, includeFilePath: false });
}

export function toCanonicalClassName(rawId) {
	const parsed = BitNameId.fromNpmId(rawId) || NpmId.fromNpmId(rawId);

	const componentName = (parsed && parsed.name) || 'ThisComponent';
	return camelcase(componentName, CLASS_CAMELCASE_OPTIONS);
}