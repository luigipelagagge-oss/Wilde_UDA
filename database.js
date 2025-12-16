/* ================================================================
   FILE: database.js
   LOGICA DI SISTEMA E GESTIONE DATI
   ================================================================ */

/* --- 1. IL DATABASE DEGLI AFORISMI --- */
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

/* --- 2. MOTORE DI RENDERING (COSTRUTTORE DI PAGINA) --- */
function renderApp(dataToRender) {
    const root = document.getElementById('app-root');
    root.innerHTML = ''; 

    if (dataToRender.length === 0) {
        root.innerHTML = '<p style="text-align:center; color:#999;">Nessun risultato trovato.</p>';
        return;
    }

    dataToRender.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
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
        root.appendChild(card);
    });
}

/* --- 3. MOTORE DI RICERCA (LISTENER) --- */
const searchInput = document.getElementById('searchBar');

searchInput.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredData = aforismiDatabase.filter(item => {
        return item.text.toLowerCase().includes(searchString) || 
               item.translation.toLowerCase().includes(searchString);
    });
    renderApp(filteredData);
});

/* --- 4. FUNZIONE AUDIO --- */
function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
}

/* --- 5. GESTIONE MANUALI (MODALI MULTIPLI) --- */

// Funzione per APRIRE un modale specifico (passando il suo ID)
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Funzione per CHIUDERE un modale specifico
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Chiusura globale cliccando fuori
window.onclick = function(event) {
    // Controlliamo se l'elemento cliccato ha la classe 'modal-overlay'
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
    }
}

/* --- 6. AVVIO --- */
renderApp(aforismiDatabase);
