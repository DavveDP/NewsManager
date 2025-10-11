import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Article } from '../../interfaces/article';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-article-list',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './article-list.html',
  styleUrl: './article-list.css'
})



export class ArticleList {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  deleteArticles: boolean = false;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.filteredArticles = data;
        this.categories = ['All', ...Array.from(new Set(data.map(article => article.category)))]
      },
      error: (err) => {
        console.error('Failed to load articles', err);
      }
    });
  }

  deleteArticle(articleId: number): void {
    this.newsService.deleteArticle(articleId).subscribe({
      next: () => {
        this.articles = this.articles.filter(article => article.id !== articleId);
        this.filteredArticles = this.filteredArticles.filter(article => article.id !== articleId);
      },
      error: (err) => {
        console.error('Failed to delete article', err);
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredArticles = this.articles;
    } else {
      this.filteredArticles = this.articles.filter(article => article.category === category);
    }
  }

  isLoggedIn = true; // Set to true to simulate a logged-in user for testing purposes
}
