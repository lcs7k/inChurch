import { Component, DestroyRef, inject, Input } from '@angular/core';
import { EventEditService } from './event-edit.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class EventEditComponent {

  @Input() id!: number;

  eventForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    audience: new FormControl('', [Validators.required]),
    readers: new FormControl(null, [Validators.required, Validators.min(1)]),
    dateEvent: new FormControl('', [Validators.required])
  });

   private _destroyRef = inject(DestroyRef);
  private _eventEditService = inject(EventEditService);
  private _router = inject(Router);

  ngOnInit() {

    this.getEventById();
  }

  onSubmit() {
    this._eventEditService.updateEvent(this.eventForm.value).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._router.navigateByUrl('/')
    })
  }

  getEventById() {
    this._eventEditService.getEventById(this.id).subscribe(data => {
      console.log(data)
      this.eventForm.patchValue(data)
      // this.events.set(id);
    });
  }

}
