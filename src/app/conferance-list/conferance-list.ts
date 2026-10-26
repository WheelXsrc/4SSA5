import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Conferance, ConferenceItem } from '../services/conferance';

@Component({
  selector: 'app-conferance-list',
  imports: [RouterLink],
  templateUrl: './conferance-list.html',
  styleUrl: './conferance-list.css',
})
export class ConferanceList implements OnInit {
  conferances: ConferenceItem[] = [];
  loading = true;
  error = '';

  constructor(private conferenceService: Conferance) {}

  ngOnInit() {
    this.conferenceService.getAll().subscribe({
      next: (data) => {
        this.conferances = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load conferences. Make sure the server is running on port 3000.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
