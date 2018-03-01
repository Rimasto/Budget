import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnChanges {

  selectedHero: Hero;
  testRadio: string;
  @Input() power: string;

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => { this.heroes.push(hero); } );
    console.log('radioGroup');
  }

  radioGroup(rad: string): void {
    this.testRadio = rad;
    console.log('radioGroup');
  }

  buttonChange(rad: number): void {
    this.testRadio = rad.toString();
    console.log('buttonChange');
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('changing', changes);
  }
}
