import { PageNotFoundComponent } from './notfound-page.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NotFoundPageComponent', () => {

  let app: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);

    app = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  it('Should display 404', () => {
    fixture.detectChanges();
    expect(el.textContent).toEqual('404 - Page not found');
  });
});
