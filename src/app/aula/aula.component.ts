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

  generator: any[] = [];
  cards: Card2[] = [];
  set = new Set<string>();

  classModal: boolean = false;
  classComplete: string = "";
  classTitle: string = "";

  failModal: boolean = false;
  condButton: boolean = false;
  loading: boolean = false;

  rangeValues: number[] = [1, 9];

  themes: string[] = []
  selectedTheme: string = "";

  year: any[] = [];

  constructor(private service: CardsService) {

    this.year = [
      { "serie": "1° ano" },
      { "serie": "2° ano" },
      { "serie": "3° ano" },
      { "serie": "4° ano" },
      { "serie": "5° ano" }
    ]
  }

  /*   povoateDropdown() {
      var contD = 0;
      var tema = "";
      for (tema of this.cards[contD].tema) {
        this.cont++;
        this.themes.push(tema);
      }
    } */

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

  addGenerator(n: any) {
    this.condButton = true;
    if (!this.set.has(this.cards[n].titulo)) {
      this.set.add(this.cards[n].titulo);
    }
    else {
      this.failModal = true;
    }
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
      this.classComplete = this.cards[n].conteudo;
    }
    this.condButton = false;
  }


  load() {
    this.loading = true;
    setTimeout(() => this.loading = false, 1000);
  }

}
