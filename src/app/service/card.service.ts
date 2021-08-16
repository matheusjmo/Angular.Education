import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card2 } from '../model/card2.interface';
import isNil from 'lodash-es/isNil';

declare var require: any
const FileSaver = require('file-saver');

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) {
  }

  public getCards(filters?: any): Observable<Card[]> {
    return this.http.get<Card[]>('assets/cards/cards.json')
      .pipe(
        map(data => this.addId(data)),
        map(data => this.applyFilters(data, filters))
      );
  }

  private addId(cards: Card[]): Card[] {
    return cards.map((e, i) => {
      return { ...e, id: i };
    });
  }

  private applyFilters(cards: Card[], filters?: any): Card[] {
    return cards.filter(card => Object.keys(filters ?? {}).reduce((acc, key) => acc &&
      (
        isNil((card as any)[key])
        || (isNil(filters[key].length) && (card as any)[key] === filters[key])
        || (!isNil(filters[key].length) && filters[key].some((e: any) => (card as any)[key] === e))
      )
      , true as boolean));
  }

  public get themes(): Observable<string[]> {
    return this.http.get<Card[]>('assets/cards/cards.json').pipe(
      map(data => Array.from(new Set(data.map(card => card.tema))))
    );
  }

  public getSlide(cards: Card[]) {
    return this.http.post('http://143.244.210.88:5000', { "cards": cards }, { responseType: 'arraybuffer' }).subscribe(response => this.downloadFile(response));
  }

  public downloadFile(data: any) {
    const type = "application/pdf";
    let blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    FileSaver.saveAs(url, "aula.pdf");
  }

}