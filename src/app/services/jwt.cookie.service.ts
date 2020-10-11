import { Cookie } from 'ng2-cookies/ng2-cookies';

export class JwtCookieService implements Storage {

    [name: string]: any;
    length: number;
    clear(): void {
        Cookie.deleteAll();
    }
    getItem(key: string): string {
        return Cookie.get(key);
    }
    key(index: number): string {
        return null;
    }
    removeItem(key: string): void {
        Cookie.delete(key);
    }
    setItem(key: string, value: string): void {
        Cookie.set(key, value, );
    }
}