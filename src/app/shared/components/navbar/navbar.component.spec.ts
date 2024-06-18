import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of sidebar items', () => {
    expect(component.sidebarItems.length).toBe(2);
    expect(component.sidebarItems[0].label).toBe('List Products');
    expect(component.sidebarItems[1].label).toBe('Create Product');
  });

  it('should render sidebar items correctly', () => {
    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('mat-list-item');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('Lista de productos');
    expect(listItems[1].textContent).toContain('Añadir un producto');
  });


});
