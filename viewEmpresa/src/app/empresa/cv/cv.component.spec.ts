import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CvComponent } from './cv.component';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
