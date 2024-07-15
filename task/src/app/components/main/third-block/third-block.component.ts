import {
  ChangeDetectionStrategy,
  Component,
  inject,
  WritableSignal,
} from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Content } from '../../models/content';
import { AlphabeticSortPipe } from '../../pipes/alphabetic-sort.pipe';

@Component({
  selector: 'app-third-block',
  standalone: true,
  imports: [AlphabeticSortPipe],
  templateUrl: './third-block.component.html',
  styleUrl: './third-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdBlockComponent {
  private readonly dataService = inject(DataService);

  contentToViewArray: WritableSignal<Content[]> =
    this.dataService.contentToViewArray;
}
