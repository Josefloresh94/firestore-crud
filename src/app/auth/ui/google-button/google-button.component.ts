import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-google-button',
  imports: [],
  templateUrl: './google-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleButtonComponent {
  clicked = output<void>();
}
