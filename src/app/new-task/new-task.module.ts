import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NewTaskPageRoutingModule } from './new-task-routing.module';

import { NewTaskPage } from './new-task.page';

@NgModule({
  imports: [CommonModule, IonicModule, NewTaskPageRoutingModule],
  declarations: [NewTaskPage],
})
export class NewTaskPageModule {}
