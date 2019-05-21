import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Hero } from '../entities/hero';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnChanges, OnDestroy {

  @Input() hero: Hero;
  navigationSub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location) {

      this.navigationSub = this.router.events.subscribe(
        (e:any) => {
          if (e instanceof NavigationEnd){
            this.reInitialize();
          }
        }
      );
     }

     ngOnDestroy() {
      // avoid memory leaks here by cleaning up after ourselves. If we
      // don't then we will continue to run our initialiseInvites()
      // method on every navigationEnd event.
      if (this.navigationSub) {
         this.navigationSub.unsubscribe();
      }
    }

  private reInitialize(){
    this.getHero();
  }
  ngOnInit(): void {
    this.getHero();
  }

  ngOnChanges(): void {
    this.getHero();
  }

  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  save(){
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
  goBack(){
    this.location.back();
  }

}
