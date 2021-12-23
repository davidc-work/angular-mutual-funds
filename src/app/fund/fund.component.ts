import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FundService } from '../fund.service';
import { Fund } from './fund.model';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  fund:Fund = {};
  keys:any;

  constructor(private route:ActivatedRoute, private fundService: FundService, private router: Router, private appComponent: AppComponent) {
    this.router = router;
  }

  ngOnInit(): void {
    if (this.appComponent.previousUrl) {
      if (this.appComponent.previousUrl.split('/').includes('edit')) {
        let e = <HTMLElement>document.getElementsByClassName('scroll')[0];
        e.style.animation = 'none';
        e.style.opacity = '1';
      }
    }
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.fundService.getFund(myid).subscribe(payload=>{
        console.log(payload);
        this.fund = payload;
        this.keys = Object.keys(this.fund);
      })
    });
  }

  edit() {
    this.router.navigateByUrl(this.router.url + '/edit');
  }

  back() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-right';
    setTimeout(() => this.router.navigateByUrl('/funds'), 250);
  }
}
