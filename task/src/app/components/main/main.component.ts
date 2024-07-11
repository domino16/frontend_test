import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirstBlockComponent } from "./first-block/first-block.component";
import { SecondBlockComponent } from "./second-block/second-block.component";
import { ThirdBlockComponent } from "./third-block/third-block.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FirstBlockComponent, SecondBlockComponent, ThirdBlockComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MainComponent {

}
