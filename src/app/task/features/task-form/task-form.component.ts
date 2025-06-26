import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _route = inject(Router);

  loading = signal(false);

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      this.loading.set(true);
      const { title, completed } = this.form.value;

      const task: TaskCreate = {
        title: title || '',
        completed: !!completed,
      };

      await this._taskService.create(task);

      toast.success('Tarea creada con éxito!');
      this._route.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error al crear la tarea. Por favor, inténtalo de nuevo.');
      console.error('Error al crear la tarea:', error);
    } finally {
      this.loading.set(false);
      this.form.reset();
    }
  }
}
