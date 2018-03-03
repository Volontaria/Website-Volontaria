import { LoginPageComponent } from './login-page.po';

describe('LoginPageComponent', () => {
  let loginPage: LoginPageComponent;

  const wrongCredentias = {
    username: 'wrongname',
    password: 'wrongpasswd'
  };

  beforeEach(() => {
    loginPage = new LoginPageComponent();
  });

  it('when user browses to our app he should see the default “login” screen', () => {
    loginPage.navigateToRoot();
    expect(loginPage.getPageTitleText()).toEqual('Se connecter');
  });

  it('when user browses to the login page he should see the default “login” screen', () => {
    loginPage.navigateToLogin();
    expect(loginPage.getPageTitleText()).toEqual('Se connecter');
  });

  it('when user trying to login with wrong credentials he should stay on “login” page', () => {
    loginPage.navigateToLogin();
    loginPage.fillCredentials(wrongCredentias);
    expect(loginPage.getPageTitleText()).toEqual('Se connecter');
  });

  it('when user login with good credentials he should be redirect on "home" page', () => {
    loginPage.navigateToLogin();
    loginPage.fillCredentials();
    expect(loginPage.isHomepage());
  });
});
