import { TeacherTrackerPage } from './app.po';

describe('teacher-tracker App', function() {
  let page: TeacherTrackerPage;

  beforeEach(() => {
    page = new TeacherTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
