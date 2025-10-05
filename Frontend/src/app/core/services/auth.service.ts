import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  MeResponse 
} from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly API_URL = `${environment.apiUrl}/auth`;

  constructor() {
    // Load user if token exists
    if (this.tokenService.isAuthenticated()) {
      this.loadCurrentUser();
    }
  }

  /**
   * Register a new user
   */
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  /**
   * Login user
   */
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  /**
   * Logout user
   */
  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, {}).pipe(
      tap(() => {
        this.tokenService.removeToken();
        this.currentUserSubject.next(null);
      })
    );
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.API_URL}/me`).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

  /**
   * Load current user from API
   */
  private loadCurrentUser(): void {
    this.getCurrentUser().subscribe({
      error: () => {
        // If error, remove invalid token
        this.tokenService.removeToken();
        this.currentUserSubject.next(null);
      }
    });
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  /**
   * Get current user value (synchronous)
   */
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
