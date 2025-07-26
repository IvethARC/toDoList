import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { ModalController } from '@ionic/angular';
import { Task } from '../services/tasks.service';

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
    private fb: FormBuilder
  ) {
    this.priorities = this.tasksService.priorities;
    this.categories = this.tasksService.categories;

    this.myForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: [''],
      priority: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
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
}
