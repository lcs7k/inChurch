import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _httpClient = inject(HttpClient);
  private _apiUrl = `${environment.baseUrl}/users`

  login(email: string, password: string) {
    return this._httpClient.get<any[]>(`${this._apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          return true;
        }
        return false;
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

}
