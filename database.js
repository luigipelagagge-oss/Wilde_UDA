/* ================================================================
    PROGETTO: Wilde UDA (Inglese + Sistemi)
    FILE: database.js
    VERSIONE: 7.0 (Database Completo: 30 Aforismi + Logica Didattica)
    
    DESCRIZIONE: Questo file è il BACKEND simulato.
    Contiene i dati (Aforismi) e le funzioni che gestiscono l'interattività
    (bottoni, ricerca, audio, visualizzazione codice).
   ================================================================ */


/* [SEZIONE 1: IL DATABASE]
    Array di Oggetti JSON. Simula la risposta di un server.
    Ogni graffa {} è un record contenente: testo, traduzione, fonte e regola grammaticale.
*/
const aforismiDatabase = [
    // --- IDENTITY & SELF ---
    {
        id: 1,
        source: "De Profundis",
        text: "Be yourself; everyone else is already taken.",
        translation: "Sii te stesso; tutto il resto è già stato preso.",
        grammarRule: "Imperative Mode & Reflexive Pronouns",
        difficulty: "Beginner"
    },
    {
        id: 2,
        source: "An Ideal Husband",
        text: "To love oneself is the beginning of a lifelong romance.",
        translation: "Amare se stessi è l'inizio di una storia d'amore lunga una vita.",
        grammarRule: "Gerunds vs Infinitives & Reflexive (Oneself)",
        difficulty: "Intermediate"
    },
    {
        id: 3,
        source: "De Profundis",
        text: "Most people are other people. Their thoughts are someone else's opinions.",
        translation: "La maggior parte delle persone sono altre persone. I loro pensieri sono opinioni di qualcun altro.",
        grammarRule: "Saxon Genitive (Someone else's)",
        difficulty: "Intermediate"
    },

    // --- TEMPTATION & MORALITY ---
    {
        id: 4,
        source: "Lady Windermere's Fan",
        text: "I can resist everything except temptation.",
        translation: "Posso resistere a tutto tranne che alle tentazioni.",
        grammarRule: "Modal Verbs (Can) & Prepositions",
        difficulty: "Beginner"
    },
    {
        id: 5,
        source: "The Picture of Dorian Gray",
        text: "The only way to get rid of a temptation is to yield to it.",
        translation: "L'unico modo per liberarsi di una tentazione è cedervi.",
        grammarRule: "Infinitives of Purpose (To get, To yield)",
        difficulty: "Advanced"
    },
    {
        id: 6,
        source: "An Ideal Husband",
        text: "Morality is simply the attitude we adopt towards people we personally dislike.",
        translation: "La moralità è semplicemente l'atteggiamento che adottiamo verso le persone che ci stanno antipatiche.",
        grammarRule: "Defining Relative Clauses (Omessi 'that')",
        difficulty: "Advanced"
    },
    {
        id: 7,
        source: "The Picture of Dorian Gray",
        text: "The books that the world calls immoral are books that show the world its own shame.",
        translation: "I libri che il mondo chiama immorali sono libri che mostrano al mondo la sua stessa vergogna.",
        grammarRule: "Relative Clauses (That) & Possessives",
        difficulty: "Intermediate"
    },

    // --- LIFE & SOCIETY ---
    {
        id: 8,
        source: "Lady Windermere's Fan",
        text: "We are all in the gutter, but some of us are looking at the stars.",
        translation: "Siamo tutti nel fango, ma alcuni di noi guardano alle stelle.",
        grammarRule: "Present Continuous & Prepositions of Place",
        difficulty: "Intermediate"
    },
    {
        id: 9,
        source: "The Picture of Dorian Gray",
        text: "Nowadays people know the price of everything and the value of nothing.",
        translation: "Oggi la gente conosce il prezzo di tutto e il valore di niente.",
        grammarRule: "Indefinite Pronouns (Everything, Nothing)",
        difficulty: "Intermediate"
    },
    {
        id: 10,
        source: "A Woman of No Importance",
        text: "Discontent is the first step in the progress of a man or a nation.",
        translation: "Lo scontento è il primo passo nel progresso di un uomo o di una nazione.",
        grammarRule: "Nouns & Articles (The first step)",
        difficulty: "Beginner"
    },
    {
        id: 11,
        source: "The Picture of Dorian Gray",
        text: "There is only one thing in the world worse than being talked about, and that is not being talked about.",
        translation: "C'è una sola cosa al mondo peggiore del far parlare di sé, ed è il non far parlare di sé.",
        grammarRule: "Comparatives (Worse than) & Passive Gerunds",
        difficulty: "Advanced"
    },
    {
        id: 12,
        source: "Personal Aphorism",
        text: "Fashion is a form of ugliness so intolerable that we have to alter it every six months.",
        translation: "La moda è una forma di bruttezza così intollerabile che dobbiamo cambiarla ogni sei mesi.",
        grammarRule: "Result Clauses (So... That) & Modals (Have to)",
        difficulty: "Advanced"
    },

    // --- TRUTH & EXPERIENCE ---
    {
        id: 13,
        source: "The Importance of Being Earnest",
        text: "The truth is rarely pure and never simple.",
        translation: "La verità è raramente pura e non è mai semplice.",
        grammarRule: "Adverbs of Frequency (Rarely, Never)",
        difficulty: "Intermediate"
    },
    {
        id: 14,
        source: "Lady Windermere's Fan",
        text: "Experience is simply the name we give our mistakes.",
        translation: "Esperienza è semplicemente il nome che diamo ai nostri errori.",
        grammarRule: "Simple Present & Possessive Adjectives",
        difficulty: "Beginner"
    },
    {
        id: 15,
        source: "Phrase",
        text: "Always forgive your enemies; nothing annoys them so much.",
        translation: "Perdona sempre i tuoi nemici; nulla li infastidisce così tanto.",
        grammarRule: "Imperative Mood & Object Pronouns (Them)",
        difficulty: "Beginner"
    },

    // --- ART & GENIUS ---
    {
        id: 16,
        source: "Customs Declaration (Biography)",
        text: "I have nothing to declare except my genius.",
        translation: "Non ho nulla da dichiarare tranne il mio genio.",
        grammarRule: "Indefinite Pronouns & Prepositions",
        difficulty: "Beginner"
    },
    {
        id: 17,
        source: "The Happy Prince",
        text: "I am so clever that sometimes I don't understand a single word of what I am saying.",
        translation: "Sono così intelligente che a volte non capisco una sola parola di ciò che dico.",
        grammarRule: "Consecutive Clauses (So... That)",
        difficulty: "Advanced"
    },
    {
        id: 18,
        source: "The Decay of Lying",
        text: "Life imitates Art far more than Art imitates Life.",
        translation: "La vita imita l'arte molto più di quanto l'arte imiti la vita.",
        grammarRule: "Comparatives (More than) & Present Simple",
        difficulty: "Intermediate"
    },

    // --- LOVE & MARRIAGE ---
    {
        id: 19,
        source: "A Woman of No Importance",
        text: "Who, being loved, is poor?",
        translation: "Chi, essendo amato, è povero?",
        grammarRule: "Passive Voice (Being loved)",
        difficulty: "Intermediate"
    },
    {
        id: 20,
        source: "The Picture of Dorian Gray",
        text: "Men marry because they are tired; women, because they are curious: both are disappointed.",
        translation: "Gli uomini si sposano perché sono stanchi; le donne perché sono curiose: entrambi rimangono delusi.",
        grammarRule: "Causal Connectors (Because) & Adjectives",
        difficulty: "Intermediate"
    },
    {
        id: 21,
        source: "A Woman of No Importance",
        text: "The Book of Life begins with a man and a woman in a garden. It ends with Revelations.",
        translation: "Il Libro della Vita inizia con un uomo e una donna in un giardino. Finisce con l'Apocalisse.",
        grammarRule: "Prepositions (With, In) & Present Simple",
        difficulty: "Intermediate"
    },
    {
        id: 22,
        source: "The Importance of Being Earnest",
        text: "I hope you have not been leading a double life, pretending to be wicked and being really good all the time.",
        translation: "Spero che tu non abbia condotto una doppia vita, fingendo di essere cattivo ed essendo in realtà buono tutto il tempo.",
        grammarRule: "Present Perfect Continuous & Gerunds",
        difficulty: "Advanced"
    },

    // --- YOUTH & AGE ---
    {
        id: 23,
        source: "The Picture of Dorian Gray",
        text: "Youth is the only thing worth having.",
        translation: "La giovinezza è l'unica cosa che valga la pena possedere.",
        grammarRule: "Worth + -ING form",
        difficulty: "Intermediate"
    },
    {
        id: 24,
        source: "A Woman of No Importance",
        text: "The old believe everything, the middle-aged suspect everything, the young know everything.",
        translation: "I vecchi credono a tutto, gli uomini di mezza età sospettano di tutto, i giovani sanno tutto.",
        grammarRule: "Collective Nouns (The old, The young)",
        difficulty: "Intermediate"
    },
    {
        id: 25,
        source: "Lady Windermere's Fan",
        text: "I am not young enough to know everything.",
        translation: "Non sono abbastanza giovane per sapere tutto.",
        grammarRule: "Adjectives + Enough",
        difficulty: "Beginner"
    },
    
    // --- WIT & CYNICISM ---
    {
        id: 26,
        source: "Lady Windermere's Fan",
        text: "I can resist everything except temptation.",
        translation: "Posso resistere a tutto tranne alle tentazioni.",
        grammarRule: "Prepositions (Except)",
        difficulty: "Beginner"
    },
    {
        id: 27,
        source: "The Soul of Man under Socialism",
        text: "To live is the rarest thing in the world. Most people exist, that is all.",
        translation: "Vivere è la cosa più rara al mondo. La maggior parte della gente esiste, e nulla più.",
        grammarRule: "Superlatives (The rarest) & Infinitives",
        difficulty: "Intermediate"
    },
    {
        id: 28,
        source: "Phrases and Philosophies",
        text: "Wickedness is a myth invented by good people to account for the curious attractiveness of others.",
        translation: "La malvagità è un mito inventato dalla brava gente per spiegare il curioso fascino degli altri.",
        grammarRule: "Passive Voice (Invented by) & Infinitives of Purpose",
        difficulty: "Advanced"
    },
    {
        id: 29,
        source: "The Importance of Being Earnest",
        text: "If I am occasionally a little over-dressed, I make up for it by being always immensely over-educated.",
        translation: "Se occasionalmente sono un po' troppo vestito, compenso essendo sempre immensamente troppo istruito.",
        grammarRule: "Zero Conditional & Phrasal Verbs (Make up for)",
        difficulty: "Advanced"
    },
    {
        id: 30,
        source: "The Picture of Dorian Gray",
        text: "To define is to limit.",
        translation: "Definire significa limitare.",
        grammarRule: "Infinitives as Subject",
        difficulty: "Beginner"
    }
];


