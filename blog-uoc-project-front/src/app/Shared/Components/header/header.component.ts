import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { slideInAnimation } from 'src/app/Animations/animaciones';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../../../Auth/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideInAnimation],
})
export class HeaderComponent implements OnInit {
  showLogoutButton: boolean;
  linckList: any[];
  activeLinkIndex = -1;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.showLogoutButton = false;
    this.linckList = [
      { link: './home', label: 'Home', index: 0 },
      { link: './login', label: 'Login', index: 1 },
      { link: './register', label: 'Register', index: 2 },
    ];
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.access_token) {
        this.showLogoutButton = true;
      }
      this.menu();
    });
  }

  menu() {
    if (this.showLogoutButton === false) {
      this.linckList = [
        { link: './home', label: 'Home', index: 0 },
        { link: './login', label: 'Login', index: 1 },
        { link: './register', label: 'Register', index: 2 },
      ];
    } else {
      this.linckList = [
        { link: './home', label: 'Home', index: 0 },
        { link: './posts', label: 'Admin Posts', index: 1 },
        { link: './categories', label: 'Admin Categories', index: 2 },
        { link: './profile', label: 'Profile', index: 3 },
      ];
    }
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.linckList.indexOf(
        this.linckList.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }

  logout() {
    this.showLogoutButton = false;
    this.store.dispatch(AuthAction.logout());
    this.menu();
    this.router.navigateByUrl('home');
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
