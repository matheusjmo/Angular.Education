import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card.interface';
import { Observable, Subscription } from 'rxjs';
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

  public getCards(filters?: any, search?: string): Observable<Card[]> {
    return this.http.get<Card[]>('assets/cards/cards.json')
      .pipe(
        map(data => this.addId(data)),
        map(data => this.applyFilters(data, filters)),
        map(data => this.textSearch(data, search))
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
        || ((typeof (filters[key]) === "string" || typeof (filters[key]) === "number") && (card as any)[key] === filters[key])
        || (Array.isArray(filters[key]) && filters[key].some((e: any) => (card as any)[key] === e))
      )
      , true as boolean));
  }

  private textSearch(cards: Card[], search?: string): Card[] {
    if (isNil(search) || search.length == 0) {
      return cards;
    }

    let regex = new RegExp((search.toLowerCase().split(' ') ?? []).reduce((acc, s) => acc + "|" + s), "g");

    return cards.map(card => {
      return {
        card,
        rank: (card.titulo.toLowerCase().match(regex) || []).length + (card.texto.toLowerCase().match(regex) || []).length
      };
    }).filter(e => e.rank !== 0).sort((a, b) => b.rank - a.rank).map(e => e.card);
  }

  public get themes(): Observable<string[]> {
    return this.http.get<Card[]>('assets/cards/cards.json').pipe(
      map(data => Array.from(new Set(data.map(card => card.tema))))
    );
  }

  public getSlideAndDownload(cards: Card[]): Subscription {
    return this.http.post('http://143.244.210.88:5000', { "cards": cards }, { responseType: 'arraybuffer' }).subscribe(response => this.downloadFile(response));
  }

  public getSlide(cards: Card[]): Observable<ArrayBuffer> {
    return this.http.post('http://143.244.210.88:5000', { "cards": cards }, { responseType: 'arraybuffer' });
  }

  public downloadFile(data: any) {
    const type = "application/pdf";
    let blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    FileSaver.saveAs(url, "aula.pdf");
  }

}