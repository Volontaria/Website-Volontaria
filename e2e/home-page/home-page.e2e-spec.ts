import { HomePageComponent } from './home-page.po';
import { LoginPageComponent } from '../login-page/login-page.po';

describe('HomePageComponent', () => {
  let homePage: HomePageComponent;
  let loginPage: LoginPageComponent;

  beforeEach(() => {
    homePage = new HomePageComponent();
    loginPage = new LoginPageComponent();
  });

  it('when user browses to the "home" page he should see the default “login” screen', () => {
    homePage.navigateToHome();
    expect(loginPage.getPageTitleText()).toEqual('Se connecter');
  });
});
