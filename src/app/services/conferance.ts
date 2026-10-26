import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConferenceItem {
  id: number;
  name: string;
  date: string;
  place: string;
  category?: string;
  image?: string;
  description?: string;
  capacity?: number;
}

@Injectable({
  providedIn: 'root',
})
export class Conferance {
  private apiUrl = '/conferances';

  private http = inject(HttpClient);

  getAll(): Observable<ConferenceItem[]> {
    return this.http.get<ConferenceItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<ConferenceItem> {
    return this.http.get<ConferenceItem>(`${this.apiUrl}/${id}`);
  }

  addConferance(conference: Omit<ConferenceItem, 'id'>): Observable<ConferenceItem> {
    return this.http.post<ConferenceItem>(this.apiUrl, conference);
  }

  updateConferance(id: number, conference: ConferenceItem): Observable<ConferenceItem> {
    return this.http.put<ConferenceItem>(`${this.apiUrl}/${id}`, conference);
  }

  deleteConferance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
