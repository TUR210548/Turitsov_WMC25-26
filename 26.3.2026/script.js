function holeBrief(inhalt) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(inhalt);
        }, 1000);
    });
}

function stempelBrief(brief) {
    return new Promise((resolve) => {
        resolve(brief + " [Gestempelt]");
    });
}

function versendeBrief(brief) {
    return new Promise((resolve) => {
        resolve(brief + " -> Versendet!");
    });
}

holeBrief("Mein Liebesbrief")
    .then(brief => stempelBrief(brief))
    .then(gestempelterBrief => versendeBrief(gestempelterBrief))
    .then(finalerStatus => {
        console.log(finalerStatus);
    });