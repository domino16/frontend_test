import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-first-block',
  standalone: true,
  imports: [],
  templateUrl: './first-block.component.html',
  styleUrl: './first-block.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FirstBlockComponent {

}
