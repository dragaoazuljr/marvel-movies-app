import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: 'comics',
		loadChildren: () =>
			import('./features/comics/comics.module').then((m) => m.ComicsModule),
	},
	{
		path: '**',
		redirectTo: '/comics',
		pathMatch: 'full',
	},
];
