import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfratPreview } from './ifrat-preview';

describe('IfratPreview', () => {
  let component: IfratPreview;
  let fixture: ComponentFixture<IfratPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IfratPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IfratPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
