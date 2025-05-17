import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoimentsComponent } from './appoiments.component';

describe('AppoimentsComponent', () => {
  let component: AppoimentsComponent;
  let fixture: ComponentFixture<AppoimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppoimentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
