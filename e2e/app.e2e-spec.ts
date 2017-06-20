import { AngularJsUpgradePage } from './app.po';

describe('angular-js-upgrade App', () => {
  let page: AngularJsUpgradePage;

  beforeEach(() => {
    page = new AngularJsUpgradePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
