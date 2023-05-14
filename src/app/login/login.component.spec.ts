import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: () => of({}),
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form', () => {
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.loginForm.controls['email'].valid).toBeFalsy();
    expect(component.loginForm.controls['password'].valid).toBeFalsy();
  });

  it('should set isLoginBotaniste to true when isBotaniste is called with true', () => {
    component.isBotaniste(true);
    expect(component.isLoginBotaniste).toBeTrue();
  });

  it('should set isLoginBotaniste to false when isBotaniste is called with false', () => {
    component.isBotaniste(false);
    expect(component.isLoginBotaniste).toBeFalse();
  });

  it('should set choiceUser to true when isBotaniste is called', () => {
    component.isBotaniste(true);
    expect(component.choiceUser).toBeTrue();
  });

  it('should set choiceUser to false when goBack is called', () => {
    component.choiceUser = true;
    component.goBack();
    expect(component.choiceUser).toBeFalse();
  });
});
