import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewTaskPageRoutingModule } from './new-task-routing.module';
import { NewTaskPage } from './new-task.page';
import { PriorityColorPipe } from '../pipes/priority-color.pipe';

@NgModule({
  declarations: [NewTaskPage],
  imports: [
    CommonModule,
    IonicModule,
    NewTaskPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PriorityColorPipe,
  ],
})
export class NewTaskPageModule {}
