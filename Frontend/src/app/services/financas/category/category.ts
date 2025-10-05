import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Subcategory {
  id: number;
  name: string;
  category_id: number;
  user_id: number | null;
}

export interface Category {
  id: number;
  name: string;
  type: string;
  user_id: number | null;
  subcategories: Subcategory[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:80/api/categories';

  constructor(private http: HttpClient){}

  getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }

  create(data: { name: string; type?: string }) {
  return this.http.post<Category>(this.apiUrl, data);
  }
  
  update(id: number, data: { name: string; type?: string }) {
  return this.http.put(`${this.apiUrl}/${id}`, data);
  } 

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`,{ withCredentials: true });
  }

  createSubcategory(data: { name: string; category_id: number }) {
    return this.http.post(this.apiUrl.replace('categories', 'subcategories'), data);
  }

  updateSubcategory(id: number, data: { name: string }) {
    return this.http.put(this.apiUrl.replace('categories', 'subcategories') + `/${id}`, data);
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete(this.apiUrl.replace('categories', 'subcategories') + `/${id}`, { withCredentials: true });
  }
 
  restoreDefaultCategories(): Observable<any> {
    return this.http.post(`${this.apiUrl}/restore-defaults`, {withCredentials: true });
  }

}