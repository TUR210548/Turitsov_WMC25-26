import persons from "./persons.json" with { type: "json" };

function renderPersons() {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = ""; // Vorherigen Inhalt leeren

    for (const person of persons) {
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

// Event-Listener für das Sortieren nach Größe (Height)
const thHeight = document.querySelector("#height");
thHeight.addEventListener("click", () => {
    console.log("height clicked!");
    // Sortiert das Personen-Array aufsteigend nach der Eigenschaft 'groesse'
    persons.sort((a, b) => a.groesse - b.groesse);
    // Tabelle neu zeichnen
    renderPersons();
});

// Funktion beim Laden der Seite initial einmal ausführen
window.renderPersons = renderPersons;
renderPersons();