// not the real one, just for testing
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../article.model';
import { NewsMockService } from '../news-mock.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Mock Article List</h2>
    <ul>
      <li *ngFor="let article of articles">
        <a [routerLink]="['/articles', article.id]">{{ article.title }}</a>
      </li>
    </ul>
  `
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private newsService: NewsMockService) {}

  ngOnInit(): void {
    this.articles = this.newsService.getMockArticles();
  }
}
