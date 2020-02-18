const optional = require('@bit/bit.utils.string.optional');
 
/** @flow */
const npmIdRegex = /^(@([^\/@]+)\/)?([^/@]+)(@([^@/]*))?(\/(.+))?$/;

const VERSION_QUERY_PARAM = 'version';
const VERSION_PATH_PARAM = 'v';

class NpmId {
	fullName: Array<string>;
	version: string;
	registry: string;
	filePath: ?string;

	/**
	 * @name constructor
	 * @description initialize class to handle npmIds
	 * @param {string} packageId
	 * @param {string} version
	 * @example const parsedBitId = new NpmId('react', '16.4.5');
	*/
	constructor(packageId, version) {
		const parsed = npmIdRegex.exec(packageId);
		const [/*fullMatch*/,
			/* group 1*/, registry,
			packageName,
			// /* group 3*/, version
		] = parsed;

		this.fullName = [packageName];
		if (registry) this.registry = registry;
		this.version = version;
	}

	/**
	 * @name getFullname()
	 * @param {string} separator
	 */
	getFullname(separator = '/') {
		return this.fullName.join(separator);
	}

	get nameSpace(): string {
		return [];
	}

	get name(): string {
		const { fullName } = this;
		return fullName[0];
	}

	/**
	 * @param {Object} [options]
	 * @param {boolean} [options.includeVersion]
	 */
	toNpmId({ includeRegistry = true, includeVersion = true, includeFilePath = false } = {}) {
		const { version, registry, filePath } = this;

		return [
			optional('@', includeRegistry && registry, '/'),
			this.getFullname(),
			optional('@', includeVersion && version),
			optional('/', includeFilePath && filePath)
		].join('');
	}

	/**
	 * @description convert to web path format
	 */
	toUrl() {
		return [
			optional('@', this.registry, '/'),
			this.getFullname(),
		].join('');
	}

	/**
	 * @name toQueryParams
	 * @param {Object} [options]
	 * @param {boolean} [options.withVersion] - add version to query param
	 * @returns string
	 */
	toQueryParams({ withVersion = true } = {}) {
		const { version } = this;

		const queryParams = [
			withVersion && version && `${VERSION_QUERY_PARAM}=${version}`
		]
			.filter(x => !!x)
			.join('&');

		return queryParams;
	}

	/**
	 * @name toPathParams
	 * @param {Object} [options]
	 * @param {boolean} [options.withVersion=true] - add version to query param
	 * @returns string
	 */
	toPathParams({ withVersion = true }: QueryParamsOptions = {}) {
		const { version } = this;

		return [
			withVersion && optional(`~${VERSION_PATH_PARAM}=`, version)
		]
			.filter(x => !!x)
			.join('/');
	}

	/**
	 * @description create new instance by parsing a standard npm id
	 * @param {string} rawId 
	 */
	static fromNpmId(rawId) {
		if (!rawId) return undefined;

		const parsed = npmIdRegex.exec(rawId);
		if (!parsed) return undefined;

		const [/*fullMatch*/,
			/* group 1*/, registry,
			packageId,
			/* group 3*/, version,
			/* group 4*/, filePath
		] = parsed;

		const instance = new NpmId(packageId, version);
		instance.registry = registry;
		instance.filePath = filePath;
		return instance;
	};

	/**
	 * @description create new instance by parsing a web path
	 * @param {string} urlId 
	 * @param {string} [queryParams]
	 */
	static fromUrl(rawId, queryParams = {}) {
		if (!rawId) return undefined;

		const parsed = npmIdRegex.exec(rawId);

		const [/*fullMatch*/,
			/* group 1*/, registry,
			packageName,
			// /* group 3*/, version
		] = parsed;

		const { version } = queryParams;

		const npmId = new NpmId(packageName, version);
		if (registry) npmId.registry = registry;

		return npmId;
	}
}

module.exports = NpmId;