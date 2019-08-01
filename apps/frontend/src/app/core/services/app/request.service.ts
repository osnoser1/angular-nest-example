import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class RequestService {
  constructor() {}

  getParams = (obj: { [key: string]: any }) =>
    Object.keys(obj).reduce(
      (params, key) =>
        (obj[key] !== undefined && obj[key] !== null && params.append(key, obj[key])) || params,
      new HttpParams(),
    );
}
