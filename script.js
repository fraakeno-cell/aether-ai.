const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const newChatBtn = document.getElementById('newChatBtn');

// Messages de bienvenue
const welcomeMessage = `Bonjour ! Je suis **AETHER AI**, votre assistant intelligent.

Je peux vous aider avec :
• Des questions générales
• Des explications
• Des idées créatives
• Et bien plus encore

Comment puis-je vous aider aujourd'hui ?`;

// Ajouter le message de bienvenue au démarrage
window.addEventListener('DOMContentLoaded', () => {
    addMessage(welcomeMessage, 'ai');
});

// Envoyer avec Entrée (Shift+Entrée = nouvelle ligne)
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Auto-resize du textarea
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
});

sendBtn.addEventListener('click', sendMessage);
newChatBtn.addEventListener('click', resetChat);

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Afficher le message de l'utilisateur
    addMessage(text, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';
    sendBtn.disabled = true;

    // Afficher l'indicateur de frappe
    showTyping();

    // Simuler un délai de réponse
    setTimeout(() => {
        removeTyping();
        const reply = generateReply(text);
        addMessage(reply, 'ai');
        sendBtn.disabled = false;
        userInput.focus();
    }, 800 + Math.random() * 800);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = sender === 'user' 
        ? '<i class="fas fa-user"></i>' 
        : '<i class="fas fa-bolt"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Support basique du markdown (**texte**)
    bubble.innerHTML = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);

    // Scroll vers le bas
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai';
    typingDiv.id = 'typing';

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = '<i class="fas fa-bolt"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = `
        <div class="typing">
            <span></span><span></span><span></span>
        </div>
    `;

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(bubble);
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
}

function resetChat() {
    messagesContainer.innerHTML = '';
    addMessage(welcomeMessage, 'ai');
    userInput.focus();
}

// ===== Réponses simulées d'AETHER =====
function generateReply(userText) {
    const text = userText.toLowerCase();

    // Salutations
    if (text.match(/bonjour|salut|hello|hey|coucou/)) {
        return "Bonjour ! Content de vous parler. Que puis-je faire pour vous ?";
    }

    // Qui es-tu
    if (text.match(/qui es[- ]tu|tu es qui|présente[- ]toi|ton nom/)) {
        return "Je suis **AETHER AI**, un assistant intelligent créé pour vous aider. Je suis là pour répondre à vos questions, vous conseiller et discuter avec vous.";
    }

    // Comment ça va
    if (text.match(/comment ça va|ça va|tu vas bien/)) {
        return "Je vais très bien, merci ! Et vous, comment allez-vous aujourd'hui ?";
    }

    // Merci
    if (text.match(/merci|thanks|thank you/)) {
        return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.";
    }

    // Aide
    if (text.match(/aide|help|que peux[- ]tu faire/)) {
        return `Je peux vous aider avec de nombreuses choses :

• Répondre à des questions
• Expliquer des concepts
• Donner des idées
• Aider à rédiger des textes
• Discuter librement

Posez-moi simplement votre question !`;
    }

    // Blague
    if (text.match(/blague|joke|rire|drôle/)) {
        const jokes = [
            "Pourquoi les programmeurs confondent-ils Halloween et Noël ? Parce que OCT 31 = DEC 25 !",
            "Qu'est-ce qu'un développeur a dit à un autre développeur ? « On se commit demain ? »",
            "Pourquoi l'IA est-elle allée chez le médecin ? Parce qu'elle avait un bug !"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Heure
    if (text.match(/quelle heure|heure actuelle/)) {
        const now = new Date();
        return `Il est actuellement **${now.toLocaleTimeString('fr-FR')}**.`;
    }

    // Date
    if (text.match(/quelle date|date du jour|aujourd'hui/)) {
        const now = new Date();
        return `Nous sommes le **${now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}**.`;
    }

    // Réponse par défaut
    const defaults = [
        `Intéressant ! À propos de « ${userText} », je dirais que c'est un sujet fascinant. Pouvez-vous m'en dire un peu plus ?`,
        `Merci pour votre message. Voici ce que je peux vous dire : je suis encore en phase d'apprentissage, mais je ferai de mon mieux pour vous aider sur ce sujet.`,
        `Bonne question ! Malheureusement je n'ai pas encore de connexion à une vraie intelligence artificielle avancée. Pour l'instant je fonctionne avec des réponses simulées. Mais vous pouvez déjà tester l'interface !`,
        `Je comprends votre demande concernant « ${userText} ». Souhaitez-vous que je développe un point en particulier ?`
    ];

    return defaults[Math.floor(Math.random() * defaults.length)];
}