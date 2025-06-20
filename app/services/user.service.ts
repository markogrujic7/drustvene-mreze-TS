import { User } from "../models/user.model";

export class UserService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "http://localhost:21271/api/users";
  }

  async getAll(page: number = 1, pageSize: number = 10): Promise<User[]> {
    const response = await fetch(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
    
    if (!response.ok) {
        throw new Error(`Request failed. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("USER", data)
    const users: User[] = data.users ?? [];

    return users.map(user => ({
        ...user,
        datumRodjenja: new Date(user.datumRodjenja)
    }));
}

}
