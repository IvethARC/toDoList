import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TasksService, Task } from '../services/tasks.service';
import { NewTaskPage } from '../new-task/new-task.page';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { RemoteConfigService } from '../services/remote-config.service';
import { CategoriesService } from '../services/categories.service';

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
  allCategories: string[] = [];
  selectedCategory: string = 'Todas';

  constructor(
    private taskService: TasksService,
    public modalController: ModalController,
    private remoteConfigService: RemoteConfigService,
    private cdr: ChangeDetectorRef,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.toDoList = tasks;
      this.onRemoteConfig();
    });

    this.allCategories = [
      'Todas',
      ...this.categoriesService.getAllCategories(),
    ];
  }

  async onRemoteConfig() {
    await this.remoteConfigService.load();
    this.showTasksCompleted = this.remoteConfigService.showCompletedTasks;
    this.cdr.detectChanges();
  }

  async reloadRemoteConfig() {
    await this.remoteConfigService.load();
    this.showTasksCompleted = this.remoteConfigService.showCompletedTasks;
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
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

  get filteredTasks(): Task[] {
    if (this.selectedCategory === 'Todas') {
      return this.toDoList;
    }

    return this.toDoList.filter(
      (task) => task.category === this.selectedCategory
    );
  }

  trackByCategory(index: number, cat: string): string {
    return cat;
  }
}
