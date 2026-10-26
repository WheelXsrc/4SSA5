import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Conferance, ConferenceItem } from '../services/conferance';

@Component({
  selector: 'app-conferance-list',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './conferance-list.html',
  styleUrl: './conferance-list.css',
})
export class ConferanceList implements OnInit {
  private formBuilder = inject(FormBuilder);
  private conferenceService = inject(Conferance);

  conferances = signal<ConferenceItem[]>([]);
  loading = signal(true);
  error = signal('');
  formOpen = signal(false);
  editingConference = signal<ConferenceItem | null>(null);
  saving = signal(false);
  deletingId = signal<number | null>(null);
  mutationError = signal('');

  conferenceForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    place: ['', Validators.required],
    category: [''],
    image: [''],
    description: [''],
    capacity: [0, Validators.min(0)],
  });

  ngOnInit() {
    this.conferenceService.getAll().subscribe({
      next: (data) => {
        this.conferances.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load conferences. Make sure the server is running on port 3000.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  openCreateForm() {
    this.editingConference.set(null);
    this.mutationError.set('');
    this.conferenceForm.reset({
      name: '',
      date: '',
      place: '',
      category: '',
      image: '',
      description: '',
      capacity: 0,
    });
    window.scrollTo(0, 0);
    this.formOpen.set(true);
  }

  openEditForm(conference: ConferenceItem) {
    this.editingConference.set(conference);
    this.mutationError.set('');
    this.conferenceForm.reset({
      name: conference.name,
      date: conference.date,
      place: conference.place,
      category: conference.category ?? '',
      image: conference.image ?? '',
      description: conference.description ?? '',
      capacity: conference.capacity ?? 0,
    });
    window.scrollTo(0, 0);
    this.formOpen.set(true);
  }

  closeForm() {
    this.formOpen.set(false);
    this.editingConference.set(null);
    this.mutationError.set('');
  }

  saveConference() {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }

    const values = this.conferenceForm.getRawValue();
    const editingConference = this.editingConference();
    this.saving.set(true);
    this.mutationError.set('');

    const request = editingConference
      ? this.conferenceService.updateConferance(editingConference.id, {
          ...values,
          id: editingConference.id,
        })
      : this.conferenceService.addConferance(values);

    request.subscribe({
      next: (savedConference) => {
        this.conferances.update((conferences) =>
          editingConference
            ? conferences.map((conference) =>
                conference.id === savedConference.id ? savedConference : conference,
              )
            : [...conferences, savedConference],
        );
        this.saving.set(false);
        this.closeForm();
      },
      error: () => {
        this.saving.set(false);
        this.mutationError.set('Could not save the conference. Please try again.');
      },
    });
  }

  deleteConference(conference: ConferenceItem) {
    if (!window.confirm(`Delete "${conference.name}"?`)) {
      return;
    }

    this.deletingId.set(conference.id);
    this.mutationError.set('');
    this.conferenceService.deleteConferance(conference.id).subscribe({
      next: () => {
        this.conferances.update((conferences) =>
          conferences.filter((item) => item.id !== conference.id),
        );
        this.deletingId.set(null);
      },
      error: () => {
        this.deletingId.set(null);
        this.mutationError.set('Could not delete the conference. Please try again.');
      },
    });
  }
}
