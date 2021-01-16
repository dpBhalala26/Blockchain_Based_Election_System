import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  log( ...message: any[] ){
    console.log(message);
  }
}
