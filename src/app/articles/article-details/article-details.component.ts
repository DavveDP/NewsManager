import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NewsMockService } from '../news-mock.service';
import { Article } from '../article.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | null = null;
  safeBody: SafeHtml | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsMockService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (!idStr) {
        this.error = 'no article id';
        return;
      }
      const id = Number(idStr);
      if (isNaN(id)) {
        this.error = 'invalid article id';
        return;
      }
      this.loadArticle(id);
    });
  }

  loadArticle(id: number) {
    this.loading = true;
    this.error = null;
    this.newsService.getArticleById(id)
      .pipe(
        catchError(err => {
          this.error = 'fail to load article：' + (err?.message || '');
          this.loading = false;
          return of(null);
        })
      )
      .subscribe((a) => {
        if (!a) return;
        this.article = a;
        this.safeBody = this.sanitizer.bypassSecurityTrustHtml(a.body || '');
        this.loading = false;
      });
  }

  goBack() {
    this.router.navigate(['/articles']);
  }
}
