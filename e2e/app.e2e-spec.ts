import { Ng2KindgartenAdminPage } from './app.po';

describe('ng2-kindgarten-admin App', function() {
  let page: Ng2KindgartenAdminPage;

  beforeEach(() => {
    page = new Ng2KindgartenAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
