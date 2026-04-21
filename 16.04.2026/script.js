import persons from "./persons.json" with { type: "json" };

let personsList = [...persons];

function renderPersons() {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
    for (const person of personsList) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.groesse}</td>
            <td>${person.geburtsdatum}</td>
            <td>${person.herkunft}</td>
            <td>${person.gewicht}</td>
        `;
        tbody.appendChild(tr);
    }
}

document.querySelector("#id").addEventListener("click", () => {
    personsList.sort((a, b) => a.id - b.id);
    renderPersons();
});

document.querySelector("#name").addEventListener("click", () => {
    personsList.sort((a, b) => a.name.localeCompare(b.name));
    renderPersons();
});

document.querySelector("#height").addEventListener("click", () => {
    personsList.sort((a, b) => a.groesse - b.groesse);
    renderPersons();
});

document.querySelector("#birthdate").addEventListener("click", () => {
    personsList.sort((a, b) => a.geburtsdatum.localeCompare(b.geburtsdatum));
    renderPersons();
});

document.querySelector("#origin").addEventListener("click", () => {
    personsList.sort((a, b) => a.herkunft.localeCompare(b.herkunft));
    renderPersons();
});

document.querySelector("#weight").addEventListener("click", () => {
    personsList.sort((a, b) => a.gewicht - b.gewicht);
    renderPersons();
});

renderPersons();