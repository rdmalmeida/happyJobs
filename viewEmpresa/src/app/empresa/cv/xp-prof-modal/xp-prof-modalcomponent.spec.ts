import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { XpProfModalComponent } from './xp-prof-modal.component';


describe('XpProfModalComponent', () => {
  let component: XpProfModalComponent;
  let fixture: ComponentFixture<XpProfModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpProfModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpProfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
