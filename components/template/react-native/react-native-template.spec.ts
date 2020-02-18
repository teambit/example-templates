import { makeReactNativeTemplate } from './react-native-template';
import { expect } from 'chai';

it('should create default code', () => {
	const result = makeReactNativeTemplate({
		npmId: '@bit/bit.javascript.react-native.super-button',
	});

	const indexTsx = [
		`import React from 'react';`,
		`import { StyleSheet, View, Text } from 'react-native';`,
		`import SuperButton from '@bit/bit.javascript.react-native.super-button';`,
		``,
		`const styles = StyleSheet.create({`,
		`	container: { flex: 1 }, //etc`,
		`});`,
		``,
		`export default () => (`,
		`	<View style={styles.container}>`,
		`		<SuperButton/>`,
		`	</View>`,
		`)`,
	].join('\n');

	expect(JSON.stringify(result)).to.deep.equal(
		JSON.stringify({
			files: {
				'index.tsx': indexTsx,
			},
			mainFile: 'index.tsx',
		})
	);
});
