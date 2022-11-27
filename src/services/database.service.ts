export interface UserLogin {
  username: string;
  pwd: string;
  remember?: boolean;
}

export interface User {
  name: string;
  token: string;
  role: string;
}

export class DatabaseService {
  setUser(user: any) {
    user = JSON.stringify(user);
    localStorage.setItem("user", user);
  }

  getUser() {
    let user = localStorage.getItem("user");
    return user
      ? (JSON.parse(user) as User)
      : {
            token: null,
            name: "",
            role: "",
        };
  }

  clear() {
    localStorage.clear();
  }
}
