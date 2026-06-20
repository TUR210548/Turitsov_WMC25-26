// ==========================================
// Stufe 1: Einfaches Promise
// ==========================================

function holeBrief(inhalt) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(inhalt);
    }, 1000); // 1 Sekunde Verzögerung
  });
}

// ==========================================
// Stufe 2: Promise Chaining (Die Helfer-Funktionen)
// ==========================================

function stempelBrief(brief) {
  return new Promise((resolve) => {
    // Nimmt den Brief und hängt " [Gestempelt]" an
    resolve(brief + " [Gestempelt]");
  });
}

function versendeBrief(brief) {
  return new Promise((resolve) => {
    // Nimmt den gestempelten Brief und hängt " -> Versendet!" an
    resolve(brief + " -> Versendet!");
  });
}

// ==========================================
// Ausführung: Die Funktionen mit .then() verketten
// ==========================================

console.log("Prozess gestartet... Bitte 1 Sekunde warten.");

holeBrief("Liebesbrief")
  .then((brief) => {
    console.log("Schritt 1 abgeschlossen:", brief);
    // Weitergabe an die Stempel-Funktion
    return stempelBrief(brief);
  })
  .then((gestempelterBrief) => {
    console.log("Schritt 2 abgeschlossen:", gestempelterBrief);
    // Weitergabe an die Versand-Funktion
    return versendeBrief(gestempelterBrief);
  })
  .then((finalerStatus) => {
    // Das Endergebnis nach der gesamten Kette
    console.log("\nErgebnis des Chaining:");
    console.log(finalerStatus);
  })
  .catch((error) => {
    // Falls irgendwo ein Fehler auftreten würde
    console.error("Es gab einen Fehler im Prozess:", error);
  });