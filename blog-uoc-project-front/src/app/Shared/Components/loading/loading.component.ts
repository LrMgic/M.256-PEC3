import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../Services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService) {

  }

  ngOnInit(): void {
  }

}
