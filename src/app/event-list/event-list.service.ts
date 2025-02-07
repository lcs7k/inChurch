import { inject, Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventModel } from '../interface/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  private _httpClient = inject(HttpClient);

  getAllEnvents(){
    return this._httpClient.get<EventModel[]>(`${environment.baseUrl}/events`)
  }

  deleteEvent(id: number) {
    return this._httpClient.delete(`${environment.baseUrl}/events/${id}`);
  }
}
