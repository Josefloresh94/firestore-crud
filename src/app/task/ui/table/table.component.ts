import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Task } from '../../data-access/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  tasks = input.required<Task[]>();
}
