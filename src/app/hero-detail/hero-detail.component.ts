import {Component, OnInit, Input, NgModule} from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormsModule, NgModel} from '@angular/forms';

import { HeroService } from '../hero.service';
import {TestService} from '../test.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
@NgModule({
  imports: [FormsModule]
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() testData: string;
  testDataXml: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private testService: TestService
  ) {
    this.testData = 'Constructor testdata';
    this.testDataXml = 'x';
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
  getTestdata(adresse: string): void {
    this.testData = 'getTestdata string';
    this.testService.getTestdata()
  .subscribe(xml => this.testDataXml = xml);
  }
}

