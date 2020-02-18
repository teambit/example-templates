export type ImportStatement = {
	moduleId: string,
	defaultName?: string,
	nonDefaults?: string[],
	namespace?: string,
};

export type ModuleStatement = {
	imports: ImportStatement[],
	defaultExport: string,
};

export class CodeGenerator {
	tab: string;

	constructor({ tab = '\t' } = {}) {
		this.tab = tab;
	}

	generateImport({ defaultName, nonDefaults, namespace, moduleId }: ImportStatement): string {
		const toImport = [];
		if (defaultName) {
			toImport.push(defaultName);
		}
		if (namespace) {
			toImport.push(`* as ${namespace}`);
		}
		if (nonDefaults) {
			toImport.push(`{ ${nonDefaults.join(', ')} }`);
		}

		return `import ${toImport.join(', ')} from '${moduleId}';`;
	}

	generateExport({ defaultExport }: { defaultExport: string }): string {
		return [
			'export default (',
			defaultExport
				.split('\n')
				.map(x => this.tab + x)
				.join('\n'),
			')',
		].join('\n');
	}

	generateModule({ imports, defaultExport }: ModuleStatement): string {
		const textImports = imports.map(this.generateImport);

		return [...textImports, '', this.generateExport({ defaultExport })].join('\n');
	}
}
