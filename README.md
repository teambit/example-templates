# Example Templates

Automatic boilerplate to generate default examples.  
This is used by the bit.dev component playground, when creating a new example draft.  
![screenshot](./screenshot.png)

## Existing templates:
* [react](./components/template/react/react-template.ts) (most of the code is [here](./components/default-generator/react/react/react-default-code.ts))
* [react-native](./components/template/react-native/index.ts)
* [angular](./components/template/angular/ng-template-generator.ts)
* [vue](./components/template/vue/vue-template.ts) (most of code is [here](./components/default-generator/vue/vue-default-code.ts))

## Template API:
A template component should export the following interface  
(Currently, components use different names for exports, but they will be unified in the future)

```tsx
mainFile: string;
makeTemplate: ({ npmId: string }) => {
	files: { [filepath: string]: string };
	mainFile: string;
};
```

Example values:
```tsx
export const mainFile = "index.js";
export const makeTemplate = ({npmId}) => (`
	import Component from ${npmId}
	
	export default () => Component();
`)
```

## Tests
All templates must be must be tested! Verify indentation and syntax.  
Run bit test to automatically test modified components:
```bash
bit test
```

Also from package.json:
```bash
yarn test #same
```

Each component was written in a different time, so they may have different testers, and using Bit is crucial.  
Feel free to update the tester ([mocha](bit.envs/testers/mocha) is probably the best option)

## Pull requests
Requests are welcome!  

After approval, I will manually tag each change, and redeploy bit.dev's Playground with the latest templates. 🍻

Please verify:
* `bit test` passes
* `bit build` is successful