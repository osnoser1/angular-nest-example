import { Injectable } from '@angular/core';

import { User } from '@angular-nest/data';
import { ApiService, RequestService } from '../app';
import { environment } from '@env/environment';
import { stopIfError } from '@app/core/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string;

  constructor(private api: ApiService, private request: RequestService) {
    this.urlApi = `${environment.apiUrl}/users`;
  }

  getByDocument = (document: string) =>
    this.api.get<User>(`${this.urlApi}/document/${document}`, {}, false);

  register = (user: User) =>
    this.api.post<User>(`${this.urlApi}`, user).pipe(stopIfError());
}
