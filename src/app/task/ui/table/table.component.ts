import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Task, TaskService } from '../../data-access/task.service';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  tasks = input.required<Task[]>();

  private _taskService = inject(TaskService);

  async deleteTask(id: string) {
    if (!confirm('¿Seguro que deseas eliminar esta tarea?')) return;
    try {
      await this._taskService.delete(id);
      toast.success('Tarea eliminada correctamente');
      // Si usas signals o un observable para tasks, se actualizará solo.
      // Si no, deberías refrescar la lista manualmente aquí.
    } catch (error) {
      toast.error('Error al eliminar la tarea');
      console.error(error);
    }
  }
}
