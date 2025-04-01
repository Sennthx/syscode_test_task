import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Address {
  id: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:3001/address/';
  private username = 'admin';
  private password = 'admin1234';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const authString = `${this.username}:${this.password}`;
    const authToken = btoa(authString);

    return new HttpHeaders({
      'Authorization': `Basic ${authToken}`
    });
  }

  getAddress(id: string): Observable<Address> {
    const headers = this.getAuthHeaders();
    return this.http.get<Address>(this.apiUrl + id, { headers });
  }
}
