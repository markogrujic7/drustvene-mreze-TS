import { UserService } from "../services/user.service.js";

const userService = new UserService();
const form = document.getElementById('dodajForm') as HTMLFormElement;


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userData = {
    korisnickoIme: (document.getElementById('dodajKorisnickoIme') as HTMLInputElement).value,
    ime: (document.getElementById('dodajIme') as HTMLInputElement).value,
    prezime: (document.getElementById('dodajPrezime') as HTMLInputElement).value,
    datumRodjenja: new Date((document.getElementById('dodajDatumRodjenja') as HTMLInputElement).value)
  };

  userService.createUser(userData)
    .then(() => {
      form.reset();
      alert('Korisnik uspešno dodat!');
      window.location.href = "../index.html"
    })
    .catch((error: Error) => {
      console.error('Greška:', error.message);
      alert('Došlo je do greške pri dodavanju korisnika');
    });
});

