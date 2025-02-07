import { Injectable, inject } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventEditService {

  private _httpClient = inject(HttpClient);

  getEventById(id: number){
    return this._httpClient.get(`${environment.baseUrl}/events/${id}`)
  }

  updateEvent(event: any) {
    return this._httpClient.put(`${environment.baseUrl}/events/${event.id}`, event);
  }
}
