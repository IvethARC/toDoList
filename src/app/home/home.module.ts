import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PriorityColorPipe } from '../pipes/priority-color.pipe';
import { CategoryIconPipe } from '../pipes/categories-icon.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    PriorityColorPipe,
    CategoryIconPipe,
    FormsModule,
  ],
})
export class HomePageModule {}