/* [SEZIONE 2: MOTORE DI RENDERING]
    Funzione: renderApp(data)
    Scopo: Manipolazione DOM. Prende i dati e costruisce l'HTML.
    Questa funzione viene chiamata all'avvio e ogni volta che si cerca qualcosa.
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
    Event Listener che ascolta la tastiera e filtra i dati.
*/
const searchInput = document.getElementById('searchBar');

searchInput.addEventListener('keyup', (e) => {
    // 1. Leggi cosa ha scritto l'utente e converti in minuscolo
    const searchString = e.target.value.toLowerCase();
    
    // 2. Filtra l'array del database
    // Controlla se il testo cercato è presente nel Testo Inglese, Traduzione o Fonte
    const filteredData = aforismiDatabase.filter(item => {
        return item.text.toLowerCase().includes(searchString) || 
               item.translation.toLowerCase().includes(searchString) ||
               item.source.toLowerCase().includes(searchString);
    });

    // 3. Ridisegna l'app con i nuovi dati filtrati
    renderApp(filteredData);
});


/* [SEZIONE 4: API AUDIO]
    Funzione per la sintesi vocale (Text-to-Speech).
*/
function speak(text) {
    window.speechSynthesis.cancel(); // Ferma eventuali audio precedenti
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB'; // Inglese Britannico
    utterance.rate = 0.8;     // Velocità ridotta per chiarezza
    window.speechSynthesis.speak(utterance);
}


