import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskListComponent {}
