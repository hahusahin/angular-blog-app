import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import { combineLatest } from 'rxjs';
import {
  selectTagsData,
  selectTagsError,
  selectTagsIsLoading,
} from './store/reducer';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatusWrapperComponent } from '../shared/components/status-wrapper/status-wrapper.component';

@Component({
  selector: 'mc-popular-tags',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusWrapperComponent],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.css',
})
export class PopularTagsComponent implements OnInit {
  constructor(private store: Store) {}

  data$ = combineLatest({
    tags: this.store.select(selectTagsData),
    isLoading: this.store.select(selectTagsIsLoading),
    error: this.store.select(selectTagsError),
  });

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getTags());
  }
}
