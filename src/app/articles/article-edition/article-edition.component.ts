import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NewsMockService } from '../news-mock.service';
import { Article } from '../article.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-article-edition',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './article-edition.component.html',
  styleUrls: ['./article-edition.component.css']
})
export class ArticleEditionComponent implements OnInit {
  form;
  isEdit = false;
  articleId?: number;
  isSaving = false;
  imagePreview: string | null = null;
  imageError: string | null = null;

  categories = ['National', 'Economy', 'Sports', 'Technology'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsMockService
  ) {
    
    this.form = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      abstract: ['', Validators.required],
      body: [''],
      category: ['', Validators.required],
      image_data: this.fb.control<string | null>(null),
      image_media_type: this.fb.control<string | null>(null)
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const id = Number(idStr);
        if (!isNaN(id)) {
          this.isEdit = true;
          this.articleId = id;
          this.loadArticle(id);
        } else {
          this.isEdit = false;
        }
      } else {
        this.isEdit = false;
      }
    });
  }

  loadArticle(id: number) {
    this.newsService.getArticleById(id)
      .pipe(
        catchError(err => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe(a => {
        if (!a) return;
        this.form.patchValue({
          title: a.title,
          subtitle: a.subtitle,
          abstract: a.abstract,
          body: a.body,
          category: a.category,
          image_data: a.image_data,
          image_media_type: a.image_media_type
        });
        if (a.image_data && a.image_media_type) {
          this.imagePreview = `data:${a.image_media_type};base64,${a.image_data}`;
        }
      });
  }

  fileChangeEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.imageError = 'please select an image file';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string; 
      const base64 = dataUrl.split(',')[1];
      this.imagePreview = dataUrl;
      this.form.patchValue({
        image_data: base64,
        image_media_type: file.type
      });
      this.imageError = null;
    };
    reader.onerror = () => {
      this.imageError = 'file read error';
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;

    const payload: Article = {
      title: this.form.value.title || '',
      subtitle: this.form.value.subtitle || '',
      abstract: this.form.value.abstract || '',
      body: this.form.value.body || '',
      category: this.form.value.category || '',
      image_data: this.form.value.image_data ?? null,
      image_media_type: this.form.value.image_media_type ?? null
    };

    if (this.isEdit && this.articleId) {
      this.newsService.updateArticle(this.articleId, payload).subscribe({
        next: () => {
          this.isSaving = false;
          alert('Saved successfully');
          this.router.navigate(['/articles', this.articleId]);
        },
        error: (err) => {
          console.error(err);
          this.isSaving = false;
          alert('Save failed');
        }
      });
    } else {
      this.newsService.createArticle(payload).subscribe({
        next: () => {
          this.isSaving = false;
          alert('Created successfully');
          this.router.navigate(['/articles']);
        },
        error: (err) => {
          console.error(err);
          this.isSaving = false;
          alert('Create failed');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/articles']);
  }
}

