import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  TOKEN = "DivineBookStore";
  constructor() { }

  setToken( token: string ){
    if( ! token ){
      return;
    }
    this.removeToken();
    window.localStorage.setItem(this.TOKEN, token);
  }

  getToken(){
    return window.localStorage.getItem(this.TOKEN);
  }

  removeToken(){
    window.localStorage.removeItem(this.TOKEN);
  }
}
