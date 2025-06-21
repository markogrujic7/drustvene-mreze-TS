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
    const users: User[] = data.users ?? [];

    return users.map(user => ({
        ...user,
        datumRodjenja: new Date(user.datumRodjenja)
    }));
}

  async createUser(user: User): Promise<User> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error(`Request failed. Status: ${response.status}`);
    }

    return await response.json();
  }

  update(id: string, user: User): Promise<void> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed. Status: ${response.status}`);
        }
      });
    }


  async getById(id: string): Promise<User> {
  const response = await fetch(`${this.apiUrl}/${id}`);

  if (!response.ok) {
    throw new Error(`Neuspešan zahtev. Status: ${response.status}`);
  }

  const userFromApi = await response.json();

  return {
    id: userFromApi.id,
    korisnickoIme: userFromApi.korisnickoIme,
    ime: userFromApi.ime,
    prezime: userFromApi.prezime,
    datumRodjenja: new Date(userFromApi.datumRodjenja)
  };
}

}
