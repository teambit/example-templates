const parseNpm = [
	{
		description: 'should parse "react"',
		source: 'react',
		expected: { fullName: ['react'], version: undefined, registry: undefined, filePath: undefined }
	},
	{
		source: 'react@16.4.3',
		expected: { fullName: ['react'], version: '16.4.3', registry: undefined, filePath: undefined }
	},
	{
		source: 'react@~16.4.3',
		expected: { fullName: ['react'], version: '~16.4.3', registry: undefined, filePath: undefined }
	},
	{
		source: '@material-ui/react',
		expected: { fullName: ['react'], version: undefined, registry: 'material-ui', filePath: undefined }
	},
	{
		source: '@material-ui/react@16.0.4',
		expected: { fullName: ['react'], version: '16.0.4', registry: 'material-ui', filePath: undefined }
	},
	{
		source: '@material-ui/react@~16.0.4',
		expected: { fullName: ['react'], version: '~16.0.4', registry: 'material-ui', filePath: undefined }
	},
	{
		source: 'react/dist/file.js',
		expected: { fullName: ['react'], version: undefined, registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: 'react@16.4.3/dist/file.js',
		expected: { fullName: ['react'], version: '16.4.3', registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: 'react@~16.4.3/dist/file.js',
		expected: { fullName: ['react'], version: '~16.4.3', registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@16.0.4/dist/file.js',
		expected: { fullName: ['react'], version: '16.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@~16.0.4/dist/file.js',
		expected: { fullName: ['react'], version: '~16.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@>=2.0.4/dist/file.js',
		expected: { fullName: ['react'], version: '>=2.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@>=1.0.0,<2.0.0/dist/file.js',
		expected: { fullName: ['react'], version: '>=1.0.0,<2.0.0', registry: 'material-ui', filePath: 'dist/file.js' }
	}
];

const toNpm = [
	//////////////////////////////////////////////////
	// includeVersion: false, includeFilePath: true //
	//////////////////////////////////////////////////
	{
		source: 'react',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: undefined, registry: undefined, filePath: undefined }
	},
	{
		source: 'react@16.4.3',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '16.4.3', registry: undefined, filePath: undefined }
	},
	{
		source: 'react@~16.4.3',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '~16.4.3', registry: undefined, filePath: undefined }
	},
	{
		source: '@material-ui/react',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: undefined, registry: 'material-ui', filePath: undefined }
	},
	{
		source: '@material-ui/react@16.0.4',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '16.0.4', registry: 'material-ui', filePath: undefined }
	},
	{
		source: '@material-ui/react@~16.0.4',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '~16.0.4', registry: 'material-ui', filePath: undefined }
	},
	{
		source: 'react/dist/file.js',
		expectedOutput: 'react/dist/file.js',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: undefined, registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: 'react@16.4.3/dist/file.js',
		expectedOutput: 'react/dist/file.js',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '16.4.3', registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: 'react@~16.4.3/dist/file.js',
		expectedOutput: 'react/dist/file.js',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '~16.4.3', registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@16.0.4/dist/file.js',
		expectedOutput: '@material-ui/react/dist/file.js',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '16.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@~16.0.4/dist/file.js',
		expectedOutput: '@material-ui/react/dist/file.js',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '~16.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},

	{
		source: '@material-ui/react@>=2.0.4/dist/file.js',
		expectedOutput: '@material-ui/react/dist/file.js',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '>=2.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@>=1.0.0,<2.0.0/dist/file.js',
		expectedOutput: '@material-ui/react/dist/file.js',
		outputOptions: { includeVersion: false, includeFilePath: true },
		expected: { fullName: ['react'], version: '>=1.0.0,<2.0.0', registry: 'material-ui', filePath: 'dist/file.js' }
	},

	/////////////////////////////
	// includeFilePath: false //
	////////////////////////////
	{
		source: 'react',
		expectedOutput: 'react',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: undefined, registry: undefined, filePath: undefined }
	},
	{
		source: 'react@16.4.3',
		expectedOutput: 'react@16.4.3',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '16.4.3', registry: undefined, filePath: undefined }
	},
	{
		source: 'react@~16.4.3',
		expectedOutput: 'react@~16.4.3',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '~16.4.3', registry: undefined, filePath: undefined }
	},
	{
		source: '@material-ui/react',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: undefined, registry: 'material-ui', filePath: undefined }
	},
	{
		source: '@material-ui/react@16.0.4',
		expectedOutput: '@material-ui/react@16.0.4',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '16.0.4', registry: 'material-ui', filePath: undefined }
	},
	{
		source: '@material-ui/react@~16.0.4',
		expectedOutput: '@material-ui/react@~16.0.4',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '~16.0.4', registry: 'material-ui', filePath: undefined }
	},
	{
		source: 'react/dist/file.js',
		expectedOutput: 'react',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: undefined, registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: 'react@16.4.3/dist/file.js',
		expectedOutput: 'react@16.4.3',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '16.4.3', registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: 'react@~16.4.3/dist/file.js',
		expectedOutput: 'react@~16.4.3',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '~16.4.3', registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@16.0.4/dist/file.js',
		expectedOutput: '@material-ui/react@16.0.4',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '16.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@~16.0.4/dist/file.js',
		expectedOutput: '@material-ui/react@~16.0.4',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '~16.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@>=2.0.4/dist/file.js',
		expectedOutput: '@material-ui/react@>=2.0.4',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '>=2.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@>=1.0.0,<2.0.0/dist/file.js',
		expectedOutput: '@material-ui/react@>=1.0.0,<2.0.0',
		outputOptions: { includeFilePath: false },
		expected: { fullName: ['react'], version: '>=1.0.0,<2.0.0', registry: 'material-ui', filePath: 'dist/file.js' }
	},

	//////////////////////////////////////////////////////
	// includeVersion: false and includeFilePath: false //
	//////////////////////////////////////////////////////
	{
		source: 'react',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: undefined, registry: undefined, filePath: undefined }
	},
	{
		source: 'react@16.4.3',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '16.4.3', registry: undefined, filePath: undefined }
	},
	{
		source: 'react@~16.4.3',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '~16.4.3', registry: undefined, filePath: undefined }
	},
	{
		source: '@material-ui/react',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: undefined, registry: 'material-ui', filePath: undefined }
	},
	{
		source: '@material-ui/react@16.0.4',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '16.0.4', registry: 'material-ui', filePath: undefined }
	},
	{
		source: '@material-ui/react@~16.0.4',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '~16.0.4', registry: 'material-ui', filePath: undefined }
	},
	{
		source: 'react/dist/file.js',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: undefined, registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: 'react@16.4.3/dist/file.js',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '16.4.3', registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: 'react@~16.4.3/dist/file.js',
		expectedOutput: 'react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '~16.4.3', registry: undefined, filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@16.0.4/dist/file.js',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '16.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@~16.0.4/dist/file.js',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '~16.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@>=2.0.4/dist/file.js',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '>=2.0.4', registry: 'material-ui', filePath: 'dist/file.js' }
	},
	{
		source: '@material-ui/react@>=1.0.0,<2.0.0/dist/file.js',
		expectedOutput: '@material-ui/react',
		outputOptions: { includeVersion: false, includeFilePath: false },
		expected: { fullName: ['react'], version: '>=1.0.0,<2.0.0', registry: 'material-ui', filePath: 'dist/file.js' }
	},
]


module.exports = {
	parseNpm: parseNpm,
	toNpm: toNpm
};
