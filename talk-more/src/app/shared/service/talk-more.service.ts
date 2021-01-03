import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TalkMoreService {

  public dataSource: BehaviorSubject<any>;

  apiUrl = 'https://agdo-server.appspot.com/solicitacoes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'applicationId': 'BrunoDaSilvaCosta'
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
    return this.httpClient.post(this.apiUrl, value, this.httpOptions)
  }

  public update(value: any) {
    return this.httpClient.put(this.apiUrl, value)
  }

  public delete(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }

}
