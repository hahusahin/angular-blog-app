import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  @Input() totalCount = 0;
  @Input() limit = 20;
  @Input() currentPage = 1;
  @Input() url = '';

  pages: number[] = [];

  ngOnInit(): void {
    const pageCount = Math.ceil(this.totalCount / this.limit);
    this.pages = [...Array(pageCount).keys()].map((i) => i + 1);
  }

  onPageClick(page: number) {
    const queryParams = { ...this.route.snapshot.queryParams, page };
    this.router.navigate([this.url], { queryParams });
  }
}
