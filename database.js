/* ================================================================
    PROGETTO: Wilde UDA (Inglese + Sistemi)
    FILE: database.js
    
    DESCRIZIONE: Questo file è il BACKEND simulato.
    Non tocca la grafica, ma gestisce i dati e la logica.
   ================================================================ */


/* [SEZIONE 1: IL DATABASE]
    Array di Oggetti JSON. Simula la risposta di un server.
    Ogni graffa {} è un record.
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
];


/* [SEZIONE 2: MOTORE DI RENDERING]
    Funzione: renderApp(data)
    Scopo: Manipolazione DOM. Prende i dati e costruisce l'HTML.
*/
function renderApp(dataToRender) {
    // 1. Troviamo il contenitore "app-root" nell'HTML
    const root = document.getElementById('app-root');
    
    // 2. Puliamo il contenitore (Reset)
    root.innerHTML = ''; 

    // 3. Gestione errore "Nessun risultato"
    if (dataToRender.length === 0) {
        root.innerHTML = '<p style="text-align:center; color:#999;">Nessun risultato trovato.</p>';
        return;
    }

    // 4. Ciclo (Loop): Per ogni aforisma, creiamo una Card
    dataToRender.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card'; // Assegniamo la classe per il CSS
        
        // Inseriamo l'HTML dinamico (Template Literal)
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
        
        // Appendiamo la card al contenitore principale
        root.appendChild(card);
    });
}


/* [SEZIONE 3: GESTIONE EVENTI (RICERCA)]
    Event Listener che ascolta la tastiera.
*/
const searchInput = document.getElementById('searchBar');

searchInput.addEventListener('keyup', (e) => {
    // 1. Leggi cosa ha scritto l'utente
    const searchString = e.target.value.toLowerCase();
    
    // 2. Filtra l'array del database
    const filteredData = aforismiDatabase.filter(item => {
        return item.text.toLowerCase().includes(searchString) || 
               item.translation.toLowerCase().includes(searchString);
    });

    // 3. Ridisegna l'app con i nuovi dati filtrati
    renderApp(filteredData);
});


/* [SEZIONE 4: API AUDIO]
    Funzione per la sintesi vocale.
*/
function speak(text) {
    window.speechSynthesis.cancel(); // Ferma eventuali audio precedenti
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // Inglese Britannico
    utterance.rate = 0.8;     // Velocità ridotta
    window.speechSynthesis.speak(utterance);
}


/* [SEZIONE 5: GESTIONE MODALI (MANUALI)]
    Logica per aprire/chiudere le finestre di aiuto.
*/

// Apre il modale specifico passato come parametro (id)
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Chiude il modale specifico
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Chiude qualsiasi modale se clicco fuori (sullo sfondo scuro)
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
}


/* [SEZIONE 6: AVVIO]
    Lancia l'applicazione al caricamento pagina.
*/
renderApp(aforismiDatabase);
