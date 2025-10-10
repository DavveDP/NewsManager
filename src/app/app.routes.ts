import { Routes } from '@angular/router';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleDetailsComponent } from './articles/article-details/article-details.component';
import { ArticleEditionComponent } from './articles/article-edition/article-edition.component';

export const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'articles/edit/:id', component: ArticleEditionComponent },
  { path: 'articles/create', component: ArticleEditionComponent }
];

