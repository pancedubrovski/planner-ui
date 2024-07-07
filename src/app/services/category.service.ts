import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/Category';

export interface CategoryFilter {
  kind: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  public getCategoies(filters: any) {
    const keys = Object.keys(filters).filter(k => filters[k] != null);
    let filter: any = {};
    keys.forEach(t => filter[t] = filters[t]);

    return this.http.get<Array<Category>>(`${environment.apiUrl}v1/planner/categories`, {
      params: filter
    });


  }
}
