import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { ModalController } from '@ionic/angular';
import { Task } from '../services/tasks.service';
import { AlertController } from '@ionic/angular';
import { CategoriesService } from '../services/categories.service';

@Component({
  standalone: false,
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  @Input() existingTask?: Task;
  priorities: string[] = [];
  categories: string[] = [];
  title: string = '';
  description: string = '';
  priority: string = '';
  category: string = '';

  customAlertOptions: any = {
    header: 'Prioridad',
    subHeader: 'Segun urgencia de ejeccuión',
    translucent: true,
  };
  customCategoryAlertOptions: any = {
    header: 'Categoria',
    subHeader: 'Seleccione el tipo de tarea',
    translucent: true,
  };

  myForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private tasksService: TasksService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private categoriesService: CategoriesService
  ) {
    this.priorities = this.tasksService.priorities;

    this.myForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: [''],
      priority: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.categories = this.categoriesService.getAllCategories();
    if (this.existingTask) {
      this.myForm.patchValue({
        taskTitle: this.existingTask.title,
        taskDescription: this.existingTask.description,
        priority: this.existingTask.priority,
        category: this.existingTask.category,
      });
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onAddNewTask() {
    if (this.myForm.invalid) {
      this.presentIncompleteAlert();
      return;
    }

    if (this.myForm.invalid) return;
    const formValues = this.myForm.value;

    const task: Task = {
      id: this.existingTask?.id || Date.now(),
      title: formValues.taskTitle,
      description: formValues.taskDescription,
      category: formValues.category,
      priority: formValues.priority,
      completed: this.existingTask?.completed || false,
    };

    if (this.existingTask) {
      this.tasksService.updateTask(task);
    } else {
      this.tasksService.addTask(task);
    }

    this.close();
  }

  async presentIncompleteAlert() {
    const alert = await this.alertController.create({
      header: 'Campos incompletos',
      message:
        'Por favor, complete todos los campos requeridos antes de continuar.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async addCategoryPrompt() {
    const alert = await this.alertController.create({
      header: 'Nueva categoría',
      inputs: [{ name: 'name', type: 'text', placeholder: 'Nombre' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: async (data) => {
            await this.categoriesService.addCategory(data.name);
            this.categories = this.categoriesService.getAllCategories();
            this.myForm.patchValue({ category: data.name });
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteCategoryPrompt() {
    const alert = await this.alertController.create({
      header: 'Eliminar categoría',
      inputs: this.categoriesService
        .getAllCategories()
        .filter((c) => !this.categoriesService.isDefault(c))
        .map((c) => ({ name: 'name', type: 'radio', label: c, value: c })),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async (value: string) => {
            await this.categoriesService.removeCategory(value);
            this.categories = this.categoriesService.getAllCategories();
            if (this.myForm.value.category === value) {
              this.myForm.patchValue({ category: 'Otros' });
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
