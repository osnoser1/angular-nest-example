import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorageService {
  /**
   * Get access token
   */
  public getAccessToken = (): Observable<string | null> => of(localStorage.getItem('accessToken'));

  /**
   * Get refresh token
   */
  public getRefreshToken = (): Observable<string | null> =>
    of(localStorage.getItem('refreshToken'));

  /**
   * Set access token
   */
  public setAccessToken(token: string): this {
    localStorage.setItem('accessToken', token);
    return this;
  }

  /**
   * Set refresh token
   */
  public setRefreshToken(token: string): this {
    localStorage.setItem('refreshToken', token);
    return this;
  }

  /**
   * Remove tokens
   */
  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
