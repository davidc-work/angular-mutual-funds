import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { RoutesRecognized } from '@angular/router';
import { FundComponent } from './fund/fund.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mutual';
  currentUrl: any;
  previousUrl: any;

  constructor(private router: Router) {
    router.events.subscribe(v => window.scrollTo(0, 0));
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized), 
    pairwise()).subscribe((events: RoutesRecognized[]) => {
      // console.log('previous url', events[0].urlAfterRedirects);
      // console.log('current url', events[1].urlAfterRedirects);
      this.previousUrl = events[0].urlAfterRedirects;
      this.currentUrl = events[1].urlAfterRedirects;
    });
  }
}
