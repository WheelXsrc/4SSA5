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
  private apiUrl = 'http://localhost:3000/conferances';

  private http = inject(HttpClient);

  getAll(): Observable<ConferenceItem[]> {
    return this.http.get<ConferenceItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<ConferenceItem> {
    return this.http.get<ConferenceItem>(`${this.apiUrl}/${id}`);
  }
}
