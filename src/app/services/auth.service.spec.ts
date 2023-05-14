import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { UserInformation } from '../models/user';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let routerMock: { navigate: jasmine.Spy };
  let currentUserSubjectMock: BehaviorSubject<UserInformation>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: BehaviorSubject, useValue: currentUserSubjectMock },
      ],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  //le test vérifie si le service est bien créée
  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  /**Dans la méthode login(), le test vérifie si le service appelle correctement la méthode http.post()
   *  pour se connecter avec les informations d'utilisateur passées en argument.
   * Le test vérifie également si le service stocke correctement l'utilisateur courant dans sessionStorage
   * et émet correctement la réponse de l'API. */
  describe('login', () => {
    it('should call http post and set current user', () => {
      const expectedUser: UserInformation = {
        email: 'test@test.com',
        password: 'password',
      };
      const expectedResponse = { ...expectedUser };
      authService.login(expectedUser).subscribe((user) => {
        expect(user).toEqual(expectedResponse);
      });
      const req = httpMock.expectOne('http://localhost:8082/login');
      expect(req.request.method).toBe('POST');
      req.flush(expectedResponse);
      expect(sessionStorage.getItem('currentUser')).toEqual(
        JSON.stringify(expectedResponse)
      );
    });
  });
  /**Dans la méthode signup(), le test vérifie si le service appelle correctement la méthode http.post()
   *  pour inscrire un nouvel utilisateur avec les informations passées en argument. */
  describe('signup', () => {
    it('should call http post', () => {
      const expectedUser: UserInformation = {
        lastname: 'test',
        firstname: 'test',
        birthdate: '24/12/199',
        email: 'test@test.com',
        phone: '1234567890',
        password: 'password',
      };
      authService.signup(expectedUser).subscribe();
      const req = httpMock.expectOne('http://localhost:8082/signup');
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });
});
