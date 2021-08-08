import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card2 } from '../model/card2.interface';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) {
  }

  public get cards(): Observable<Card2[]> {
    return this.http.get<Card2[]>('assets/cards/cards2.json')
      .pipe(map(data => data));
  }
}