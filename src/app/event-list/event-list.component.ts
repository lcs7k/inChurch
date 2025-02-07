import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faCaretLeft,  faCaretRight, faSearch, faGrip, faFilter, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EventListService } from './event-list.service';
import { EventModel } from '../interface/event.interface';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FontAwesomeModule],
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent {
  faTrash = faTrash; 
  faPenToSquare = faPenToSquare;
  faCaretLeft = faCaretLeft; 
  faCaretRight = faCaretRight;
  faSearch = faSearch;
  faGrip  = faGrip;
  faArrowDown = faArrowDown;
  faFilter = faFilter;
  tableMode = signal(true);
  viewMode = signal<'table' | 'cards'>('table');

  searchControl = new FormControl('');
  searchTermSignal = signal(''); 

  events = signal<EventModel[]>([]);

  filteredEvents = computed(() => {
    const searchTerm = this.searchTermSignal().toLowerCase();
    return this.events().filter(event =>
      event.title.toLowerCase().includes(searchTerm)
    );
  });

  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  private _eventListService = inject(EventListService);

  ngOnInit() {
    this.getAllEvents();
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this._destroyRef))
      .subscribe(value => {
        this.searchTermSignal.set(value || ''); 
      });
  }

  getAllEvents() {
    this._eventListService.getAllEnvents().pipe(takeUntilDestroyed(this._destroyRef)).subscribe((events: EventModel[]) => {
      this.events.set(events);
    });
  }

  switchView() {
    this.tableMode.set(!this.tableMode());
  }

  editEvent(id: number) {
    this._router.navigateByUrl(`edit/${id}`);
  }

  deleteEvent(id: number) {
    this._eventListService.deleteEvent(id).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.getAllEvents();
    })
  }
}