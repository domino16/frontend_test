import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { CloseComponentIfClickedOutsideDirective } from '../../directives/close-component-if-clicked-outside.directive';
import { Content } from '../../models/content';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-settings-popup',
  standalone: true,
  imports: [
    CloseComponentIfClickedOutsideDirective,
    FormsModule,
    CdkDropList,
    CdkDrag,
    NgStyle
  ],
  templateUrl: './settings-popup.component.html',
  styleUrl: './settings-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPopupComponent implements OnInit {
  private readonly dataService = inject(DataService);

  closePopup() {
    this.dataService.closeSettingsPopup();
  }
  contents: Content[] = [];
  newContent: string = '';
  editedContent: string = '';
  editIndex: number | null = null;

  ngOnInit() {
    this.refreshContents();
  }

  addContent() {
    if (this.newContent.trim()) {
      this.dataService.addContent(this.newContent);
      this.newContent = '';
      this.refreshContents();
    }
  }

  editContent(index: number) {
    this.editIndex = index;
    this.editedContent = this.contents[index].description;
  }

  saveEditedContent() {
    if (this.editIndex !== null && this.editedContent.trim()) {
      this.dataService.editContent(this.editIndex, this.editedContent);
      this.editIndex = null;
      this.editedContent = '';
      this.refreshContents();
    }
  }

  deleteContent(index: number) {
    this.dataService.deleteContent(index);
    this.refreshContents();
  }

  refreshContents() {
    this.contents = this.dataService.getContents();
  }

  drop(event: CdkDragDrop<Content[]>) {
    this.editIndex = null;

    moveItemInArray(
      this.dataService.contents,
      event.previousIndex,
      event.currentIndex
    );
  }
}
