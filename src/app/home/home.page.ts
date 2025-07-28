import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService, Task } from '../services/tasks.service';
import { NewTaskPage } from '../new-task/new-task.page';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { RemoteConfigService } from '../services/remote-config.service';

registerLocaleData(localeEs, 'es');

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  toDoList: Task[] = [];
  today: Date = new Date();
  showTasksCompleted = false;

  constructor(
    private taskService: TasksService,
    public modalController: ModalController,
    private remoteConfigService: RemoteConfigService
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.toDoList = tasks;
    });

    this.onRemoteConfig();
  }

  async onRemoteConfig() {
    await this.remoteConfigService.load();
    this.showTasksCompleted = this.remoteConfigService.showCompletedTasks;
    console.log('🔍 Flag desde Firebase:', this.showTasksCompleted);
  }

  async reloadRemoteConfig() {
    await this.remoteConfigService.load();
    this.showTasksCompleted = this.remoteConfigService.showCompletedTasks;
  }

  async openAddTask() {
    const modal = await this.modalController.create({
      component: NewTaskPage,
    });
    return await modal.present();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  toggleCompleted(id: number) {
    this.taskService.toggleCompleted(id);
  }

  async editTask(task: Task) {
    const modal = await this.modalController.create({
      component: NewTaskPage,
      componentProps: {
        existingTask: task,
      },
    });
    return await modal.present();
  }
}
