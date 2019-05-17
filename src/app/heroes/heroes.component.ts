import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../entities/hero';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  add(heroName: string) {
    heroName = heroName.trim();
    if (!heroName) { return; }

    const newHero = new Hero();
    newHero.name = heroName;

    this.heroService.addHero(newHero)
    .subscribe (hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero)
    .subscribe();
  }

  getHeroes() {
    this.heroService
      .getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
