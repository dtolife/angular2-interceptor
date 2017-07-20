import { Angular2NewPage } from './app.po';

describe('angular2-new App', () => {
  let page: Angular2NewPage;

  beforeEach(() => {
    page = new Angular2NewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
