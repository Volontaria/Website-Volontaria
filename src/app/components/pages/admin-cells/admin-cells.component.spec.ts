import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CellService } from '../../../services/cell.service';

import { AdminCellsComponent } from './admin-cells.component';

@Component({selector: 'app-my-table', template: ''})
class MyTableStubComponent {
  @Input() data: any;
  @Input() settings: any;
}

describe('AdminCellsComponent', () => {
  let component: AdminCellsComponent;
  let fixture: ComponentFixture<AdminCellsComponent>;

  beforeEach(async(() => {
    const cellServiceStub = {
      getCells: () => {
        return {
          subscribe: () => {}
        };
      }
    };
    const routerStub: Partial<Router> = {};

    TestBed.configureTestingModule({
      declarations: [
        AdminCellsComponent,
        MyTableStubComponent
      ],
      providers: [
        { provide: CellService, useValue: cellServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
