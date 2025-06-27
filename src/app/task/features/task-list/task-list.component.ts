import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableComponent } from '../../ui/table/table.component';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../data-access/task.service';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaskService],
})
export default class TaskListComponent {
  tasksService = inject(TaskService);
}
