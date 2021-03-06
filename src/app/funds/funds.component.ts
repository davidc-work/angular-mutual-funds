import { Component, OnInit } from '@angular/core';
import { FundService } from '../fund.service';
import { Fund } from '../fund/fund.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {

  constructor(private fundService: FundService, private router: Router) { }

  funds:Fund[] = [];

  ngOnInit(): void {
    this.getFunds();
  }

  getFunds() {
    this.fundService.getFunds().subscribe(payload =>{
      this.funds = payload;
    });
  }

  viewFund(n: any) {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-left';
    setTimeout(() => this.router.navigateByUrl(this.router.url + '/' + n), 250);
  }

  addFund() {
    var e: HTMLElement = <HTMLElement>document.getElementsByClassName('scroll')[0];
    e.style.animation = '0.25s out-to-left';
    setTimeout(() => this.router.navigateByUrl(this.router.url + '/add'), 250);
  }

  deleteFund(n: any) {
    if (!confirm('Are you sure you want to delete fund ' + n + '?')) return ;
    this.fundService.deleteFund(n).subscribe(d => {
      var elements = <HTMLCollection>(document.getElementsByTagName('tr'));
      var e: HTMLElement = <HTMLElement>(Array.from(elements).find(e => {
        return e.children[0].innerHTML == n.toString();
      }));
      e.style.animation = '0.4s out-to-left';
      e.style.animationFillMode = 'forwards';
      setTimeout(() => this.getFunds(), 400);
    });
  }
}
