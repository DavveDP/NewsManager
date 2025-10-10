// mock service for articles
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class NewsMockService {
  private initial: Article[] = [
    {
      id: 1,
      title: 'sample news',
      subtitle: 'sample news subtitle',
      abstract: 'short abstract of the sample news',
      body: '<p>this is the body of the sample news HTML。</p>',
      category: 'Technology',
      image_data: null,
      image_media_type: null,
      update_date: new Date().toISOString(),
      modified_by: 'mock-user'
    },
    {
      id: 2,
      title: 'sports event highlights',
      subtitle: 'local team wins',
      abstract: 'local team wins +++++。',
      body: '<p>game details</p>',
      category: 'Sports',
      image_data: null,
      image_media_type: null,
      update_date: new Date().toISOString(),
      modified_by: 'mock-user'
    }
  ];

  private articles$ = new BehaviorSubject<Article[]>([...this.initial]);

  constructor() {}

  getArticles(): Observable<Article[]> {
    return this.articles$.asObservable();
  }

  getMockArticles(): Article[] {
    return [...this.articles$.getValue()];
  }

  getArticleById(id: number): Observable<Article> {
    const a = this.articles$.getValue().find(x => x.id === id);
    if (a) return of(a);
    return throwError(() => new Error('Article not found'));
  }

  createArticle(article: Article): Observable<Article> {
    const current = this.articles$.getValue();
    const newId = current.length ? Math.max(...current.map(x => x.id || 0)) + 1 : 1;
    const created: Article = {
      ...article,
      id: newId,
      update_date: new Date().toISOString(),
      modified_by: 'mock-user'
    };
    this.articles$.next([created, ...current]);
    return of(created);
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    const current = this.articles$.getValue();
    const idx = current.findIndex(x => x.id === id);
    if (idx === -1) return throwError(() => new Error('Article not found for update'));
    const updated: Article = {
      ...current[idx],
      ...article,
      id,
      update_date: new Date().toISOString(),
      modified_by: 'mock-user'
    };
    current[idx] = updated;
    this.articles$.next([...current]);
    return of(updated);
  }

  deleteArticle(id: number): Observable<void> {
    const current = this.articles$.getValue();
    const newList = current.filter(x => x.id !== id);
    this.articles$.next(newList);
    return of(void 0);
  }
}
