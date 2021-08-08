import { Component } from '@angular/core';
import { queueScheduler } from 'rxjs';
import { Card2 } from './model/card2.interface';
import { CardsService } from './service/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  contador: number = 0;

  generator: any[] = [];
  cards: Card2[] = [];
  set = new Set<string>();

  classModal: boolean = false;
  classComplete: string = "";
  classTitle: string = "";

  failModal: boolean = false;
  condButton: boolean = false;
  loading: boolean = false;

  constructor(private service: CardsService) { }

  ngOnInit() {
    this.service.cards.subscribe(
      data => this.cards = data,
      error => console.log(error)
    );
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
