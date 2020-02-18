'use strict';
const chai = require('chai');
var expect = chai.expect;

var NpmId = require('@bit/bit.javascript.component.npm-id');
var ComponendId = require('./index');

describe('ctor', function () {
	it('should instaciate', function () {
		var instance = new ComponendId('own', 'scope', 'box/name');

		var { owner, scope, fullName, registry } = instance;

		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('box', 'name');
		expect(registry).to.equal('bit');
	});

	it('should instaciate with version', function () {
		var instance = new ComponendId('own', 'scope', 'box/name', '1.3.2');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('box', 'name');
		expect(version).to.equal('1.3.2');
	});

	it('should instaciate with many fullName', function () {
		var instance = new ComponendId('own', 'scope', ['names', 'spaces'], '1.3.2');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('names', 'spaces');
		expect(version).to.equal('1.3.2');
	});
});

describe('npm id', function () {
	it("should create npm id", function () {
		var instance = new ComponendId('own', 'scope', ['names', 'spaces'], '1.3.2');

		var result = instance.toNpmId();

		expect(result).to.equal('@bit/own.scope.names.spaces@1.3.2');
	});

	it.skip("should create npm id, when without fullName", function () {
		var instance = new ComponendId('own', 'scope', [], '1.3.2');

		var result = instance.toNpmId();

		expect(result).to.equal('@bit/own.scope@1.3.2');
	});

	it("should create npm id, when without version", function () {
		var instance = new ComponendId('own', 'scope', ['namespace']);

		var result = instance.toNpmId();

		expect(result).to.equal('@bit/own.scope.namespace');
	});

	it("should parse npm id, when npm id is without scoped registry when enforceScopedBitRegistry is false", function () {
		var instance = ComponendId.fromNpmId('bitsrc.models.test.test', { enforceScopedBitRegistry: false });

		var result = instance.toNpmId();

		expect(result).to.equal('@bit/bitsrc.models.test.test');
	});

	it("should not include scopeId, even when included", function () {
		var instance = ComponendId.fromNpmId('@bit/bitsrc.models.test.test@1.0.0');
		instance.scopeId = 'a5gs3g';

		var result = instance.toNpmId();

		expect(result).to.equal('@bit/bitsrc.models.test.test@1.0.0');
	});

	it("should not parse npm id, when npm id is without scoped registry when enforceScopedBitRegistry is true", function () {
		var instance = ComponendId.fromNpmId('bitsrc.models.test.test', { enforceScopedBitRegistry: true });

		expect(instance).to.equal(undefined);
	});

	it("should fallback to NpmId, when allowFallbackToNpm is true", function () {
		var instance = ComponendId.fromNpmId('@material-ui/core@1.0.1', { allowFallbackToNpm: true });

		expect(instance).to.be.instanceOf(NpmId);

		expect(instance.version).to.equal("1.0.1");
		expect(instance.registry).to.equal("material-ui");
		expect(instance.fullName).to.deep.equal(["core"]);
		expect(instance.toNpmId()).to.equal("@material-ui/core@1.0.1");
	});

	it("should fallback to NpmId, with filepath", function () {
		var instance = ComponendId.fromNpmId('@material-ui/core@1.0.1/dist/index.js', { allowFallbackToNpm: true });

		expect(instance).to.be.instanceOf(NpmId);

		expect(instance.version).to.equal("1.0.1");
		expect(instance.registry).to.equal("material-ui");
		expect(instance.fullName).to.deep.equal(["core"]);
		expect(instance.filePath).to.equal("dist/index.js");
		expect(instance.toNpmId({includeFilePath: true})).to.equal("@material-ui/core@1.0.1/dist/index.js");
	});


	it("should return undefined, when allowFallbackToNpm is false", function () {
		var instance = ComponendId.fromNpmId('@material-ui/core@1.0.1', { allowFallbackToNpm: false });

		expect(instance).to.be.undefined;
	});

	it("should throw, when allowFallbackToNpm is true and enforceScopedBitRegistry is false", function () {
		expect(() => 
			ComponendId.fromNpmId('@material-ui/core@1.0.1', { allowFallbackToNpm: true, enforceScopedBitRegistry: false })
		).to.throw('illegal parameters combination: { allowFallbackToNpm: true, enforceScopedBitRegistry: false }');
	});

	it('should create npm id, without prefix, by option', function () {
		var instance = new ComponendId('own', 'scope', ['namespace'], '1.0.0');

		var result = instance.toNpmId({ includeRegistry: false });

		expect(result).to.equal('own.scope.namespace@1.0.0');
	})

	it('should not include version, by option', function () {
		var instance = new ComponendId('own', 'scope', ['namespace'], '1.0.0');

		var result = instance.toNpmId({ includeVersion: false });

		expect(result).to.equal('@bit/own.scope.namespace');
	})

	it('should not include version and prefix, by option', function () {
		var instance = new ComponendId('own', 'scope', ['namespace'], '1.0.0');

		var result = instance.toNpmId({ includeRegistry: false, includeVersion: false });

		expect(result).to.equal('own.scope.namespace');
	})

	it('should return undefined, when no proper @bit', function () {
		var instance = ComponendId.fromNpmId('@it/own.scope.fullName');

		expect(instance).to.be.an('undefined');
	});

	it('should return undefined, when too short', function () {
		var instance = ComponendId.fromNpmId('@bit/own');

		expect(instance).to.be.an('undefined');
	});

	it('should return undefined, when two versions', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.fullName.name@ver@ver');

		expect(instance).to.be.an('undefined');
	});

	it('should return undefined, when two versions', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.fullName@ver@ver');

		expect(instance).to.be.an('undefined');
	});

	it('should create from npmId', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.fullName.namespaces2@1.3.5');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version,
			filePath = instance.filePath;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('fullName', 'namespaces2');
		expect(version).to.equal('1.3.5');
		expect(filePath).to.be.undefined;
	});

	it('should create from npmId, without version', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.fullName.name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version,
			filePath = instance.filePath;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('fullName', 'name');
		expect(version).to.be.an('undefined');
		expect(filePath).to.be.undefined;
	});

	it('should create from npmId, with many fullName', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.names.spaces.name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version,
			filePath = instance.filePath;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('names', 'spaces', 'name');
		expect(version).to.be.an('undefined');
		expect(filePath).to.be.undefined;
	});

	it('should create from npmId, with no fullName', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version,
			filePath = instance.filePath;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('name');
		expect(version).to.be.an('undefined');
		expect(filePath).to.be.undefined;
	});

	it('should create from npmId, with no fullName but with version', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.name@1.5.3');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version,
			filePath = instance.filePath;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('name');
		expect(version).to.equal('1.5.3');
		expect(filePath).to.be.undefined;
	});

	it('should create from npmId, with filePath', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.name@1.5.3/dist/index.js');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version,
			filePath = instance.filePath;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('name');
		expect(version).to.equal('1.5.3');
		expect(filePath).to.equal('dist/index.js');
	});

	it('should create from npmId, with filePath', function () {
		var instance = ComponendId.fromNpmId('@bit/own.scope.name/dist/index.js');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version,
			filePath = instance.filePath;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('name');
		expect(version).to.be.undefined;
		expect(filePath).to.equal('dist/index.js');
	});
});

