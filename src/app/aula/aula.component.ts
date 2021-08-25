import { Component, OnInit } from '@angular/core';
import { Card } from '../model/card.interface';
import { CardsService } from '../service/card.service';
import { DataService } from '../service/data.service';



@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  cards: Card[] = [];

  themes: any[] = [];
  selectedTheme: any;
  selectedYear: string[] = [];
  selectedFormat: string[] = [];
  search: string = "";

  imagem: boolean = false;
  video: boolean = false;
  quadrinhos: boolean = false;
  gifs: boolean = false;

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

  constructor(private cardService: CardsService, private dataService: DataService) { }

  get txtSrc(): string {
    return this.dataService.sharedData;
  }
  set txtSrc(value: string) {
    this.dataService.sharedData = value;
  }

  ngOnInit() {
    console.log(this.txtSrc);
    this.cardService.getCards(null, this.txtSrc).subscribe(
      data => this.cards = data,
      error => console.log(error)
    );

    this.cardService.themes.subscribe(data => this.themes = [{ name: "Todos os temas", value: "" }].concat(data.map(e => {
      return { name: e, value: e };
    })));
  }

  shortedContent(n: string) {
    if (n.length <= 120) {
      return n;
    }
    else {
      return n.substr(0, 120).replace(/<\/?[^>]+(>|$)/g, "") + "...";
    }
  }

  addGenerator(card: Card) {
    this.condButton = true;
    if (!this.setCards.has(card)) {
      this.setCards.add(card);
    }
    else {
      this.failModal = true;
    }
  }

  generatorModal(card: Card) {
    this.deleteModal = true;
    this.classTitle = card.titulo;
    this.deleteCardGenerator = card
  }

  generatorDelete() {
    this.setCards.delete(this.deleteCardGenerator);
    this.deleteModal = false;
  }

  cardsModal(card: Card) {
    console.log(this.condButton);
    if (this.condButton == false) {
      console.log("entrou...");
      this.classModal = true;
      this.classTitle = card.titulo;
      this.classComplete = card.texto;
    }
    this.condButton = false;
  }

  applyFilter() {

    this.loading = true;
    setTimeout(() => this.loading = false, 1000);

    let filter: any = {};
    let search;

    if (this.selectedYear.length != 0) {
      filter["ano"] = this.selectedYear.map(e => parseInt(e));
    }

    if (this.selectedTheme !== undefined && this.selectedTheme["value"] !== "") {
      filter["tema"] = this.selectedTheme["value"];
    }

    this.selectedFormat.forEach(e => filter[e] = 1);
    console.log(filter);


    if (this.txtSrc !== "") {
      search = this.txtSrc;
    }

    this.cardService.getCards(filter, search).subscribe(
      data => this.cards = data,
      error => console.log(error)
    );
  }


  downloadAula() {
    this.cardService.getSlideAndDownload(Array.from(this.setCards));
  }

}
