import { Component, input, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conferance, ConferenceItem } from '../services/conferance';

@Component({
  selector: 'app-conferance-details',
  imports: [],
  templateUrl: './conferance-details.html',
  styleUrl: './conferance-details.css',
})
export class ConferanceDetails implements OnInit {
  conference?: ConferenceItem;
  loading = true;
  error = '';
  id = input.required<string>();

  private conferenceService = inject(Conferance);
  private router = inject(Router);

  ngOnInit() {
    const numericId = Number(this.id());
    this.conferenceService.getById(numericId).subscribe({
      next: (data) => {
        this.conference = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Conference not found or server is unavailable.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
