import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
    private cacheDurations: { [key: string]: number } = {};
  
    private getExpirationKey(key: string): string {
      return `${key}_expiration`;
    }
  
    public set(key: string, value: any, ttl: number): void {
      const now = new Date();
      const expiration = now.getTime() + (this.cacheDurations[key] || ttl);
      localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem(this.getExpirationKey(key), expiration.toString());
    }
  
    public get(key: string): any {
      const now = new Date();
      const expiration = parseInt(localStorage.getItem(this.getExpirationKey(key)), 10);
      if (now.getTime() > expiration) {
        this.remove(key);
        return null;
      }
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
  
    public remove(key: string): void {
      localStorage.removeItem(key);
      localStorage.removeItem(this.getExpirationKey(key));
    }
  
    public clear(): void {
      localStorage.clear();
    }
  
    public setCacheDuration(key: string, duration: number): void {
      this.cacheDurations[key] = duration;
    }
  }