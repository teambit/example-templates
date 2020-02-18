import {
	canonizeNpmId,
	toCanonicalClassName,
} from '@bit/bit.javascript.default-generator.canonize';

export const mainFile = 'app.module.ts';

export function makeAngularTemplate({ npmId }: { npmId?: string } = {}) {
	return {
		files: {
			'app.component.html': html,
			'app.component.scss': css,
			'app.component.ts': ts,
			'app.module.ts': genAppModule({ npmId }),
		},
		mainFile: mainFile,
	};
}

function genAppModule({ npmId }) {
	const moduleName = `${toCanonicalClassName(npmId)}Module`;
	const moduleId = canonizeNpmId(npmId);

	return `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
${npmId ? `import { ${moduleName} } from '${moduleId}';` : ''}

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		${moduleName ? moduleName : ''}
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }`;
}

const html = `<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
	<img width="46" alt="Angular Logo" style="margin-bottom: 29px"
		src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
	>
	<div style="font-size: 17px; color: #414141; font-family: sans-serif; line-height: 1.61;">
		Start editing <b><i>app.component.html</i></b> to see your example rendered.
		<br/>
		Click save when ready.
	</div>
</div>
`;

const ts = `import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'capsule';
}
`;

const css = ``;
