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
  id = input.required<string>();

  private conferenceService = inject(Conferance);
  private router = inject(Router);

  ngOnInit() {
    const numericId = Number(this.id());
    this.conference = this.conferenceService.getById(numericId);
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
