import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TalkMoreService {

  apiUrl = 'https://agdo-server.appspot.com/solicitacoes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll() {
    return this.httpClient.get<any>(this.apiUrl)
  }

  public getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`)
  }

  public post(value: any) {
    return this.httpClient.post(this.apiUrl, value)
  }
}
