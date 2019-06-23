import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  private constructor() {
  }

  private static instance: StoreService = null;

  // tslint:disable-next-line:variable-name
  private _username = '';
  // tslint:disable-next-line:variable-name
  private _access = '';

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get access(): string {
    return this._access;
  }

  set access(value: string) {
    this._access = value;
  }

  public static getInstance(): StoreService {
    if (this.instance === null) {
      this.instance = new StoreService();
    }

    return this.instance;
  }

}