/* [SEZIONE 5: GESTIONE MODALI (MANUALI)]
    Logica per aprire/chiudere le finestre di aiuto.
    Queste funzioni sono collegate ai bottoni nel file HTML.
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


/* [SEZIONE 6: VISUALIZZATORE CODICE (SELF-REFLECTION)]
   Questa funzione permette di vedere il codice sorgente dentro la pagina stessa.
   È la parte di "metacognizione": lo studente vede come è fatto il software che usa.
*/
function viewSource(fileType) {
    // Chiudiamo il modale tecnico per evitare sovrapposizioni
    closeModal('techModal');
    
    // Apriamo il modale del visualizzatore codice
    openModal('codeViewerModal');
    
    const displayArea = document.getElementById('codeDisplayArea');
    const titleArea = document.getElementById('codeTitle');

    if (fileType === 'html') {
        titleArea.innerText = "📄 Codice Sorgente HTML (index.html)";
        // document.documentElement.outerHTML prende tutto l'HTML attuale della pagina
        const htmlCode = document.documentElement.outerHTML;
        displayArea.innerText = htmlCode;
    
    } else if (fileType === 'js') {
        titleArea.innerText = "⚙️ Codice Sorgente JavaScript (database.js)";
        
        // Tenta di scaricare il file .js stesso per leggerlo
        fetch('database.js')
            .then(response => response.text())
            .then(text => {
                displayArea.innerText = text;
            })
            .catch(error => {
                // Gestione errore se il browser blocca la lettura locale
                displayArea.innerText = "⚠️ AVVISO DI SICUREZZA BROWSER:\n\n" +
                "Il browser sta bloccando la lettura del file database.js perché non stai usando un Server Web.\n" +
                "Per vedere questo codice, apri il file 'database.js' con il Blocco Note.";
            });
    }
}


/* [SEZIONE 7: AVVIO]
    Lancia l'applicazione al caricamento pagina.
*/
renderApp(aforismiDatabase);
