/** @flow */

const optional = require('@bit/bit.utils.string.optional');
const NpmId = require('@bit/bit.javascript.component.npm-id');

const BIT_REGISTRY = 'bit';
const NPM_SEPARATOR = '.';
const BIT_NAMESPACE_SEPARATOR = '/';
const BIT_SCOPE_SEPARATOR = '.';

// owner.scope/fullName
const bitIdRegex = /^([^./@]+)\.([^./@]+)(\/([^.@]+))(@([^@]*))?$/;
// /owner/scope/fullName
const urlIdRegex = /^\/?([^./@]+)\/([^./@]+)(\/([^.@]*))$/;

const VERSION_QUERY_PARAM = 'version';
const VERSION_PATH_PARAM = 'v';

type QueryParams = {
  version?: string
}
type QueryParamsOptions = {
  withVersion: ?boolean
}

type NpmOptions = {
  includeRegistry: ?boolean,
  includeVersion: ?boolean,
  overrideOwnerScopeWithScopeid: ?boolean
}

/**
 * @name BitNameId
 * @example BitNameId.fromBitId('bit.utils/string/optional');
 */

class BitId {
  owner: string;
  scope: string;
  /**
   * @property {string} [scopeId] - alternative representation of owner + scope names. Used in specific methods with the overrideOwnerScopeWithScopeid flag.
   */
  scopeId: string;
  fullName: Array<string>;
  version: string;
  filePath: string;
  /**
   * @property {string} registry - all bit components will have the "bit" as registry (compatible with NpmIds)
   */
  get registry(): string { return BIT_REGISTRY; }

  /**
   * @name construtor
   * @description initialize class to handle bitIds
   * @param {string} owner
   * @param {string} scope
   * @param {string[]} fullName
   * @param {string} name
   * @param {string} version
   * @example const parsedBitId = new BitId('uri', 'kutorg', 'component/is-string', '1.0.0');
   */
  constructor(owner: string, scope: string, fullName: Array<string> | string = [], version: string) {
    this.owner = owner;
    this.scope = scope;
    this.fullName = !!fullName
      ? (typeof fullName === 'string') ? fullName.split(BIT_NAMESPACE_SEPARATOR) : fullName
      : [];
    this.version = version;
  }

  /**
   * @name toNpmId
   * @description create npm id
   * @param {Object} options
   * @param {boolean} [options.includeVersion] - includes '@x.x.x' at the end of the result
   * @param {boolean} [options.includeFilePath] - includes '/dist/file.js' at the end of the result
   * @param {boolean} [options.includeRegistry] - includes '@bit/' registry at the start of the result
   * @param {boolean} [options.includePrefix] - DEPRECATED includes '@bit/' registry at the start of the result
   */
  toNpmId(options: NpmOptions = {}) {
    const { version, filePath } = this;
    
    //backward compatability for .includePrefix:
    if (options.includeRegistry === undefined && options.includePrefix !== undefined) {
      options.includeRegistry = options.includePrefix
    };

    const fullName = [
      optional('', this.getFullScopeName(NPM_SEPARATOR), NPM_SEPARATOR),
      this.getFullName(NPM_SEPARATOR)
    ].join('')

    const npmId = new NpmId(fullName, version);
    npmId.registry = BIT_REGISTRY;
    npmId.filePath = filePath;

    return npmId.toNpmId(options);
  }

  /**
   * @name toBitId
   * @description create bitId
   */
  toBitId({ includeVersion = true } = {}) {
    const { version } = this;

    if(!this.getFullName()) return undefined;

    const segments = [
      optional('', this.getFullScopeName(BIT_SCOPE_SEPARATOR), BIT_NAMESPACE_SEPARATOR),
      this.getFullName(BIT_NAMESPACE_SEPARATOR),
      optional('@', includeVersion && version)
    ];

    return segments.join('');
  }

