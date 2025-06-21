import { UserService } from "../dist/services/user.service.js";
import { User } from "../app/models/user.model";

const userService = new UserService();
const currentPage = 1;
const pageSize = 10;


function ispisiUsers(nizUsera: User[]): void {
  const tabela = document.querySelector<HTMLTableSectionElement>("#usersBody");
  if (!tabela) return;
  tabela.innerHTML = "";

  for (const user of nizUsera) {
    const noviRed = tabela.insertRow();

    const idCell = noviRed.insertCell();
    idCell.textContent = String(user.id);

    const korisnickoImeCell = noviRed.insertCell();
    korisnickoImeCell.textContent = user.korisnickoIme;

    const imeCell = noviRed.insertCell();
    imeCell.textContent = user.ime;

    const prezimeCell = noviRed.insertCell();
    prezimeCell.textContent = user.prezime;

    const datumCell = noviRed.insertCell();
    const dan = user.datumRodjenja.getDate() < 10 ? "0" + user.datumRodjenja.getDate() : String(user.datumRodjenja.getDate());
    const mesec = user.datumRodjenja.getMonth() + 1 < 10 ? "0" + (user.datumRodjenja.getMonth() + 1) : String(user.datumRodjenja.getMonth() + 1);
    const godina = user.datumRodjenja.getFullYear();

    datumCell.textContent = `${dan}/${mesec}/${godina}`;

    const izmeniCell = noviRed.insertCell();
    const izmeniBtn = document.createElement("button");
    izmeniBtn.textContent = "Izmeni";
    izmeniBtn.addEventListener("click", () => {
      window.location.href = `../app/usersForm/usersForm.html?id=${user.id}`;
    });
    izmeniCell.appendChild(izmeniBtn);

    const deleteCell = noviRed.insertCell();
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Obrisi";
    deleteBtn.addEventListener("click", () =>{
      deleteUser(user.id)
    })
    deleteCell.appendChild(deleteBtn)
  }
}

function ucitajSve(): void {
  userService
    .getAll(currentPage, pageSize)
    .then((users) => ispisiUsers(users))
    .catch((error: Error) => {
      console.error("Error:", error.message);
      const table = document.querySelector("table");
      if (table) {
        table.style.display = "none";
      }
      alert("Došlo je do greške pri učitavanju podataka. Pokušaj ponovo.");
    });
}

async function deleteUser(id){
  await userService.delete(id)
  ucitajSve()
}

document.addEventListener("DOMContentLoaded", ucitajSve);
