import { Component, OnInit } from '@angular/core';
import { Card2 } from '../model/card2.interface';
import { CardsService } from '../service/card.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  cont: number = 0;

  themes: string[] = []
  selectedTheme: string = "";
  selectedYear: string[] = [];
  selectedFormat: string[] = [];

  cards: Card2[] = [];
  generator: any[] = [];
  setCards = new Set<Card2>();

  classModal: boolean = false;
  classComplete: string = "";
  classTitle: string = "";

  failModal: boolean = false;
  condButton: boolean = false;

  deleteModal: boolean = false;
  deleteCardGenerator: any;

  loading: boolean = false;


  constructor(private service: CardsService) { }

  ngOnInit() {
    this.service.cards.subscribe(
      data => this.cards = data,
      error => console.log(error)
    );
  }

  ngDoCheck() {
    var length = this.cards.length;
    for (let i = 0; i < length; i++) {
      if (!this.themes.includes(this.cards[i].tema)) {
        this.themes.push(this.cards[i].tema);
      }
    }
  }

  shortedContent(n: string) {
    if (n.length <= 120) {
      return n;
    }
    else {
      return n.substr(0, 120) + "...";
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


  /*   generatorModal(n: any) {
      this.deleteModal = true;
      this.classTitle = this.cards[n].titulo;
      if (this.generatorDelete) {
        this.setCards.delete(this.cards[n]);
      }
    } */

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
      this.classComplete = this.cards[n].conteudo;
    }
    this.condButton = false;
  }

  load() {
    this.loading = true;
    setTimeout(() => this.loading = false, 1000);
  }

}
