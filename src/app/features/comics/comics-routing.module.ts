import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsListComponent } from './pages/comics-list/comics-list.component';
import { ComicsComponent } from './comics.component';
import { ComicsDetailComponent } from './pages/comics-detail/comics-detail.component';

const routes: Routes = [
	{
		path: '',
		component: ComicsComponent,
		children: [
			{
				path: '',
				component: ComicsListComponent,
			},
			{
				path: ':id',
				component: ComicsDetailComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ComicsRoutingModule { }
