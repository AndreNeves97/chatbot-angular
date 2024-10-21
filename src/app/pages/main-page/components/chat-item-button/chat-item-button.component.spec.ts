import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatItemButtonComponent } from './chat-item-button.component';

describe('ChatItemButtonComponent', () => {
  let component: ChatItemButtonComponent;
  let fixture: ComponentFixture<ChatItemButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatItemButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
