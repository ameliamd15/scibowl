import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { TopicsPage } from '../topics/topics';
import { ContestsPage } from '../contests/contests';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ContestsPage;
  //tab3Root = AboutPage;
  tab2Root = TopicsPage;

  constructor() {

  }
}
