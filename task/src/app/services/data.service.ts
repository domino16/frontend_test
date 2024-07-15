import { HttpClient } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { first, map, Observable, Subject, tap } from 'rxjs';
import { Content } from '../components/models/content';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);

  private usedContentIds: number[] = [1, 2];

  isSettingsPopupOpen: WritableSignal<boolean> = signal(false);
  contentToViewArray: WritableSignal<Content[]> = signal([]); // viewed content in third block
  currentOption: WritableSignal<'first' | 'second' | 'third'> = signal('first');
  myName: WritableSignal<string> = signal('');

  jsonPath = 'src/assets/task.json';
  storageContentKey = 'contentData';
  storageViewedContentKey = 'viewedContentData';
  contents: Content[] = []; //all content in storage

  contentToViewArrayEffect = effect(() => {
    this.saveViewedContents();
  });

  constructor() {
    this.loadContents();
    this.getViewedContents();
  }

  fetchDataFromJson(): Observable<Content[]> {
    return this.http.get<{ items: Content[] }>('assets/task.json').pipe(
      map((data) => data.items),
      tap((contents) => {
        this.contents = contents;
        this.contentToViewArray.set([this.contents[0]]);
        this.saveContents();
      })
    );
  }

  loadContents() {
    const data = localStorage.getItem(this.storageContentKey);
    if (data) {
      this.contents = JSON.parse(data);
      this.contentToViewArray.set([this.contents[0]]);
    } else {
      this.fetchDataFromJson().subscribe();
    }
  }

  saveContents() {
    localStorage.setItem(this.storageContentKey, JSON.stringify(this.contents));
  }

  getContents(): Content[] {
    return this.contents;
  }

  saveViewedContents() {
    localStorage.setItem(
      this.storageViewedContentKey,
      JSON.stringify(this.contentToViewArray())
    );
  }

  getViewedContents() {
    const data = localStorage.getItem(this.storageViewedContentKey);
    if (data) {
      this.contentToViewArray.set(JSON.parse(data));
    } else {
      this.contentToViewArray.set([this.contents[0]]);
    }
  }

  addContent(content: string) {
    const newContent: Content = {
      id: this.contents.length + 1,
      description: content,
    };
    this.contents.push(newContent);
    this.saveContents();
  }

  editContent(index: number, content: string) {
    this.contents[index].description = content;
    this.saveContents();
  }

  deleteContent(index: number) {
    this.contents.splice(index, 1);
    this.saveContents();
  }

  getRandomContent(): Content | null {
    const unusedContents = this.contents.filter(
      (item) => !this.usedContentIds.includes(item.id)
    );

    if (unusedContents.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * (unusedContents.length)) ;
    const randomContent = unusedContents[randomIndex];
    this.usedContentIds.push(randomContent.id);
    this.saveContents();
    return randomContent;
  }

  resetUsedContent() {
    this.usedContentIds = [1, 2];
    this.saveContents();
  }

  onReplaceBtnClick() {
    this.resetUsedContent();
    let content: Content | null;
    switch (this.currentOption()) {
      case 'first':
        content = this.contents[0];
        break;
      case 'second':
        content = this.contents[1];
        break;
      case 'third':
        content = this.getRandomContent();
        break;
    }

    this.contentToViewArray.set([]);
    if (content) this.contentToViewArray.update(() => [content]);
  }

  onAddBtnClick() {
    let content: Content | null;
    switch (this.currentOption()) {
      case 'first':
        content = this.contents[0];
        break;
      case 'second':
        content = this.contents[1];
        break;
      case 'third':
        content = this.getRandomContent();

        break;
    }

    content
      ? this.contentToViewArray.update((array) => [...array, content])
      : alert(
          'Wszystkie możliwe do wylosowania teksty zostały użyte, Zastąp lub dodaj tekst'
        );
  }

  onAddNameToHeaderBtnClick() {
    this.myName.set('Dominik Pietrzyk');
  }

  resetPage() {
    this.fetchDataFromJson().subscribe(); 
    this.currentOption.set('first');
    this.contentToViewArray.set([this.contents[0]]);
    this.myName.set('');
   this.resetUsedContent();
  }

  closeSettingsPopup() {
    this.isSettingsPopupOpen.set(false);
  }

  openSettingsPopup() {
    this.isSettingsPopupOpen.set(true);
  }
}
