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
export class ThirdBlockComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly dataService = inject(DataService);

  replaceTextBtnListenerSubscription!: Subscription;
  addTextBtnListenerSubscription!: Subscription;
  usedIndexesArray: number[] = [];
  contentToViewArray: WritableSignal<Content[]> = signal([]);

  ngOnInit(): void {
    this.handleTextOnAddClick();
    this.handleTextOnReplaceClick();
  }

  ngAfterViewInit(): void {
    this.contentToViewArray.update(() => [this.dataService.contents[0]]);
  }

  handleTextOnReplaceClick() {
    this.replaceTextBtnListenerSubscription =
      this.dataService.replaceClickEvent$.subscribe(() => {
        this.dataService.resetUsedContent();
        let content: Content | null;
        switch (this.dataService.currentOption()) {
          case 'first':
            content = this.dataService.contents[0];
            break;
          case 'second':
            content = this.dataService.contents[1];
            break;
          case 'third':
            content = this.dataService.getRandomContent();
            break;
        }

        this.contentToViewArray.set([]) 
        if (content) this.contentToViewArray.update(()=>[content]);
      });
  }

  handleTextOnAddClick() {
    this.addTextBtnListenerSubscription =
      this.dataService.addClickEvent$.subscribe(() => {
        let content: Content | null;
        switch (this.dataService.currentOption()) {
          case 'first':
            content = this.dataService.contents[0];
            break;
          case 'second':
            content = this.dataService.contents[1];
            break;
          case 'third':
            content = this.dataService.getRandomContent();

            break;
        }

        content
          ? this.contentToViewArray.update((array) => [...array, content])
          : alert(
              'Wszystkie możliwe do wylosowania teksty zostały użyte, Zastąp lub dodaj tekst'
            );
      });
  }


  ngOnDestroy(): void {
    this.addTextBtnListenerSubscription.unsubscribe();
    this.replaceTextBtnListenerSubscription.unsubscribe();
  }
}