  /**
   * @param {Object} [options]
   * @param {boolean} [options.overrideOwnerScopeWithScopeid] - replace owner + scope names with the hashed scopeId
   */
  toUrl({ overrideOwnerScopeWithScopeid = false } = {}) {
    const { owner, scope, scopeId, fullName } = this;

    const segments = [];
    if (overrideOwnerScopeWithScopeid) segments.push(scopeId);
    else segments.push(owner, scope);

    segments.push(...fullName);

    return segments.join('/');
  }

  /**
   * @name toQueryParams
   * @param {Object} [options]
   * @param {boolean} [options.withVersion=true] - add version to query param
   * @returns string
   */
  toQueryParams({ withVersion = true }: QueryParamsOptions = {}) {
    const { version } = this;

    return [
      withVersion && optional(`${VERSION_QUERY_PARAM}=`, version)
    ]
      .filter(x => !!x)
      .join('&');
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
   * @name getFullName
   * @param {string} separator - add version to query param
   * @returns string
   */
  getFullName(separator: string = '/'): string {
    const { fullName } = this;

    return [].concat(fullName).join(separator);
  }

  /**
   * @name getFullScopeName
   * @returns string
   */
  getFullScopeName(separator = BIT_SCOPE_SEPARATOR): string {
    const { owner, scope } = this;

    return [owner, scope].join(separator);
  }

  get nameSpace(): string {
    const { fullName } = this;
    return fullName.slice(0, -1);
  }

  get name(): string {
    const { fullName } = this;
    // const len = fullName.length;
    return fullName.slice(-1).pop();
  }

  /**
   * @name fromNpmId
   * @param {boolean} withVersion - add version to query param
   * @param {boolean} [options.enforceScopedBitRegistry]
   * @returns BitId
   */
  static fromNpmId(id: string, { enforceScopedBitRegistry = true, allowFallbackToNpm = false }: { enforceScopedBitRegistry: boolean, allowFallbackToNpm: boolean } = {}): BitId | undefined {
    if (allowFallbackToNpm && !enforceScopedBitRegistry) {
      throw new Error('illegal parameters combination: { allowFallbackToNpm: true, enforceScopedBitRegistry: false }');
    }


    const npmId = NpmId.fromNpmId(id);
    if (!npmId) return undefined;

    const { registry, name, version, filePath } = npmId;
    if (!name) return undefined;

    if (enforceScopedBitRegistry && registry !== BIT_REGISTRY) {
      if (allowFallbackToNpm) return npmId;
      return undefined;
    }

    const [owner, scope, ...fullName] = name.split(NPM_SEPARATOR);
    if (!owner || !scope || fullName.length === 0) return undefined;

    const instance = new BitId(owner, scope, fullName, version);
    instance.filePath = filePath;

    return instance;
  }

  /**
   * @name fromUrl
   * @param {string} id - represents component url
   * @param {QueryParams} queryParams - add version to query param
   * @returns BitId
   */
  static fromUrl(id: string, queryParams: QueryParams = {}) {
    const parsed = urlIdRegex.exec(id);
    if (!parsed) return undefined;

    const [,			//match 0
      owner,			//group 1
      scope,			//group 2
      /* /box*/, box,	//group 3, group 4
    ] = parsed;

    const fullName = (box || '').split('/');

    return new BitId(owner, scope, fullName, queryParams.version);
  }

  /**
   * @name fromBitId
   * @description convert string to bitId
   * @param {string} id
   * @returns BitId
   */
  static fromBitId(id: string): BitId {
    const parsed = bitIdRegex.exec(id);
    if (!parsed) return undefined;

    const [,			//match 0
      owner,			//group 1
      scope,			//group 2
      /* /box */, box,	//group 3, group 4
      /* @version */, version,	//group 5, group 6
    ] = parsed;

    const fullName = (box || '').split('/');

    return new BitId(owner, scope, fullName, version);
  }
}

module.exports = BitId;