import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PriorityColorPipe } from '../pipes/priority-color.pipe';
import { CategoryIconPipe } from '../pipes/categories-icon.pipe';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    PriorityColorPipe,
    CategoryIconPipe,
  ],
})
export class HomePageModule {}
