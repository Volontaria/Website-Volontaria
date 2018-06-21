import { browser, by, element } from 'protractor';

export class HomePageComponent {

  navigateToHome() {
    return browser.get('/index');
  }

}
