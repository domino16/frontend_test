import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,

  WritableSignal,
} from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { Content } from '../../../models/content';
import { AlphabeticSortPipe } from '../../alphabetic-sort.pipe';

@Component({
  selector: 'app-third-block',
  standalone: true,
  imports: [AlphabeticSortPipe],
  templateUrl: './third-block.component.html',
  styleUrl: './third-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdBlockComponent{
  private readonly dataService = inject(DataService);

  contentToViewArray: WritableSignal<Content[]> = this.dataService.contentToViewArray

}
