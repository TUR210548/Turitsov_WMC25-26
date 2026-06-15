// Anfang von Globale Variablen & Speicher-Initialisierung
const pages = {
    home: document.getElementById('page-home'),
    dashboard: document.getElementById('page-dashboard'),
    favorites: document.getElementById('page-favorites')
};

const navLinks = {
    home: document.getElementById('nav-home'),
    dashboard: document.getElementById('nav-dashboard'),
    favorites: document.getElementById('nav-favorites')
};

// 1. Die Projekt-Liste aus dem Speicher holen
let favoritesArray = JSON.parse(localStorage.getItem('projectTeams')) || ["Projekt Alpha: Max Mustermann", "Projekt Beta: Anna Schmidt"];

// 2. NEU: Die Mitarbeiter-Datenbank ebenfalls lokal verwalten, damit Änderungen überall ankommen
let employeesArray = JSON.parse(localStorage.getItem('cachedEmployees')) || [];
// Ende von Globale Variablen


// Anfang von Seitensteuerung (Navigation)
function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.add('hidden'));
    Object.values(navLinks).forEach(link => link.classList.remove('active'));

    pages[pageName].classList.remove('hidden');
    navLinks[pageName].classList.add('active');
}

navLinks.home.addEventListener('click', () => showPage('home'));

// Wenn man aufs Dashboard klickt, rendern wir die Mitarbeiter aus dem lokalen Speicher
navLinks.dashboard.addEventListener('click', () => {
    showPage('dashboard');
    renderEmployeeCards(); 
});

navLinks.favorites.addEventListener('click', () => {
    showPage('favorites');
    renderFavorites(); 
});
document.getElementById('btn-start').addEventListener('click', () => {
    showPage('dashboard');
    renderEmployeeCards();
});
// Ende von Seitensteuerung


// Anfang von API-Anbindung & Karten-Erzeugung (Dashboard)
document.getElementById('btn-load-data').addEventListener('click', fetchEmployeesFromAPI);

async function fetchEmployeesFromAPI() {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden');

    try {
        // Live-Abruf von der Public API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // Die API-Daten für unsere Zwecke umformen und lokal speichern
        employeesArray = data.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            company: item.company.name
        }));

        // Im LocalStorage sichern
        localStorage.setItem('cachedEmployees', JSON.stringify(employeesArray));
        
        loader.classList.add('hidden');
        renderEmployeeCards(); // Karten zeichnen

    } catch (error) {
        loader.textContent = "Fehler beim Abrufen der Mitarbeiterdaten.";
        console.error("Fetch-Error:", error);
    }
}

// Hilfsfunktion: Zeichnet die Team-Karten auf Basis des lokalen employeesArray
function renderEmployeeCards() {
    const container = document.getElementById('data-container');
    container.innerHTML = ""; 

    if (employeesArray.length === 0) {
        container.innerHTML = "<p>Noch keine Daten geladen. Bitte klicken Sie auf den Button oben.</p>";
        return;
    }

    employeesArray.forEach(employee => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <h3>${employee.name}</h3>
            <p><strong>Rolle:</strong> Developer</p>
            <p><strong>Abteilung:</strong> ${employee.company}</p>
            <p><strong>Kontakt:</strong> ${employee.email}</p>
        `;
        
        const addBtn = document.createElement('button');
        addBtn.textContent = "In Projekt einplanen";
        addBtn.style.backgroundColor = "#10b981"; 
        
        addBtn.addEventListener('click', () => {
            // Wir speichern hier nur den Namen, um ihn später auf Seite 3 sauber trennen und bearbeiten zu können
            const eintragText = `Projekt-Zuweisung: ${employee.name}`;
            if (!favoritesArray.includes(eintragText)) {
                favoritesArray.push(eintragText); 
                localStorage.setItem('projectTeams', JSON.stringify(favoritesArray));
                alert(`${employee.name} wurde für die Projekt-Planung vorgemerkt.`);
            }
        });

        card.appendChild(addBtn); 
        container.appendChild(card); 
    });
}
// Ende von API-Anbindung


// Anfang von Projekt-Planung (Löschen & Synchronisierter DOM-Austausch)
function renderFavorites() {
    const list = document.getElementById('favorites-list');
    list.innerHTML = "";

    if (favoritesArray.length === 0) {
        list.innerHTML = "<li>Keine aktiven Projekt-Zuweisungen vorhanden.</li>";
        return;
    }

    favoritesArray.forEach((fav, index) => {
        const li = document.createElement('li');
        li.style.margin = "12px 0";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.background = "#ffffff";
        li.style.padding = "12px 18px";
        li.style.borderRadius = "6px";
        li.style.border = "1px solid #e2e8f0";

        const textSpan = document.createElement('span');
        textSpan.textContent = fav;
        li.appendChild(textSpan);

        const btnContainer = document.createElement('div');

        // BEARBEITEN-BUTTON (Ändert den Namen auf BEIDEN Seiten)
        const editBtn = document.createElement('button');
        editBtn.textContent = "Bearbeiten";
        editBtn.style.backgroundColor = "#f59e0b"; 
        editBtn.style.marginTop = "0";
        editBtn.style.marginRight = "8px";
        editBtn.style.padding = "6px 12px";
        editBtn.style.fontSize = "0.85rem";

        editBtn.addEventListener('click', () => {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = favoritesArray[index];
            inputField.style.padding = "4px 8px";
            inputField.style.borderRadius = "4px";
            inputField.style.border = "1px solid #cbd5e1";

            inputField.addEventListener('blur', () => {
                const newValue = inputField.value.trim();
                if (newValue !== "") {
                    
                    // ALTEN NAMEN HERAUSFILTERN (um ihn im Mitarbeiter-Array zu suchen)
                    const alterName = favoritesArray[index].replace("Projekt-Zuweisung: ", "");
                    const neuerName = newValue.replace("Projekt-Zuweisung: ", "");

                    // 1. In der Projekt-Planung aktualisieren
                    favoritesArray[index] = newValue; 
                    localStorage.setItem('projectTeams', JSON.stringify(favoritesArray));
                    
                    // 2. JETZT NEU: Den Namen synchron auch im Mitarbeiter-Array (Dashboard) ändern!
                    const mitarbeiter = employeesArray.find(e => e.name === alterName);
                    if (mitarbeiter) {
                        mitarbeiter.name = neuerName;
                        localStorage.setItem('cachedEmployees', JSON.stringify(employeesArray));
                    }

                    // DOM-Austausch abschließen
                    const newTextSpan = document.createElement('span');
                    newTextSpan.textContent = newValue;
                    
                    inputField.replaceWith(newTextSpan); 
                    renderFavorites();
                }
            });

            textSpan.replaceWith(inputField); 
            inputField.focus(); 
        });

        // LÖSCH-BUTTON
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Entfernen";
        deleteBtn.style.backgroundColor = "#ef4444"; 
        deleteBtn.style.marginTop = "0";
        deleteBtn.style.padding = "6px 12px";
        deleteBtn.style.fontSize = "0.85rem";
        
        deleteBtn.addEventListener('click', () => {
            favoritesArray.splice(index, 1); 
            localStorage.setItem('projectTeams', JSON.stringify(favoritesArray));
            renderFavorites(); 
        });

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        li.appendChild(btnContainer);
        list.appendChild(li); 
    });
}
// Ende von Projekt-Planung