describe('bitId', function () {
	it("should create bitId", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'two']);

		var result = instance.toBitId();

		expect(result).to.equal('own.scope/namespace/two');
	});

	it("should create bitId, without fullName", function () {
		var instance = new ComponendId('own', 'scope', undefined);

		var result = instance.toBitId();

		expect(result).to.equal(undefined);
	});

	it("should create bitId, one namespace", function () {
		var instance = new ComponendId('own', 'scope', 'namespace');

		var result = instance.toBitId();

		expect(result).to.equal('own.scope/namespace');
	});

	it("should create bitId, with version", function () {
		var instance = new ComponendId('own', 'scope', 'namespace', '1.0.0');

		var result = instance.toBitId();

		expect(result).to.equal('own.scope/namespace@1.0.0');
	});

	it("should not include scopeId, even when included", function () {
		var instance = new ComponendId('own', 'scope', ['test', 'test'], '1.0.0');
		instance.scopeId = 'a5gs3g';

		var result = instance.toBitId();

		expect(result).to.equal('own.scope/test/test@1.0.0');
	});


	it('should create from bitId', function () {
		var instance = ComponendId.fromBitId('own.scope/fullName/name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('fullName', 'name');
		expect(version).to.equal(undefined);
	});
	it('should create from bitId with version', function () {
		var instance = ComponendId.fromBitId('own.scope/fullName/name@0.0.1');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('fullName', 'name');
		expect(version).to.equal('0.0.1');
	});
	it('should create from bitId', function () {
		var instance = ComponendId.fromBitId('own.scope/fullName/name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('fullName', 'name');
		expect(version).to.be.an('undefined');
	});

	it('should create from bitId, with many fullName', function () {
		var instance = ComponendId.fromBitId('own.scope/names/spaces/name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('names', 'spaces', 'name');
		expect(version).to.be.an('undefined');
	});

	it('should create from bitId, with no fullName', function () {
		var instance = ComponendId.fromBitId('own.scope/name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('name');
		expect(version).to.be.an('undefined');
	});
});

//URL:
describe('url', function () {
	it("should create url", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'two']);

		var result = instance.toUrl();

		expect(result).to.equal('own/scope/namespace/two');
	});

	it("should create url, one namespace", function () {
		var instance = new ComponendId('own', 'scope', 'namespace', '1.3.5');

		var result = instance.toUrl();

		expect(result).to.equal('own/scope/namespace');
	});

	it("should create url with more than two namespaces", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');

		var result = instance.toUrl();

		expect(result).to.equal('own/scope/namespace/name');
	});


	it("should use owner and scope names, when scramebleUsingScopeId, even when scopeId is set", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');
		instance.scopeId = '5df1dga4';

		var result = instance.toUrl();

		expect(result).to.equal('own/scope/namespace/name');
	});

	it("should create with scopeId instead of owner name and scope name, when option overrideOwnerScopeWithScopeid is true", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');
		instance.scopeId = '5df1dga4';

		var result = instance.toUrl({ overrideOwnerScopeWithScopeid: true });

		expect(result).to.equal('5df1dga4/namespace/name');
	});

	it("should create queryParams with version", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');

		var result = instance.toQueryParams({ withVersion: true });

		expect(result).to.equal('version=1.3.5');
	});

	it("should create queryParams with version by default, when 'withVersion' was not used", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');

		var result = instance.toQueryParams();

		expect(result).to.equal('version=1.3.5');
	});

	it("should create queryParams without version, when 'withVersion' is set to false", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');

		var result = instance.toQueryParams({ withVersion: false });

		expect(result).to.equal('');
	});


	it("should create pathParams with version", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');

		var result = instance.toPathParams({ withVersion: true });

		expect(result).to.equal('~v=1.3.5');
	});

	it("should create pathParams with version by default, when 'withVersion' was not used", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');

		var result = instance.toPathParams();

		expect(result).to.equal('~v=1.3.5');
	});

	it("should create pathParams without version, when 'withVersion' is set to false", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'name'], '1.3.5');

		var result = instance.toPathParams({ withVersion: false });

		expect(result).to.equal('');
	});

	it('should create from url, with many fullName', function () {
		var instance = ComponendId.fromUrl('own/scope/names/spaces');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('names', 'spaces');
		expect(version).to.be.undefined;
	});

	it('should create from url, with one namespace', function () {
		var instance = ComponendId.fromUrl('own/scope/name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('name');
		expect(version).to.be.undefined;

	});

	it('should create from url, when starting with leading slash', function () {
		var instance = ComponendId.fromUrl('/own/scope/name');

		var owner = instance.owner,
			scope = instance.scope,
			fullName = instance.fullName,
			version = instance.version;


		expect(owner).to.equal('own');
		expect(scope).to.equal('scope');
		expect(fullName).to.deep.include('name');
		expect(version).to.be.undefined;

	});
});

describe('fullname', function () {
	it("should create fullName", function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'two'], '1.3.5');

		var result = instance.getFullName();

		expect(result).to.equal('namespace/two');
	});

	it("should create fullName, one namespace", function () {
		var instance = new ComponendId('own', 'scope', 'namespace/name');

		var result = instance.getFullName();

		expect(result).to.equal('namespace/name');
	});
});

describe('name getter', () => {

	it('should extart name, when available', function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'shortname']);

		expect(instance.name).to.equal('shortname');
	});

	it('should extart name when fullname and array with length of one', function () {
		var instance = new ComponendId('own', 'scope', ['shortname']);

		expect(instance.name).to.equal('shortname');
	});
});

describe('nameSpace getter', () => {

	it('should extart nameSpace from fullName', function () {
		var instance = new ComponendId('own', 'scope', ['namespace', 'shortname']);

		expect(instance.nameSpace).to.deep.equal(['namespace']);
	});

	it('should return empty array when fullName array length is one', function () {
		var instance = new ComponendId('own', 'scope', ['namespace']);

		expect(instance.nameSpace).to.deep.equal([]);
	});
});

//# sourceMappingURL=componentId.spec.js.map