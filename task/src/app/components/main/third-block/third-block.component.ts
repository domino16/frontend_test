import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { Content } from '../../../models/content';

@Component({
  selector: 'app-third-block',
  standalone: true,
  imports: [],
  templateUrl: './third-block.component.html',
  styleUrl: './third-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdBlockComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly dataService = inject(DataService);

  replaceTextBtnListenerSubscription!: Subscription;
  addTextBtnListenerSubscription!: Subscription;
  usedIndexesArray: number[] = [];

  @ViewChild('displayElement') displayElementRef!: ElementRef;

  ngOnInit(): void {
    this.handleTextOnAddClick();
    this.handleTextOnReplaceClick();
    
  }

  ngAfterViewInit(): void {
    this.updateContent(this.dataService.contents[0].description);
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

        this.updateContent(content!.description);
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
          ? this.appendContent(content.description)
          : alert('Wszystkie teksty zostały użyte, Zastąp lub dodaj tekst');
      });
  }

  updateContent(content: string) {
    const displayElement = this.displayElementRef.nativeElement;
    if (displayElement) {
      while (displayElement.firstChild) {
        displayElement.removeChild(displayElement.firstChild);
      }

      const newContent = document.createElement('div');
      newContent.innerHTML = content;

      displayElement.appendChild(newContent);
    }
  }

  appendContent(content: string) {
    const displayElement = this.displayElementRef.nativeElement;
    if (displayElement) {
      const newContent = document.createElement('div');
      newContent.innerHTML = content;
      displayElement.appendChild(newContent);
    }
  }

  ngOnDestroy(): void {
    this.addTextBtnListenerSubscription.unsubscribe();
    this.replaceTextBtnListenerSubscription.unsubscribe();
  }
}
