import { Component } from '@angular/core';

import { SellPage } from '../sell/sell';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SellPage;

  constructor() {

  }
}
