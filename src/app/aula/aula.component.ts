import { Component, Input, OnInit } from '@angular/core';
import { asapScheduler } from 'rxjs';
import { Card } from '../model/card.interface';
import { CardsService } from '../service/card.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  cards: Card[] = [];

  themes: string[] = []
  selectedTheme: string = "";
  selectedYear: string[] = [];
  selectedFormat: string[] = [];

  generator: any[] = [];
  setCards = new Set<Card>();

  classModal: boolean = false;
  classComplete: string = "";
  classTitle: string = "";

  failModal: boolean = false;
  condButton: boolean = false;

  deleteModal: boolean = false;
  deleteCardGenerator: any;

  loading: boolean = false;
  cont: number = 0;

  constructor(private service: CardsService) { }

  ngOnInit() {
    this.service.getCards().subscribe(
      data => this.cards = data,
      error => console.log(error)
    );

    this.service.themes.subscribe(data => this.themes = data);
  }

  shortedContent(n: string) {
    if (n.length <= 120) {
      return n;
    }
    else {
      return n.substr(0, 120).replace(/<\/?[^>]+(>|$)/g, "") + "...";
    }
  }

  addGenerator(n: any) {
    this.condButton = true;
    if (!this.setCards.has(this.cards[n])) {
      this.setCards.add(this.cards[n]);
    }
    else {
      this.failModal = true;
    }
  }

  generatorModal(n: any) {
    this.deleteModal = true;
    this.classTitle = this.cards[n].titulo;
    this.deleteCardGenerator = this.cards[n]
  }

  generatorDelete() {
    this.setCards.delete(this.deleteCardGenerator);
    this.deleteModal = false;
  }

  cardsModal(n: any) {
    //adicionar titulo ao header
    //
    //
    //
    console.log(this.condButton);
    if (this.condButton == false) {
      console.log("entrou...");
      this.classModal = true;
      this.classTitle = this.cards[n].titulo;
      this.classComplete = this.cards[n].texto;
    }
    this.condButton = false;
  }

  applyFilter() {

    this.loading = true;
    setTimeout(() => this.loading = false, 1000);

    let filterYear = "";
    let filterTheme = "";
    let filter = "";

    if (this.selectedYear.length != 0) {
      filter = "{ano: " + this.selectedYear.map(e => parseInt(e));
    }

    if (Boolean(this.selectedTheme)) {
      if (Boolean(filter)) {
        filter += ", tema: " + this.selectedTheme
      } else {
        filter = "{tema: " + this.selectedTheme;
      }
    }

    filter += "}";

    //this.selectedFormat.map(e => parseInt(e)).reduce((acc, v) => acc + v, 0);

    this.service.getCards(JSON.parse(filter)).subscribe(
      data => this.cards = data,
      error => console.log(error)
    );
  }

  downloadAula() {
    this.service.getSlide(Array.from(this.setCards));
  }

}
