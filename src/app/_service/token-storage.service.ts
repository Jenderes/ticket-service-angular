import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  private roles: string[];
  private roleUser: any;
  signOut(): void {
    window.sessionStorage.clear();
  }
  // Сохранение токена
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  // Получение токена пользователя
  public getToken(): string | null {
    const str = window.sessionStorage.getItem(TOKEN_KEY);
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  // Сохрнение данных пользователя
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  // Получение данных пользователя из session storage
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  // проверка роли администратора
  public checkRole(role: string): boolean {
    this.roleUser = this.getUser();
    if (this.roleUser == null){
      return false;
    }
    this.roles = this.roleUser.roles;
    return this.roles.length > 1 && this.roles[1] === role;
  }

  public getCurrentId(): string {
    return this.getUser().userId;
  }
}
