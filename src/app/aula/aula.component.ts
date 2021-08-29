import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from '../model/card.interface';
import { CardsService } from '../service/card.service';
import { DataService } from '../service/data.service';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';



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
  selectedFormat: string = "";
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

  @ViewChild(Paginator)
  paginator!: Paginator;
  currentPage: number = 1;
  firstCard: number = 0;
  lastCard: number = 6;

  constructor(private cardService: CardsService, private dataService: DataService, private router: Router) { }

  get txtSrc(): string {
    return this.dataService.sharedData;
  }
  set txtSrc(value: string) {
    this.dataService.sharedData = value;
  }

  ngOnInit() {
    this.cardService.getCards(null, this.txtSrc).subscribe(
      data => this.cards = data,
      error => console.log(error)
    );

    this.cardService.themes.subscribe(data => this.themes = [{ name: "Todos os temas", value: "" }].concat(data.map(e => {
      return { name: e, value: e };
    })));

    this.selectedFormat = "imagem";
  }

  htmlParse(n: string) {
    var p = document.createElement("p");
    p.innerHTML = n;
    return p.innerText;
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

  removeCard(card: Card) {
    let index = this.cards.indexOf(card);
    this.cards.splice(index, 1);
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

    if (this.selectedFormat !== "") {
      filter["" + this.selectedFormat] = 1;
    }

    //this.selectedFormat.forEach(e => filter[e] = 1);

    if (this.txtSrc !== "") {
      search = this.txtSrc;
    }

    this.cardService.getCards(filter, search).subscribe(
      data => this.cards = data,
      error => console.log(error)
    );
  }

  refresh() {
    window.location.reload();
  }

  downloadAula() {
    this.cardService.getSlideAndDownload(Array.from(this.setCards));
  }

  routeHomepage() {
    this.router.navigateByUrl("/")
  }

  paginate() {
    this.currentPage = this.paginator.getPage();
    this.firstCard = 6 * (this.currentPage);
    this.lastCard = 6 * (this.currentPage + 1);
  }

}
