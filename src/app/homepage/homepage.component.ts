import { Component, OnInit } from '@angular/core';
import { Card } from '../model/card.interface';
import { CardsService } from '../service/card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  cards: Card[] = []

  classModal: boolean = false;
  classTitle: string = "";
  classComplete: string = "";


  constructor(private service: CardsService, private router: Router) { }

  ngOnInit() {
    this.service.getCards().subscribe(
      data => this.cards = data,
      error => console.log(error)
    );

  }

  shortedContent(n: string) {
    if (n.length <= 120) {
      return n;
    }
    else {
      return n.substr(0, 120).replace(/<\/?[^>]+(>|$)/g, "") + "...";
    }
  }

  cardsModal(n: any) {
    this.classModal = true;
    this.classTitle = this.cards[n].titulo;
    this.classComplete = this.cards[n].texto;
  }

  goToCards() {
    this.router.navigateByUrl('/aulas');
  }

}
