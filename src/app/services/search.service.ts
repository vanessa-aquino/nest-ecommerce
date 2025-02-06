import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  private categorySubject = new BehaviorSubject<string>('all');

  searchTerm$ = this.searchSubject.asObservable();
  selectedCategory$ = this.categorySubject.asObservable();

  updateSearchTerm(term: string): void {
    this.searchSubject.next(term);
  };

  updateCategory(category: string): void {
    this.categorySubject.next(category);
  };

}
