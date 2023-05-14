import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { CarouselModule } from 'primeng/carousel';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics.component';
import { ComicsListComponent } from './pages/comics-list/comics-list.component';
import { ComicsDetailComponent } from './pages/comics-detail/comics-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ComicsComponent, ComicsListComponent, ComicsDetailComponent],
  imports: [
    CommonModule,
    ComicsRoutingModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ChipModule,
    CarouselModule,
  ],
})
export class ComicsModule {}
