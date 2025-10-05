import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
  
  show() {
    this.loadingSubject.next(true);
  }
  
  hide() {
    this.loadingSubject.next(false);
  }
}
