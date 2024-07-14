import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { first, map, Observable, Subject, tap } from 'rxjs';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);

  private addClickSubject = new Subject<void>();
  private replaceClickSubject = new Subject<void>();
  private resetPageSubject = new Subject<void>();
  private addNameToHeaderSubject = new Subject<string>();
  private usedContentIds: number[] = [1, 2];

  addClickEvent$ = this.addClickSubject.asObservable();
  replaceClickEvent$ = this.replaceClickSubject.asObservable();
  resetPageClickEvent$ = this.resetPageSubject.asObservable();
  addNameToHeaderEvent$ = this.addNameToHeaderSubject.asObservable();

  jsonPath = 'src/assets/task.json';
  storageKey = 'contentData';
  contents: Content[] = [];
  currentOption: WritableSignal<'first' | 'second' | 'third'> = signal('first');
  myName = 'Dominik Pietrzyk';

  constructor() {
    this.loadContents();
  }

  fetchDataFromJson(): Observable<Content[]> {
    return this.http.get<{ items: Content[] }>('assets/task.json').pipe(
      map((data) => data.items),
      tap((contents) => {
        this.contents = contents;
        this.saveContents();
      })
    );
  }

  loadContents() {
    const data = localStorage.getItem(this.storageKey);
    this.replaceClickSubject.next();
    if (data) {
      this.contents = JSON.parse(data);
    } else {
      this.fetchDataFromJson().subscribe();
    }
  }

  saveContents() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.contents));
  }

  getContents(): Content[] {
    return this.contents;
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

    const randomIndex = Math.floor(Math.random() * unusedContents.length);
    const randomContent = unusedContents[randomIndex];
    this.usedContentIds.push(randomContent.id);
    this.saveContents();
    return randomContent;
  }

  resetUsedContent() {
    this.usedContentIds = [1, 2];
    this.saveContents();
  }

  handleReplaceBtnClick() {
    this.replaceClickSubject.next();
  }

  handleAddBtnClick() {
    this.addClickSubject.next();
  }

  handleAddNameToHeaderBtnClick() {
    this.addNameToHeaderSubject.next('Dominik Pietrzyk');
  }

  resetPage() {
    this.currentOption.set('first')
    this.replaceClickSubject.next();
    this.addNameToHeaderSubject.next('');
  }
}
