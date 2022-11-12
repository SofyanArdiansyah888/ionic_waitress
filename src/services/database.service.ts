

export class DatabaseService {
  
  getAccessToken(): string | null {
    const token = '1|Pbc4ZVuqabFPLR4VHRxvDS5UAweWRmEGIQlch4mJ';//localStorage.getItem('access_token');
    return token;
  }

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  clear() {
    localStorage.clear();
  }
}
