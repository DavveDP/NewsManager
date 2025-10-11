import { Routes } from '@angular/router';
import { ArticleList } from './components/article-list/article-list';
import { ArticleDetails } from './article-details/article-details';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'articles'
  },
  {
    path: 'articles',
    component: ArticleList
  },
  {
    path: 'articles/:id',
    component: ArticleDetails
  }
];
