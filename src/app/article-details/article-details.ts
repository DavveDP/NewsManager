import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-article-details',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './article-details.html',
  styleUrl: './article-details.css'
})


export class ArticleDetails implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot?.paramMap.get('id');
    console.log('viewing article', id);
  }
}



