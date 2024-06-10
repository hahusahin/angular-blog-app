import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersistanceService {
  set(key: string, data: unknown) {
    try {
      if (data) {
        localStorage.setItem(key, JSON.stringify(data));
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  get(key: string): unknown {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error saving to local storage', error);
      return null;
    }
  }
}
