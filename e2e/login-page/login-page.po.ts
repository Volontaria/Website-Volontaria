import { browser, by, element } from 'protractor';

export class LoginPageComponent {
  private credentias = {
    username: 'user',
    password: 'useruser'
  };

  navigateToLogin() {
    return browser.get('/login');
  }

  navigateToRoot() {
    return browser.get('/');
  }

  getPageTitleText() {
    return element(by.css('app-root h2')).getText();
  }

  fillCredentials(credentias: any = this.credentias) {
    element(by.css('[name="username"]')).sendKeys(credentias.username);
    element(by.css('[name="password"]')).sendKeys(credentias.password);
    element(by.css('.button')).click();
  }

  isHomepage() {
    if (element(by.css('.page-homepage'))) {
      return true;
    } else {
      return false;
    }
  }
}
