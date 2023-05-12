import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics.component';
import { ComicsListComponent } from './pages/comics-list/comics-list.component';
import { ComicsDetailComponent } from './pages/comics-detail/comics-detail.component';

@NgModule({
	declarations: [ComicsComponent, ComicsListComponent, ComicsDetailComponent],
	imports: [CommonModule, ComicsRoutingModule, CardModule],
})
export class ComicsModule {}
