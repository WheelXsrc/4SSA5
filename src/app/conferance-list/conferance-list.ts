import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Conferance, ConferenceItem } from '../services/conferance';

@Component({
  selector: 'app-conferance-list',
  imports: [RouterLink],
  templateUrl: './conferance-list.html',
  styleUrl: './conferance-list.css',
})
export class ConferanceList {
  conferances: ConferenceItem[] = [];

  constructor(private conferenceService: Conferance) {
    this.conferances = this.conferenceService.getAll();
  }
}
