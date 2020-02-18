'use strict';
const chai = require('chai');
var expect = chai.expect;

var NpmId = require('./index');

const { parseNpm, toNpm } = require('./test-cases');

describe('ctor', function () {
	it('should instaciate', function () {
		var instance = new NpmId('react');

		expect(instance).to.not.be.undefined;

		const { fullName, version } = instance;

		expect(fullName).to.deep.equal(['react']);
		expect(version).to.be.undefined;
	});

	it('should instaciate, with version', function () {
		var instance = new NpmId('react', '16.4.3');

		expect(instance).to.not.be.undefined;

		const { fullName, version } = instance;

		expect(fullName).to.deep.equal(['react']);
		expect(version).to.equal('16.4.3');
	});
});

describe('npmId:', function () {
	parseNpm.forEach(function ({ source, expected, }) {
		it(`should parse '${source}'`, function () {
			const instance = NpmId.fromNpmId(source);

			if (expected === undefined) {
				return expect(instance).to.be.undefined;
			}

			expect(instance).not.to.be.undefined;

			Object.keys(expected).forEach(key => {
				expect(instance[key]).to.deep.equal(expected[key]);
			});
		});
	});

	toNpm.forEach(function ({ source, expectedOutput, outputOptions }) {
		it(`should write '${expectedOutput}', when ${JSON.stringify(outputOptions)}`, function () {
			const instance = NpmId.fromNpmId(source);

			const output = instance.toNpmId(outputOptions);

			expect(output).to.deep.equal(expectedOutput)
		});
	});
});

describe('url', function () {
	it("should create url", function () {
		var instance = new NpmId('react');

		var result = instance.toUrl();

		expect(result).to.equal('react');
	});

	it("should create url, not including version", function () {
		var instance = new NpmId('react', '16.4.3');

		var result = instance.toUrl();

		expect(result).to.equal('react');
	});

	it("should create url", function () {
		var instance = new NpmId('react');

		var result = instance.toUrl();

		expect(result).to.equal('react');
	});

	it("should create url, with registry", function () {
		var instance = new NpmId('core', '1.5.3');
		instance.registry = 'material-ui';

		var result = instance.toUrl();

		expect(result).to.equal('@material-ui/core');
	});

	it("should create queryParams", function () {
		var instance = new NpmId('react', '16.4.3');

		var result = instance.toQueryParams();

		expect(result).to.equal('version=16.4.3');
	});

	it("should create queryParams, withVersion false", function () {
		var instance = new NpmId('react', '16.4.3');

		var result = instance.toQueryParams({ withVersion: false });

		expect(result).to.equal('');
	});

	it("should create pathParams", function () {
		var instance = new NpmId('react', '16.4.3');

		var result = instance.toPathParams();

		expect(result).to.equal('~v=16.4.3');
	});

	it("should create pathParams, withVersion false", function () {
		var instance = new NpmId('react', '16.4.3');

		var result = instance.toPathParams({ withVersion: false });

		expect(result).to.equal('');
	});

	it("should create from url", function () {
		var result = NpmId.fromUrl('react');

		expect(result).not.to.be.undefined;

		expect(result.fullName).to.deep.equal(['react']);
	});

	it("should create from url, with registry", function () {
		var result = NpmId.fromUrl('@material-ui/core');

		expect(result).not.to.be.undefined;

		expect(result.fullName).to.deep.equal(['core']);
		expect(result.registry).to.equal('material-ui');
	});

	it("should create from url, with registry and version", function () {
		var result = NpmId.fromUrl('@material-ui/core', { version: '16.2.2' });

		expect(result).not.to.be.undefined;

		expect(result.fullName).to.deep.equal(['core']);
		expect(result.registry).to.equal('material-ui');
		expect(result.version).to.equal('16.2.2');
	});

	it("should create from url, with version", function () {
		var result = NpmId.fromUrl('react', { version: '16.4.3' });

		expect(result).not.to.be.undefined;

		expect(result.fullName).to.deep.equal(['react']);
		expect(result.version).to.equal('16.4.3');
	});
});

describe('fullName', function () {
	it("should create fullName", function () {
		var instance = new NpmId('react', '16.1.3');

		var result = instance.getFullname();

		expect(result).to.equal('react');
	});
});

describe('name getter', function () {
	it('should return name', function () {
		var instance = new NpmId('react', '16.3.2');

		expect(instance.name).to.equal('react');
	});
});

describe('nameSpace getter', () => {
	it('should return empty namespace', function () {
		var instance = new NpmId('react', '16.3.2');

		expect(instance.nameSpace).to.deep.equal([]);
	});
});
