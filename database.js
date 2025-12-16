/* ================================================================
    PROGETTO: Wilde UDA (Inglese + Sistemi)
    FILE: database.js
    DESCRIZIONE: Questo file agisce come BACKEND simulato.
    Contiene i dati (JSON), la logica di applicazione e gestione eventi.
    ================================================================
*/


/* [SEZIONE 1: IL DATABASE]
    Struttura Dati: Array di Oggetti (JSON).
    Ogni oggetto rappresenta un record informativo completo.
    Questa struttura simula la risposta che arriverebbe da un server reale.
*/
const aforismiDatabase = [
    {
        id: 1,
        source: "De Profundis",
        text: "Be yourself; everyone else is already taken.",
        translation: "Sii te stesso; tutto il resto è già stato preso.",
        grammarRule: "Imperative Mode & Reflexive Pronouns (Yourself)",
        difficulty: "Beginner"
    },
    {
        id: 2,
        source: "Lady Windermere's Fan",
        text: "I can resist everything except temptation.",
        translation: "Posso resistere a tutto tranne che alle tentazioni.",
        grammarRule: "Modal Verbs (Can) & Prepositions (Except)",
        difficulty: "Beginner"
    },
    {
        id: 3,
        source: "The Importance of Being Earnest",
        text: "The truth is rarely pure and never simple.",
        translation: "La verità è raramente pura e non è mai semplice.",
        grammarRule: "Frequency Adverbs (Rarely, Never) & Adjectives",
        difficulty: "Intermediate"
    }
    // Nota: Qui è possibile aggiungere infiniti altri oggetti separati da virgola
];


/* [SEZIONE 2: MOTORE DI RENDERING]
    Funzione: renderApp(dataToRender)
    Scopo: Prende i dati grezzi e costruisce l'HTML visibile all'utente (DOM Manipulation).
    Input: Un array di aforismi (o tutto il database, o i risultati filtrati).
*/
function renderApp(dataToRender) {
    // 1. Identifichiamo il contenitore nella pagina HTML
    const root = document.getElementById('app-root');
    
    // 2. Pulizia: Rimuoviamo tutto ciò che c'era prima (reset della vista)
    root.innerHTML = ''; 

    // 3. Gestione Caso Vuoto: Se la ricerca non produce risultati
    if (dataToRender.length === 0) {
        root.innerHTML = '<p style="text-align:center; color:#999;">Nessun risultato trovato.</p>';
        return; // Esce dalla funzione
    }

    // 4. Ciclo di Generazione: Per ogni aforisma, creiamo una "Card"
    dataToRender.forEach(item => {
        // Creazione dell'elemento contenitore
        const card = document.createElement('div');
        card.className = 'card';

        // Inserimento del contenuto HTML tramite Template Literals (backticks `)
        // Nota: Le parti ${...} sono variabili dinamiche
        card.innerHTML = `
            <span class="source-tag">${item.source}</span>
            
            <div class="english-row">
                <span class="quote-en">"${item.text}"</span>
                <button class="btn-audio" onclick="speak('${item.text.replace(/'/g, "\\'")}')">🔊</button>
            </div>

            <div class="translation-row">
                <small>TRADUZIONE:</small><br>
                <span class="blur-text">${item.translation}</span>
            </div>

            <div class="grammar-box">
                <span class="grammar-title">⚡ Focus Grammaticale:</span>
                ${item.grammarRule}
            </div>
        `;

        // 5. Iniezione: Aggiungiamo la card appena creata alla pagina
        root.appendChild(card);
    });
}


/* [SEZIONE 3: MOTORE DI RICERCA (FILTERING)]
    Logica: Ascolta cosa scrive l'utente e filtra l'array del database.
    Evento: 'keyup' (si attiva ogni volta che un tasto viene rilasciato).
*/
const searchInput = document.getElementById('searchBar');

searchInput.addEventListener('keyup', (e) => {
    // 1. Prende il testo scritto e lo converte in minuscolo (per ignorare Maiuscole/minuscole)
    const searchString = e.target.value.toLowerCase();
    
    // 2. Filtra il database
    const filteredData = aforismiDatabase.filter(item => {
        // Controlla se il testo inglese O la traduzione contengono la parola cercata
        return item.text.toLowerCase().includes(searchString) || 
               item.translation.toLowerCase().includes(searchString);
    });

    // 3. Ridisegna l'app mostrando solo i risultati trovati
    renderApp(filteredData);
});


/* [SEZIONE 4: API AUDIO (TEXT-TO-SPEECH)]
    Scopo: Utilizzare la sintesi vocale del browser.
*/
function speak(text) {
    // Interrompe se stava già parlando
    window.speechSynthesis.cancel();
    
    // Configura la "voce"
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // Imposta British English
    utterance.rate = 0.8;     // Rallenta leggermente la velocità (Didattica)
    
    // Esegue
    window.speechSynthesis.speak(utterance);
}


/* [SEZIONE 5: GESTIONE INTERFACCIA (MODALE)]
    Scopo: Aprire e chiudere la finestra del Manuale Tecnico.
    Questa è la funzione che mancava prima!
*/
function toggleModal() {
    const modal = document.getElementById('techModal');
    
    // Logica Toggle: Se è nascosto lo mostra, se è visibile lo nasconde
    // Nota: window.getComputedStyle serve a leggere lo stile attuale
    const currentStyle = window.getComputedStyle(modal).display;

    if (currentStyle === 'none') {
        modal.style.display = 'flex'; // Mostra (Flexbox per centrare)
    } else {
        modal.style.display = 'none'; // Nascondi
    }
}

// Chiude il modale se l'utente clicca sulla parte scura (fuori dalla scatola bianca)
window.onclick = function(event) {
    const modal = document.getElementById('techModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


/* [SEZIONE 6: INIZIALIZZAZIONE]
    Avvia l'applicazione appena il file viene caricato,
    mostrando tutto il database completo.
*/
renderApp(aforismiDatabase);
