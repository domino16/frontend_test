import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-second-block',
  standalone: true,
  imports: [],
  templateUrl: './second-block.component.html',
  styleUrl: './second-block.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SecondBlockComponent {

}