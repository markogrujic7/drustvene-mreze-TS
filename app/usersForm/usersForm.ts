import { UserService } from "../services/user.service.js";

const userService = new UserService();
const form = document.getElementById('dodajForm') as HTMLFormElement;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const status = document.getElementById('status') as HTMLParagraphElement;
const button = document.getElementById('submitBtn') as HTMLButtonElement;

if (id) {
  userService.getById(id).then((user) => {
    if (!user) {
      alert("Korisnik nije pronađen");
      return;
    }

    form.classList.remove("hidden");

    (document.getElementById('dodajKorisnickoIme') as HTMLInputElement).value = user.korisnickoIme;
    (document.getElementById('dodajIme') as HTMLInputElement).value = user.ime;
    (document.getElementById('dodajPrezime') as HTMLInputElement).value = user.prezime;

    const datum = new Date(user.datumRodjenja);
    const formattedDate = datum.toISOString().split("T")[0];
    (document.getElementById('dodajDatumRodjenja') as HTMLInputElement).value = formattedDate;

    button.textContent = "Izmeni";
  }).catch((error: Error) => {
    console.error("Greška prilikom učitavanja korisnika:", error.message);
    alert("Došlo je do greške pri učitavanju korisnika.");
  });
} else {
  form.classList.remove("hidden");
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userData = {
    korisnickoIme: (document.getElementById('dodajKorisnickoIme') as HTMLInputElement).value,
    ime: (document.getElementById('dodajIme') as HTMLInputElement).value,
    prezime: (document.getElementById('dodajPrezime') as HTMLInputElement).value,
    datumRodjenja: new Date((document.getElementById('dodajDatumRodjenja') as HTMLInputElement).value)
  };

  if (id) {
    status.textContent = "Cuvanje korisnika...";
    const userDataWithId = { ...userData, id: Number(id) };
    userService.update(id, userDataWithId)
      .then(() => {
        window.location.href = "../index.html";
      })
      .catch((error: Error) => {
        console.error('Greška:', error.message);
        alert('Došlo je do greške pri menjanju podataka');
      });
  } else {
    status.textContent = "Cuvanje korisnika...";
    button.disabled = true;

    userService.createUser(userData)
      .then(() => {
        form.reset();
        button.disabled = false;
        alert('Korisnik uspešno dodat!');
        window.location.href = "../index.html";
      })
      .catch((error: Error) => {
        console.error('Greška:', error.message);
        alert('Došlo je do greške pri dodavanju korisnika');
      });
  }
});

