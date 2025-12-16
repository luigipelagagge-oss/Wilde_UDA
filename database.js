/* * UDA SISTEMI: STRUTTURA DATI
 * Utilizziamo un Array di Oggetti (JSON-like) per immagazzinare la conoscenza.
 * Ogni oggetto rappresenta un record nel nostro database.
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
    // Qui gli studenti potranno aggiungere altri 100 record...
];

/*
 * UDA SISTEMI: LOGICA DI PRESENTAZIONE (DOM MANIPULATION)
 * Questa funzione prende i dati grezzi e costruisce l'HTML.
 */
function renderApp() {
    const root = document.getElementById('app-root');
    
    // Ciclo For-Each: per ogni elemento nel database...
    aforismiDatabase.forEach(item => {
        
        // 1. Creiamo l'elemento HTML wrapper
        const card = document.createElement('div');
        card.className = 'card';

        // 2. Costruiamo il contenuto HTML usando i Template Literals (`...`)
        // Notare come inseriamo le variabili ${item.text} dentro l'HTML
        card.innerHTML = `
            <span class="source-tag">Opera: ${item.source}</span>
            
            <div class="english-row">
                <span class="quote-en">"${item.text}"</span>
                <button class="btn-audio" onclick="speak('${item.text.replace(/'/g, "\\'")}')">🔊</button>
            </div>

            <div class="translation-row">
                <small>TRADUZIONE (Hover to reveal):</small><br>
                <span class="blur-text">${item.translation}</span>
            </div>

            <div class="grammar-box">
                <span class="grammar-title">⚡ Focus Grammaticale:</span>
                ${item.grammarRule}
            </div>
        `;

        // 3. Aggiungiamo la scheda alla pagina
        root.appendChild(card);
    });
}

/*
 * UDA SISTEMI: INTEGRAZIONE API ESTERNE
 * Utilizzo della Web Speech API del browser per la sintesi vocale.
 */
function speak(text) {
    // Interrompe eventuali audio precedenti
    window.speechSynthesis.cancel();
    
    // Crea l'oggetto "discorso"
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // Impostiamo British English per Wilde
    utterance.rate = 0.8;     // Velocità ridotta per fini didattici
    
    // Esegue
    window.speechSynthesis.speak(utterance);
}

// Avvia l'applicazione quando il file è caricato
renderApp();
