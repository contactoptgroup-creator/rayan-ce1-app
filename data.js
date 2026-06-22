// Data for Rayan CE1 Learning Application - Version enrichie
// Toutes les matières avec difficulté croissante

const SUBJECTS_DATA = {
    francais: {
        name: "Français",
        icon: "📖",
        color: "#3498db",
        fiches: [
            {
                id: 1, title: "L'alphabet", description: "Reconnaître les lettres", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Quelle lettre vient après B ?", options: ["A", "C", "D", "E"], answer: "C" },
                    { type: "qcm", question: "Quelle lettre vient avant F ?", options: ["D", "E", "G", "H"], answer: "E" },
                    { type: "input", question: "Combien y a-t-il de lettres dans l'alphabet ?", answer: "26" },
                    { type: "qcm", question: "Quelle est la dernière lettre de l'alphabet ?", options: ["X", "Y", "Z", "W"], answer: "Z" },
                    { type: "qcm", question: "Quelle lettre est une voyelle ?", options: ["B", "C", "E", "F"], answer: "E" }
                ]
            },
            {
                id: 2, title: "Les voyelles", description: "a, e, i, o, u, y", difficulty: 1,
                exercises: [
                    { type: "input", question: "Combien y a-t-il de voyelles ?", answer: "6" },
                    { type: "qcm", question: "Laquelle n'est PAS une voyelle ?", options: ["a", "e", "b", "i"], answer: "b" },
                    { type: "qcm", question: "Quelle voyelle est dans le mot 'lune' ?", options: ["a", "e", "u", "o"], answer: "u" },
                    { type: "input", question: "Écris les voyelles dans l'ordre (sans espace)", answer: "aeiouy" },
                    { type: "qcm", question: "Combien de voyelles dans 'maison' ?", options: ["2", "3", "4", "5"], answer: "3" }
                ]
            },
            {
                id: 3, title: "Les syllabes", description: "Découper les mots", difficulty: 1,
                exercises: [
                    { type: "input", question: "Combien de syllabes dans 'papa' ?", answer: "2" },
                    { type: "input", question: "Combien de syllabes dans 'chocolat' ?", answer: "3" },
                    { type: "input", question: "Combien de syllabes dans 'éléphant' ?", answer: "3" },
                    { type: "input", question: "Combien de syllabes dans 'ami' ?", answer: "2" },
                    { type: "input", question: "Combien de syllabes dans 'ordinateur' ?", answer: "4" }
                ]
            },
            {
                id: 4, title: "Le nom", description: "Reconnaître les noms", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Lequel est un nom ?", options: ["manger", "chat", "beau", "vite"], answer: "chat" },
                    { type: "qcm", question: "Lequel est un nom propre ?", options: ["ville", "Paris", "chien", "livre"], answer: "Paris" },
                    { type: "qcm", question: "Lequel est un nom commun ?", options: ["Marie", "France", "table", "Lyon"], answer: "table" },
                    { type: "qcm", question: "Les noms propres commencent par...", options: ["une minuscule", "une majuscule", "un chiffre"], answer: "une majuscule" },
                    { type: "qcm", question: "Lequel n'est PAS un nom ?", options: ["fleur", "courir", "maison", "arbre"], answer: "courir" }
                ]
            },
            {
                id: 5, title: "Le verbe", description: "Reconnaître les verbes", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Lequel est un verbe ?", options: ["table", "manger", "bleu", "vite"], answer: "manger" },
                    { type: "qcm", question: "Quel verbe est dans 'Le chat dort' ?", options: ["Le", "chat", "dort"], answer: "dort" },
                    { type: "qcm", question: "L'infinitif de 'je mange' est...", options: ["mangé", "manger", "mangeant", "mange"], answer: "manger" },
                    { type: "qcm", question: "Lequel est un verbe ?", options: ["rapide", "courir", "jardin", "grand"], answer: "courir" },
                    { type: "qcm", question: "Dans 'Elle chante bien', le verbe est...", options: ["Elle", "chante", "bien"], answer: "chante" }
                ]
            },
            {
                id: 6, title: "L'adjectif", description: "Les mots qui décrivent", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Lequel est un adjectif ?", options: ["courir", "maison", "grand", "vite"], answer: "grand" },
                    { type: "qcm", question: "Dans 'un petit chat', l'adjectif est...", options: ["un", "petit", "chat"], answer: "petit" },
                    { type: "qcm", question: "Quel adjectif décrit une couleur ?", options: ["rapide", "bleu", "gros", "long"], answer: "bleu" },
                    { type: "qcm", question: "Le contraire de 'grand' est...", options: ["gros", "petit", "large", "haut"], answer: "petit" },
                    { type: "qcm", question: "Lequel n'est PAS un adjectif ?", options: ["beau", "joli", "marcher", "gentil"], answer: "marcher" }
                ]
            },
            {
                id: 7, title: "Le pluriel des noms", description: "Un ou plusieurs", difficulty: 2,
                exercises: [
                    { type: "input", question: "Le pluriel de 'chat' est...", answer: "chats" },
                    { type: "input", question: "Le pluriel de 'oiseau' est...", answer: "oiseaux" },
                    { type: "input", question: "Le pluriel de 'cheval' est...", answer: "chevaux" },
                    { type: "qcm", question: "Quel mot est au pluriel ?", options: ["chien", "maisons", "fleur", "arbre"], answer: "maisons" },
                    { type: "input", question: "Le pluriel de 'jeu' est...", answer: "jeux" }
                ]
            },
            {
                id: 8, title: "Masculin et féminin", description: "Le genre des noms", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "'La table' est...", options: ["masculin", "féminin"], answer: "féminin" },
                    { type: "qcm", question: "'Le livre' est...", options: ["masculin", "féminin"], answer: "masculin" },
                    { type: "input", question: "Le féminin de 'chat' est...", answer: "chatte" },
                    { type: "input", question: "Le féminin de 'lion' est...", answer: "lionne" },
                    { type: "input", question: "Le féminin de 'roi' est...", answer: "reine" }
                ]
            },
            {
                id: 9, title: "La phrase", description: "Construire des phrases", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Une phrase commence par...", options: ["un point", "une majuscule", "une virgule"], answer: "une majuscule" },
                    { type: "qcm", question: "Une phrase finit par...", options: ["une majuscule", "un point", "une virgule"], answer: "un point" },
                    { type: "qcm", question: "Laquelle est une phrase correcte ?", options: ["chat le dort", "Le chat dort.", "dort chat le"], answer: "Le chat dort." },
                    { type: "qcm", question: "Combien de mots dans 'Je mange une pomme' ?", options: ["3", "4", "5", "6"], answer: "4" },
                    { type: "qcm", question: "Le point d'interrogation sert à...", options: ["finir une phrase", "poser une question", "s'exclamer"], answer: "poser une question" }
                ]
            },
            {
                id: 10, title: "Présent - être et avoir", description: "Conjugaison de base", difficulty: 3,
                exercises: [
                    { type: "input", question: "Je ___ content. (être)", answer: "suis" },
                    { type: "input", question: "Tu ___ un frère. (avoir)", answer: "as" },
                    { type: "input", question: "Il ___ grand. (être)", answer: "est" },
                    { type: "input", question: "Nous ___ faim. (avoir)", answer: "avons" },
                    { type: "input", question: "Vous ___ gentils. (être)", answer: "êtes" },
                    { type: "input", question: "Ils ___ des jouets. (avoir)", answer: "ont" },
                    { type: "input", question: "Elle ___ belle. (être)", answer: "est" },
                    { type: "input", question: "J'___ 7 ans. (avoir)", answer: "ai" }
                ]
            },
            {
                id: 11, title: "Présent - verbes en -er", description: "Je chante, tu chantes...", difficulty: 3,
                exercises: [
                    { type: "input", question: "Je ___ à l'école. (marcher)", answer: "marche" },
                    { type: "input", question: "Tu ___ bien. (chanter)", answer: "chantes" },
                    { type: "input", question: "Il ___ au ballon. (jouer)", answer: "joue" },
                    { type: "input", question: "Nous ___ la télé. (regarder)", answer: "regardons" },
                    { type: "input", question: "Vous ___ français. (parler)", answer: "parlez" },
                    { type: "input", question: "Elles ___ la corde. (sauter)", answer: "sautent" },
                    { type: "input", question: "Je ___ un gâteau. (manger)", answer: "mange" },
                    { type: "input", question: "Tu ___ ta chambre. (ranger)", answer: "ranges" }
                ]
            },
            {
                id: 12, title: "Les contraires", description: "Le sens opposé", difficulty: 2,
                exercises: [
                    { type: "input", question: "Le contraire de 'grand' est...", answer: "petit" },
                    { type: "input", question: "Le contraire de 'chaud' est...", answer: "froid" },
                    { type: "input", question: "Le contraire de 'jour' est...", answer: "nuit" },
                    { type: "input", question: "Le contraire de 'vieux' est...", answer: "jeune" },
                    { type: "input", question: "Le contraire de 'rapide' est...", answer: "lent" },
                    { type: "input", question: "Le contraire de 'haut' est...", answer: "bas" },
                    { type: "input", question: "Le contraire de 'entrer' est...", answer: "sortir" },
                    { type: "input", question: "Le contraire de 'ouvrir' est...", answer: "fermer" }
                ]
            }
        ]
    },

    dictee: {
        name: "Dictée Flash",
        icon: "✏️",
        color: "#9b59b6",
        fiches: [
            {
                id: 1, title: "Sons simples - Niveau 1", description: "Mots courts et simples", difficulty: 1,
                exercises: [
                    { type: "dictee", text: "Le chat dort.", hint: "Animal + action" },
                    { type: "dictee", text: "Papa lit.", hint: "Famille + action" },
                    { type: "dictee", text: "Il fait beau.", hint: "Météo" },
                    { type: "dictee", text: "J'ai un ami.", hint: "Amitié" },
                    { type: "dictee", text: "Le soleil brille.", hint: "Nature" }
                ]
            },
            {
                id: 2, title: "Sons simples - Niveau 2", description: "Phrases plus longues", difficulty: 2,
                exercises: [
                    { type: "dictee", text: "Le petit chat noir dort sur le lit.", hint: "Animal domestique" },
                    { type: "dictee", text: "Maman prépare un bon gâteau.", hint: "Cuisine" },
                    { type: "dictee", text: "Je joue avec mon ballon rouge.", hint: "Jeu" },
                    { type: "dictee", text: "Papa travaille dans son bureau.", hint: "Travail" },
                    { type: "dictee", text: "Ma sœur dessine une jolie fleur.", hint: "Art" }
                ]
            },
            {
                id: 3, title: "Le son [ou]", description: "ou comme dans loup", difficulty: 1,
                exercises: [
                    { type: "dictee", text: "Le loup court dans la forêt.", hint: "Animal sauvage" },
                    { type: "dictee", text: "Je joue avec ma poupée.", hint: "Jouet" },
                    { type: "dictee", text: "La poule pond un œuf.", hint: "Ferme" },
                    { type: "dictee", text: "Il fait doux aujourd'hui.", hint: "Météo" },
                    { type: "dictee", text: "Le mouton mange de l'herbe.", hint: "Animal" }
                ]
            },
            {
                id: 4, title: "Le son [on]", description: "on comme dans maison", difficulty: 1,
                exercises: [
                    { type: "dictee", text: "Mon ballon est rond.", hint: "Jouet" },
                    { type: "dictee", text: "Le lion rugit fort.", hint: "Animal" },
                    { type: "dictee", text: "Nous chantons une chanson.", hint: "Musique" },
                    { type: "dictee", text: "Le poisson nage dans l'eau.", hint: "Animal aquatique" },
                    { type: "dictee", text: "Le garçon mange un bonbon.", hint: "Friandise" }
                ]
            },
            {
                id: 5, title: "Le son [an/en]", description: "an, en comme dans enfant", difficulty: 2,
                exercises: [
                    { type: "dictee", text: "L'enfant joue dans le jardin.", hint: "Jeu dehors" },
                    { type: "dictee", text: "Maman range la chambre.", hint: "Ménage" },
                    { type: "dictee", text: "Le vent souffle fort.", hint: "Météo" },
                    { type: "dictee", text: "J'entends un bruit étrange.", hint: "Son" },
                    { type: "dictee", text: "L'éléphant est un grand animal.", hint: "Zoo" }
                ]
            },
            {
                id: 6, title: "Le son [in]", description: "in, ain, ein comme dans lapin", difficulty: 2,
                exercises: [
                    { type: "dictee", text: "Le lapin mange une carotte.", hint: "Animal" },
                    { type: "dictee", text: "Je prends mon bain le soir.", hint: "Hygiène" },
                    { type: "dictee", text: "Le matin, je me lève tôt.", hint: "Moment de la journée" },
                    { type: "dictee", text: "Le train arrive à la gare.", hint: "Transport" },
                    { type: "dictee", text: "Il peint un beau tableau.", hint: "Art" }
                ]
            },
            {
                id: 7, title: "Le son [oi]", description: "oi comme dans roi", difficulty: 2,
                exercises: [
                    { type: "dictee", text: "Le roi vit dans un château.", hint: "Royauté" },
                    { type: "dictee", text: "Je bois un verre de lait.", hint: "Boisson" },
                    { type: "dictee", text: "Il fait froid en hiver.", hint: "Saison" },
                    { type: "dictee", text: "Trois oiseaux chantent.", hint: "Nombre + animaux" },
                    { type: "dictee", text: "La voiture est noire.", hint: "Véhicule + couleur" }
                ]
            },
            {
                id: 8, title: "Le son [eau/au/o]", description: "Différentes écritures du son o", difficulty: 2,
                exercises: [
                    { type: "dictee", text: "L'oiseau vole dans le ciel.", hint: "Animal à plumes" },
                    { type: "dictee", text: "Le bateau navigue sur l'eau.", hint: "Transport maritime" },
                    { type: "dictee", text: "Mon chapeau est jaune.", hint: "Vêtement + couleur" },
                    { type: "dictee", text: "Le gâteau au chocolat est bon.", hint: "Pâtisserie" },
                    { type: "dictee", text: "Paul joue du piano.", hint: "Musique" }
                ]
            },
            {
                id: 9, title: "Les doubles consonnes", description: "ll, ss, tt, mm, nn", difficulty: 3,
                exercises: [
                    { type: "dictee", text: "La fille joue à la balle.", hint: "Jeu" },
                    { type: "dictee", text: "La maîtresse écrit au tableau.", hint: "École" },
                    { type: "dictee", text: "Le poisson rouge nage vite.", hint: "Animal" },
                    { type: "dictee", text: "Maman cuisine une bonne soupe.", hint: "Repas" },
                    { type: "dictee", text: "La pomme tombe de l'arbre.", hint: "Fruit" }
                ]
            },
            {
                id: 10, title: "Les mots invariables", description: "Mots à mémoriser", difficulty: 3,
                exercises: [
                    { type: "dictee", text: "Je suis toujours content.", hint: "Fréquence" },
                    { type: "dictee", text: "Il fait souvent beau ici.", hint: "Météo" },
                    { type: "dictee", text: "Nous allons parfois au parc.", hint: "Lieu" },
                    { type: "dictee", text: "Elle court très vite.", hint: "Vitesse" },
                    { type: "dictee", text: "Ils arrivent maintenant.", hint: "Temps" }
                ]
            },
            {
                id: 11, title: "Dictée avancée 1", description: "Phrases complexes", difficulty: 3,
                exercises: [
                    { type: "dictee", text: "Le petit garçon mange une pomme rouge dans le jardin.", hint: "Phrase longue" },
                    { type: "dictee", text: "Ma grande sœur joue avec son ballon bleu.", hint: "Famille + jeu" },
                    { type: "dictee", text: "Les oiseaux chantent dans les arbres verts.", hint: "Nature" },
                    { type: "dictee", text: "Papa prépare un bon repas pour toute la famille.", hint: "Cuisine" },
                    { type: "dictee", text: "Nous allons à la plage pendant les vacances.", hint: "Vacances" }
                ]
            },
            {
                id: 12, title: "Dictée avancée 2", description: "Texte court", difficulty: 3,
                exercises: [
                    { type: "dictee", text: "Aujourd'hui, il fait très beau. Le soleil brille dans le ciel bleu.", hint: "Météo - 2 phrases" },
                    { type: "dictee", text: "Mon chat s'appelle Minou. Il aime dormir sur le canapé.", hint: "Animal - 2 phrases" },
                    { type: "dictee", text: "C'est l'heure du goûter. Je mange un gâteau au chocolat.", hint: "Repas - 2 phrases" },
                    { type: "dictee", text: "Nous sommes en vacances. Je joue avec mes amis.", hint: "Vacances - 2 phrases" },
                    { type: "dictee", text: "Ma maman est gentille. Elle me lit une histoire le soir.", hint: "Famille - 2 phrases" }
                ]
            }
        ]
    },

    calcul_mental: {
        name: "Calcul Mental",
        icon: "🧮",
        color: "#e67e22",
        fiches: [
            {
                id: 1, title: "Additions 0-10", description: "Niveau facile", difficulty: 1,
                exercises: [
                    { type: "input", question: "2 + 3 = ?", answer: "5" },
                    { type: "input", question: "5 + 4 = ?", answer: "9" },
                    { type: "input", question: "1 + 6 = ?", answer: "7" },
                    { type: "input", question: "3 + 3 = ?", answer: "6" },
                    { type: "input", question: "7 + 2 = ?", answer: "9" },
                    { type: "input", question: "4 + 4 = ?", answer: "8" },
                    { type: "input", question: "6 + 3 = ?", answer: "9" },
                    { type: "input", question: "5 + 5 = ?", answer: "10" },
                    { type: "input", question: "8 + 1 = ?", answer: "9" },
                    { type: "input", question: "2 + 7 = ?", answer: "9" }
                ]
            },
            {
                id: 2, title: "Additions 10-20", description: "Avec passage à la dizaine", difficulty: 2,
                exercises: [
                    { type: "input", question: "8 + 5 = ?", answer: "13" },
                    { type: "input", question: "7 + 6 = ?", answer: "13" },
                    { type: "input", question: "9 + 4 = ?", answer: "13" },
                    { type: "input", question: "6 + 8 = ?", answer: "14" },
                    { type: "input", question: "7 + 7 = ?", answer: "14" },
                    { type: "input", question: "8 + 8 = ?", answer: "16" },
                    { type: "input", question: "9 + 9 = ?", answer: "18" },
                    { type: "input", question: "7 + 9 = ?", answer: "16" },
                    { type: "input", question: "8 + 6 = ?", answer: "14" },
                    { type: "input", question: "9 + 7 = ?", answer: "16" }
                ]
            },
            {
                id: 3, title: "Soustractions 0-10", description: "Niveau facile", difficulty: 1,
                exercises: [
                    { type: "input", question: "5 - 2 = ?", answer: "3" },
                    { type: "input", question: "8 - 3 = ?", answer: "5" },
                    { type: "input", question: "7 - 4 = ?", answer: "3" },
                    { type: "input", question: "9 - 5 = ?", answer: "4" },
                    { type: "input", question: "6 - 1 = ?", answer: "5" },
                    { type: "input", question: "10 - 3 = ?", answer: "7" },
                    { type: "input", question: "4 - 2 = ?", answer: "2" },
                    { type: "input", question: "9 - 6 = ?", answer: "3" },
                    { type: "input", question: "8 - 5 = ?", answer: "3" },
                    { type: "input", question: "7 - 7 = ?", answer: "0" }
                ]
            },
            {
                id: 4, title: "Soustractions 10-20", description: "Niveau intermédiaire", difficulty: 2,
                exercises: [
                    { type: "input", question: "15 - 7 = ?", answer: "8" },
                    { type: "input", question: "13 - 6 = ?", answer: "7" },
                    { type: "input", question: "18 - 9 = ?", answer: "9" },
                    { type: "input", question: "14 - 8 = ?", answer: "6" },
                    { type: "input", question: "16 - 7 = ?", answer: "9" },
                    { type: "input", question: "12 - 5 = ?", answer: "7" },
                    { type: "input", question: "17 - 8 = ?", answer: "9" },
                    { type: "input", question: "11 - 4 = ?", answer: "7" },
                    { type: "input", question: "19 - 9 = ?", answer: "10" },
                    { type: "input", question: "20 - 8 = ?", answer: "12" }
                ]
            },
            {
                id: 5, title: "Compléments à 10", description: "Trouver le nombre manquant", difficulty: 1,
                exercises: [
                    { type: "input", question: "1 + ? = 10", answer: "9" },
                    { type: "input", question: "4 + ? = 10", answer: "6" },
                    { type: "input", question: "7 + ? = 10", answer: "3" },
                    { type: "input", question: "2 + ? = 10", answer: "8" },
                    { type: "input", question: "5 + ? = 10", answer: "5" },
                    { type: "input", question: "9 + ? = 10", answer: "1" },
                    { type: "input", question: "3 + ? = 10", answer: "7" },
                    { type: "input", question: "6 + ? = 10", answer: "4" },
                    { type: "input", question: "8 + ? = 10", answer: "2" },
                    { type: "input", question: "0 + ? = 10", answer: "10" }
                ]
            },
            {
                id: 6, title: "Les doubles", description: "Calculer les doubles", difficulty: 1,
                exercises: [
                    { type: "input", question: "Double de 1 = ?", answer: "2" },
                    { type: "input", question: "Double de 2 = ?", answer: "4" },
                    { type: "input", question: "Double de 3 = ?", answer: "6" },
                    { type: "input", question: "Double de 4 = ?", answer: "8" },
                    { type: "input", question: "Double de 5 = ?", answer: "10" },
                    { type: "input", question: "Double de 6 = ?", answer: "12" },
                    { type: "input", question: "Double de 7 = ?", answer: "14" },
                    { type: "input", question: "Double de 8 = ?", answer: "16" },
                    { type: "input", question: "Double de 9 = ?", answer: "18" },
                    { type: "input", question: "Double de 10 = ?", answer: "20" }
                ]
            },
            {
                id: 7, title: "Les moitiés", description: "Trouver les moitiés", difficulty: 2,
                exercises: [
                    { type: "input", question: "Moitié de 2 = ?", answer: "1" },
                    { type: "input", question: "Moitié de 4 = ?", answer: "2" },
                    { type: "input", question: "Moitié de 6 = ?", answer: "3" },
                    { type: "input", question: "Moitié de 8 = ?", answer: "4" },
                    { type: "input", question: "Moitié de 10 = ?", answer: "5" },
                    { type: "input", question: "Moitié de 12 = ?", answer: "6" },
                    { type: "input", question: "Moitié de 14 = ?", answer: "7" },
                    { type: "input", question: "Moitié de 16 = ?", answer: "8" },
                    { type: "input", question: "Moitié de 18 = ?", answer: "9" },
                    { type: "input", question: "Moitié de 20 = ?", answer: "10" }
                ]
            },
            {
                id: 8, title: "Ajouter/Enlever 10", description: "Calculs avec 10", difficulty: 2,
                exercises: [
                    { type: "input", question: "15 + 10 = ?", answer: "25" },
                    { type: "input", question: "23 + 10 = ?", answer: "33" },
                    { type: "input", question: "47 + 10 = ?", answer: "57" },
                    { type: "input", question: "68 + 10 = ?", answer: "78" },
                    { type: "input", question: "25 - 10 = ?", answer: "15" },
                    { type: "input", question: "43 - 10 = ?", answer: "33" },
                    { type: "input", question: "56 - 10 = ?", answer: "46" },
                    { type: "input", question: "72 - 10 = ?", answer: "62" },
                    { type: "input", question: "89 - 10 = ?", answer: "79" },
                    { type: "input", question: "34 + 10 = ?", answer: "44" }
                ]
            },
            {
                id: 9, title: "Calculs mélangés", description: "Additions et soustractions", difficulty: 2,
                exercises: [
                    { type: "input", question: "12 + 5 = ?", answer: "17" },
                    { type: "input", question: "18 - 6 = ?", answer: "12" },
                    { type: "input", question: "25 + 13 = ?", answer: "38" },
                    { type: "input", question: "34 - 12 = ?", answer: "22" },
                    { type: "input", question: "41 + 27 = ?", answer: "68" },
                    { type: "input", question: "56 - 24 = ?", answer: "32" },
                    { type: "input", question: "63 + 15 = ?", answer: "78" },
                    { type: "input", question: "72 - 31 = ?", answer: "41" },
                    { type: "input", question: "45 + 33 = ?", answer: "78" },
                    { type: "input", question: "89 - 45 = ?", answer: "44" }
                ]
            },
            {
                id: 10, title: "Calculs rapides avancés", description: "Niveau expert", difficulty: 3,
                exercises: [
                    { type: "input", question: "35 + 28 = ?", answer: "63" },
                    { type: "input", question: "67 - 39 = ?", answer: "28" },
                    { type: "input", question: "48 + 37 = ?", answer: "85" },
                    { type: "input", question: "82 - 45 = ?", answer: "37" },
                    { type: "input", question: "56 + 29 = ?", answer: "85" },
                    { type: "input", question: "73 - 48 = ?", answer: "25" },
                    { type: "input", question: "64 + 27 = ?", answer: "91" },
                    { type: "input", question: "91 - 56 = ?", answer: "35" },
                    { type: "input", question: "45 + 46 = ?", answer: "91" },
                    { type: "input", question: "80 - 37 = ?", answer: "43" }
                ]
            }
        ]
    },

    tables: {
        name: "Tables de Multiplication",
        icon: "✖️",
        color: "#f39c12",
        fiches: [
            { id: 1, title: "Table de 1", description: "Très facile", difficulty: 1, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `1 × ${i + 1} = ?`, answer: String(i + 1) })) },
            { id: 2, title: "Table de 2", description: "Les doubles", difficulty: 1, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `2 × ${i + 1} = ?`, answer: String(2 * (i + 1)) })) },
            { id: 3, title: "Table de 3", description: "Niveau facile", difficulty: 1, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `3 × ${i + 1} = ?`, answer: String(3 * (i + 1)) })) },
            { id: 4, title: "Table de 4", description: "Double des doubles", difficulty: 2, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `4 × ${i + 1} = ?`, answer: String(4 * (i + 1)) })) },
            { id: 5, title: "Table de 5", description: "Finit par 0 ou 5", difficulty: 1, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `5 × ${i + 1} = ?`, answer: String(5 * (i + 1)) })) },
            { id: 6, title: "Table de 6", description: "Niveau moyen", difficulty: 2, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `6 × ${i + 1} = ?`, answer: String(6 * (i + 1)) })) },
            { id: 7, title: "Table de 7", description: "Plus difficile", difficulty: 3, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `7 × ${i + 1} = ?`, answer: String(7 * (i + 1)) })) },
            { id: 8, title: "Table de 8", description: "Plus difficile", difficulty: 3, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `8 × ${i + 1} = ?`, answer: String(8 * (i + 1)) })) },
            { id: 9, title: "Table de 9", description: "Astuce des doigts", difficulty: 3, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `9 × ${i + 1} = ?`, answer: String(9 * (i + 1)) })) },
            { id: 10, title: "Table de 10", description: "Ajouter un zéro", difficulty: 1, exercises: Array.from({length: 10}, (_, i) => ({ type: "input", question: `10 × ${i + 1} = ?`, answer: String(10 * (i + 1)) })) },
            {
                id: 11, title: "Tables mélangées 1", description: "Tables 2, 3, 5", difficulty: 2,
                exercises: [
                    { type: "input", question: "2 × 7 = ?", answer: "14" },
                    { type: "input", question: "3 × 6 = ?", answer: "18" },
                    { type: "input", question: "5 × 8 = ?", answer: "40" },
                    { type: "input", question: "2 × 9 = ?", answer: "18" },
                    { type: "input", question: "3 × 7 = ?", answer: "21" },
                    { type: "input", question: "5 × 6 = ?", answer: "30" },
                    { type: "input", question: "2 × 8 = ?", answer: "16" },
                    { type: "input", question: "3 × 9 = ?", answer: "27" },
                    { type: "input", question: "5 × 7 = ?", answer: "35" },
                    { type: "input", question: "3 × 8 = ?", answer: "24" }
                ]
            },
            {
                id: 12, title: "Tables mélangées 2", description: "Tables 4, 6, 7, 8, 9", difficulty: 3,
                exercises: [
                    { type: "input", question: "4 × 7 = ?", answer: "28" },
                    { type: "input", question: "6 × 8 = ?", answer: "48" },
                    { type: "input", question: "7 × 6 = ?", answer: "42" },
                    { type: "input", question: "8 × 7 = ?", answer: "56" },
                    { type: "input", question: "9 × 6 = ?", answer: "54" },
                    { type: "input", question: "4 × 9 = ?", answer: "36" },
                    { type: "input", question: "6 × 7 = ?", answer: "42" },
                    { type: "input", question: "7 × 8 = ?", answer: "56" },
                    { type: "input", question: "8 × 9 = ?", answer: "72" },
                    { type: "input", question: "9 × 7 = ?", answer: "63" }
                ]
            }
        ]
    },

    geometrie: {
        name: "Géométrie",
        icon: "📐",
        color: "#1abc9c",
        fiches: [
            {
                id: 1, title: "Les formes de base", description: "Reconnaître les formes", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Combien de côtés a un triangle ?", options: ["2", "3", "4", "5"], answer: "3" },
                    { type: "qcm", question: "Quelle forme a 4 côtés égaux ?", options: ["Triangle", "Rectangle", "Carré", "Cercle"], answer: "Carré" },
                    { type: "qcm", question: "Un cercle a-t-il des côtés ?", options: ["Oui", "Non"], answer: "Non" },
                    { type: "input", question: "Combien de côtés a un rectangle ?", answer: "4" },
                    { type: "qcm", question: "Quelle forme n'a pas d'angle ?", options: ["Carré", "Triangle", "Cercle", "Rectangle"], answer: "Cercle" }
                ]
            },
            {
                id: 2, title: "Le carré", description: "Propriétés du carré", difficulty: 1,
                exercises: [
                    { type: "input", question: "Combien de côtés a un carré ?", answer: "4" },
                    { type: "qcm", question: "Les côtés d'un carré sont tous égaux ?", options: ["Oui", "Non"], answer: "Oui" },
                    { type: "input", question: "Combien d'angles droits a un carré ?", answer: "4" },
                    { type: "input", question: "Périmètre d'un carré de 5 cm de côté ?", answer: "20" },
                    { type: "input", question: "Périmètre d'un carré de 3 cm de côté ?", answer: "12" }
                ]
            },
            {
                id: 3, title: "Le rectangle", description: "Propriétés du rectangle", difficulty: 2,
                exercises: [
                    { type: "input", question: "Combien de côtés a un rectangle ?", answer: "4" },
                    { type: "qcm", question: "Les côtés opposés d'un rectangle sont égaux ?", options: ["Oui", "Non"], answer: "Oui" },
                    { type: "input", question: "Combien d'angles droits a un rectangle ?", answer: "4" },
                    { type: "input", question: "Périmètre d'un rectangle de 6 cm sur 3 cm ?", answer: "18" },
                    { type: "input", question: "Périmètre d'un rectangle de 8 cm sur 4 cm ?", answer: "24" }
                ]
            },
            {
                id: 4, title: "Le triangle", description: "Propriétés du triangle", difficulty: 2,
                exercises: [
                    { type: "input", question: "Combien de côtés a un triangle ?", answer: "3" },
                    { type: "input", question: "Combien de sommets a un triangle ?", answer: "3" },
                    { type: "input", question: "Combien d'angles a un triangle ?", answer: "3" },
                    { type: "qcm", question: "Un triangle avec tous les côtés égaux est...", options: ["Isocèle", "Équilatéral", "Rectangle"], answer: "Équilatéral" },
                    { type: "input", question: "Périmètre d'un triangle de côtés 3, 4, 5 cm ?", answer: "12" }
                ]
            },
            {
                id: 5, title: "Le cercle", description: "Propriétés du cercle", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Le centre du cercle est-il sur le cercle ?", options: ["Oui", "Non"], answer: "Non" },
                    { type: "qcm", question: "Le rayon va du centre jusqu'où ?", options: ["Au milieu", "Au bord"], answer: "Au bord" },
                    { type: "qcm", question: "Le diamètre = combien de rayons ?", options: ["1", "2", "3"], answer: "2" },
                    { type: "qcm", question: "Quel outil pour tracer un cercle ?", options: ["Règle", "Équerre", "Compas"], answer: "Compas" },
                    { type: "input", question: "Si le rayon = 5 cm, le diamètre = ?", answer: "10" }
                ]
            },
            {
                id: 6, title: "Les lignes", description: "Droites et segments", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Une ligne infinie est une...", options: ["Segment", "Droite", "Point"], answer: "Droite" },
                    { type: "qcm", question: "Une ligne avec début et fin est un...", options: ["Droite", "Segment", "Cercle"], answer: "Segment" },
                    { type: "qcm", question: "Droites qui ne se croisent jamais ?", options: ["Perpendiculaires", "Parallèles", "Sécantes"], answer: "Parallèles" },
                    { type: "qcm", question: "Droites qui se croisent à angle droit ?", options: ["Parallèles", "Perpendiculaires", "Sécantes"], answer: "Perpendiculaires" },
                    { type: "input", question: "Combien de points pour tracer une droite ?", answer: "2" }
                ]
            },
            {
                id: 7, title: "La symétrie", description: "Axes de symétrie", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Une figure symétrique peut se plier en...", options: ["Parties différentes", "Parties identiques"], answer: "Parties identiques" },
                    { type: "input", question: "Combien d'axes de symétrie a un carré ?", answer: "4" },
                    { type: "input", question: "Combien d'axes de symétrie a un rectangle ?", answer: "2" },
                    { type: "qcm", question: "Un cercle a combien d'axes ?", options: ["1", "4", "Infini"], answer: "Infini" },
                    { type: "input", question: "Combien d'axes a un triangle équilatéral ?", answer: "3" }
                ]
            },
            {
                id: 8, title: "Les angles", description: "Angle droit et autres", difficulty: 3,
                exercises: [
                    { type: "qcm", question: "Outil pour vérifier un angle droit ?", options: ["Règle", "Compas", "Équerre"], answer: "Équerre" },
                    { type: "qcm", question: "Un angle plus petit qu'un angle droit est...", options: ["Aigu", "Obtus", "Plat"], answer: "Aigu" },
                    { type: "qcm", question: "Un angle plus grand qu'un angle droit est...", options: ["Aigu", "Obtus", "Plat"], answer: "Obtus" },
                    { type: "input", question: "Combien d'angles droits dans un carré ?", answer: "4" },
                    { type: "qcm", question: "Le coin d'une feuille forme un angle...", options: ["Aigu", "Obtus", "Droit"], answer: "Droit" }
                ]
            },
            {
                id: 9, title: "Se repérer", description: "Quadrillage et espace", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Le contraire de gauche ?", options: ["Haut", "Bas", "Droite"], answer: "Droite" },
                    { type: "qcm", question: "Le contraire de dessus ?", options: ["Gauche", "Droite", "Dessous"], answer: "Dessous" },
                    { type: "qcm", question: "Sur une carte, le Nord est...", options: ["En bas", "En haut", "À gauche"], answer: "En haut" },
                    { type: "input", question: "Sur un quadrillage 4×4, combien de cases ?", answer: "16" },
                    { type: "input", question: "Sur un quadrillage 5×5, combien de cases ?", answer: "25" }
                ]
            },
            {
                id: 10, title: "Les solides", description: "Cube, pavé, boule...", difficulty: 3,
                exercises: [
                    { type: "qcm", question: "Un dé a la forme d'un...", options: ["Pavé", "Cube", "Cylindre"], answer: "Cube" },
                    { type: "input", question: "Combien de faces a un cube ?", answer: "6" },
                    { type: "qcm", question: "Une boîte de céréales est un...", options: ["Cube", "Pavé", "Cylindre"], answer: "Pavé" },
                    { type: "qcm", question: "Un ballon est une...", options: ["Cube", "Boule", "Cylindre"], answer: "Boule" },
                    { type: "input", question: "Combien d'arêtes a un cube ?", answer: "12" }
                ]
            }
        ]
    },

    nombres_calculs: {
        name: "Nombres et Calculs",
        icon: "🔢",
        color: "#27ae60",
        fiches: [
            {
                id: 1, title: "Nombres jusqu'à 99", description: "Dizaines et unités", difficulty: 1,
                exercises: [
                    { type: "input", question: "Dans 45, combien de dizaines ?", answer: "4" },
                    { type: "input", question: "Dans 72, combien d'unités ?", answer: "2" },
                    { type: "input", question: "3 dizaines + 7 unités = ?", answer: "37" },
                    { type: "input", question: "5 dizaines + 1 unité = ?", answer: "51" },
                    { type: "input", question: "Quel nombre vient après 49 ?", answer: "50" },
                    { type: "input", question: "Quel nombre vient avant 60 ?", answer: "59" },
                    { type: "input", question: "8 dizaines = ?", answer: "80" },
                    { type: "input", question: "6 dizaines + 0 unités = ?", answer: "60" }
                ]
            },
            {
                id: 2, title: "Comparer les nombres", description: "< > =", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "45 ... 54", options: ["<", ">", "="], answer: "<" },
                    { type: "qcm", question: "72 ... 27", options: ["<", ">", "="], answer: ">" },
                    { type: "qcm", question: "35 ... 35", options: ["<", ">", "="], answer: "=" },
                    { type: "qcm", question: "68 ... 86", options: ["<", ">", "="], answer: "<" },
                    { type: "qcm", question: "91 ... 19", options: ["<", ">", "="], answer: ">" },
                    { type: "qcm", question: "50 ... 49", options: ["<", ">", "="], answer: ">" },
                    { type: "qcm", question: "77 ... 78", options: ["<", ">", "="], answer: "<" },
                    { type: "input", question: "Le plus grand nombre à 2 chiffres ?", answer: "99" }
                ]
            },
            {
                id: 3, title: "Addition posée sans retenue", description: "Technique opératoire", difficulty: 2,
                exercises: [
                    { type: "input", question: "23 + 45 = ?", answer: "68" },
                    { type: "input", question: "31 + 26 = ?", answer: "57" },
                    { type: "input", question: "42 + 35 = ?", answer: "77" },
                    { type: "input", question: "54 + 23 = ?", answer: "77" },
                    { type: "input", question: "61 + 17 = ?", answer: "78" },
                    { type: "input", question: "12 + 45 = ?", answer: "57" },
                    { type: "input", question: "33 + 44 = ?", answer: "77" },
                    { type: "input", question: "21 + 56 = ?", answer: "77" }
                ]
            },
            {
                id: 4, title: "Addition posée avec retenue", description: "Gérer les retenues", difficulty: 3,
                exercises: [
                    { type: "input", question: "28 + 35 = ?", answer: "63" },
                    { type: "input", question: "47 + 26 = ?", answer: "73" },
                    { type: "input", question: "39 + 43 = ?", answer: "82" },
                    { type: "input", question: "56 + 27 = ?", answer: "83" },
                    { type: "input", question: "68 + 24 = ?", answer: "92" },
                    { type: "input", question: "45 + 38 = ?", answer: "83" },
                    { type: "input", question: "59 + 33 = ?", answer: "92" },
                    { type: "input", question: "76 + 18 = ?", answer: "94" }
                ]
            },
            {
                id: 5, title: "Soustraction posée", description: "Soustraire", difficulty: 2,
                exercises: [
                    { type: "input", question: "68 - 35 = ?", answer: "33" },
                    { type: "input", question: "57 - 24 = ?", answer: "33" },
                    { type: "input", question: "89 - 43 = ?", answer: "46" },
                    { type: "input", question: "76 - 52 = ?", answer: "24" },
                    { type: "input", question: "95 - 61 = ?", answer: "34" },
                    { type: "input", question: "48 - 25 = ?", answer: "23" },
                    { type: "input", question: "67 - 34 = ?", answer: "33" },
                    { type: "input", question: "83 - 41 = ?", answer: "42" }
                ]
            },
            {
                id: 6, title: "Compter par sauts", description: "De 2 en 2, de 5 en 5...", difficulty: 2,
                exercises: [
                    { type: "input", question: "2, 4, 6, 8, ? (de 2 en 2)", answer: "10" },
                    { type: "input", question: "5, 10, 15, 20, ? (de 5 en 5)", answer: "25" },
                    { type: "input", question: "10, 20, 30, 40, ? (de 10 en 10)", answer: "50" },
                    { type: "input", question: "14, 16, 18, 20, ? (de 2 en 2)", answer: "22" },
                    { type: "input", question: "25, 30, 35, 40, ? (de 5 en 5)", answer: "45" },
                    { type: "input", question: "35, 45, 55, 65, ? (de 10 en 10)", answer: "75" },
                    { type: "input", question: "3, 5, 7, 9, ? (de 2 en 2)", answer: "11" },
                    { type: "input", question: "50, 55, 60, 65, ? (de 5 en 5)", answer: "70" }
                ]
            },
            {
                id: 7, title: "Pairs et impairs", description: "Reconnaître", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "12 est...", options: ["Pair", "Impair"], answer: "Pair" },
                    { type: "qcm", question: "25 est...", options: ["Pair", "Impair"], answer: "Impair" },
                    { type: "qcm", question: "48 est...", options: ["Pair", "Impair"], answer: "Pair" },
                    { type: "qcm", question: "73 est...", options: ["Pair", "Impair"], answer: "Impair" },
                    { type: "qcm", question: "90 est...", options: ["Pair", "Impair"], answer: "Pair" },
                    { type: "input", question: "Le plus petit nombre pair à 2 chiffres ?", answer: "10" },
                    { type: "input", question: "Le plus petit nombre impair à 2 chiffres ?", answer: "11" },
                    { type: "input", question: "Le nombre pair juste après 37 ?", answer: "38" }
                ]
            },
            {
                id: 8, title: "Les centaines", description: "Nombres à 3 chiffres", difficulty: 3,
                exercises: [
                    { type: "input", question: "100 + 100 = ?", answer: "200" },
                    { type: "input", question: "Centaines dans 300 ?", answer: "3" },
                    { type: "input", question: "2 centaines + 3 dizaines + 5 unités = ?", answer: "235" },
                    { type: "input", question: "Dans 456, combien de centaines ?", answer: "4" },
                    { type: "input", question: "5 centaines = ?", answer: "500" },
                    { type: "input", question: "100 + 50 + 7 = ?", answer: "157" },
                    { type: "input", question: "Après 199 vient ?", answer: "200" },
                    { type: "input", question: "Avant 300 vient ?", answer: "299" }
                ]
            }
        ]
    },

    problemes: {
        name: "Problèmes",
        icon: "🤔",
        color: "#e74c3c",
        fiches: [
            {
                id: 1, title: "Problèmes d'addition", description: "Niveau 1", difficulty: 1,
                exercises: [
                    { type: "input", question: "Lucas a 5 billes. Il en gagne 3. Combien en a-t-il ?", answer: "8" },
                    { type: "input", question: "Dans un panier, il y a 7 pommes et 4 poires. Combien de fruits ?", answer: "11" },
                    { type: "input", question: "Léa lit 10 pages puis 8 pages. Combien de pages ?", answer: "18" },
                    { type: "input", question: "Un bus a 12 passagers. 6 montent. Combien de passagers ?", answer: "18" },
                    { type: "input", question: "Tom a 15 images. Sa sœur lui en donne 9. Combien en a-t-il ?", answer: "24" }
                ]
            },
            {
                id: 2, title: "Problèmes de soustraction", description: "Niveau 1", difficulty: 1,
                exercises: [
                    { type: "input", question: "Marie a 10 bonbons. Elle en mange 4. Combien reste-t-il ?", answer: "6" },
                    { type: "input", question: "Un libraire a 20 livres. Il en vend 8. Combien reste-t-il ?", answer: "12" },
                    { type: "input", question: "Dans un train, 30 voyageurs. 12 descendent. Combien restent ?", answer: "18" },
                    { type: "input", question: "Paul avait 25 euros. Il dépense 10 euros. Combien reste ?", answer: "15" },
                    { type: "input", question: "Un fermier a 18 œufs. 7 sont cassés. Combien peut-il vendre ?", answer: "11" }
                ]
            },
            {
                id: 3, title: "Problèmes d'addition - Niveau 2", description: "Nombres plus grands", difficulty: 2,
                exercises: [
                    { type: "input", question: "Lucas a 35 billes. Son ami lui en donne 28. Combien en a-t-il ?", answer: "63" },
                    { type: "input", question: "Une école a 45 garçons et 38 filles. Combien d'élèves ?", answer: "83" },
                    { type: "input", question: "Léa lit 27 pages lundi et 36 pages mardi. Combien de pages ?", answer: "63" },
                    { type: "input", question: "Un bus transporte 48 passagers. 25 montent. Combien de passagers ?", answer: "73" },
                    { type: "input", question: "Tom a 56 images. Son ami lui en offre 37. Combien en a-t-il ?", answer: "93" }
                ]
            },
            {
                id: 4, title: "Problèmes de soustraction - Niveau 2", description: "Nombres plus grands", difficulty: 2,
                exercises: [
                    { type: "input", question: "Marie a 45 bonbons. Elle en donne 18. Combien reste-t-il ?", answer: "27" },
                    { type: "input", question: "Un libraire a 72 livres. Il en vend 35. Combien reste-t-il ?", answer: "37" },
                    { type: "input", question: "Dans un train, 85 voyageurs. 47 descendent. Combien restent ?", answer: "38" },
                    { type: "input", question: "Paul avait 63 euros. Il dépense 28 euros. Combien reste ?", answer: "35" },
                    { type: "input", question: "Un fermier a 94 œufs. 56 sont vendus. Combien reste-t-il ?", answer: "38" }
                ]
            },
            {
                id: 5, title: "Problèmes de comparaison", description: "Trouver la différence", difficulty: 2,
                exercises: [
                    { type: "input", question: "Emma a 28 billes, Léo en a 19. Combien Emma en a-t-elle de plus ?", answer: "9" },
                    { type: "input", question: "Un livre coûte 15 euros, un cahier 8 euros. Différence de prix ?", answer: "7" },
                    { type: "input", question: "L'équipe A a 34 points, l'équipe B 27 points. Combien d'écart ?", answer: "7" },
                    { type: "input", question: "Julie a 45 images, son frère 32. Combien Julie en a-t-elle de plus ?", answer: "13" },
                    { type: "input", question: "Un arbre mesure 12 m, un autre 8 m. Différence ?", answer: "4" }
                ]
            },
            {
                id: 6, title: "Problèmes d'argent", description: "Euros et centimes", difficulty: 2,
                exercises: [
                    { type: "input", question: "Un crayon coûte 2 euros. J'en achète 3. Combien dois-je payer ?", answer: "6" },
                    { type: "input", question: "J'ai 10 euros. J'achète un livre à 7 euros. Combien me reste ?", answer: "3" },
                    { type: "input", question: "Une glace coûte 3 euros. Paul en achète 4. Combien doit-il payer ?", answer: "12" },
                    { type: "input", question: "Maman a 50 euros. Elle achète un jouet à 23 euros. Combien reste ?", answer: "27" },
                    { type: "input", question: "Un stylo coûte 5 euros et une gomme 2 euros. Prix total ?", answer: "7" }
                ]
            },
            {
                id: 7, title: "Problèmes à 2 étapes", description: "Plus difficile", difficulty: 3,
                exercises: [
                    { type: "input", question: "Marie a 15 billes. Elle en gagne 8 puis en perd 5. Combien ?", answer: "18" },
                    { type: "input", question: "Un magasin a 45 jouets. Il en vend 20 puis reçoit 15. Combien ?", answer: "40" },
                    { type: "input", question: "Léo a 30 euros. Il dépense 12 euros puis reçoit 8 euros. Combien ?", answer: "26" },
                    { type: "input", question: "28 oiseaux sur un arbre. 10 partent et 7 arrivent. Combien ?", answer: "25" },
                    { type: "input", question: "Emma lit 15 pages le matin, 20 l'après-midi, 10 le soir. Combien ?", answer: "45" }
                ]
            },
            {
                id: 8, title: "Problèmes de partage", description: "Diviser équitablement", difficulty: 2,
                exercises: [
                    { type: "input", question: "12 bonbons partagés entre 2 enfants. Combien chacun ?", answer: "6" },
                    { type: "input", question: "20 billes partagées entre 4 amis. Combien chacun ?", answer: "5" },
                    { type: "input", question: "15 crayons rangés dans 3 boîtes. Combien par boîte ?", answer: "5" },
                    { type: "input", question: "18 gâteaux partagés entre 6 personnes. Combien chacun ?", answer: "3" },
                    { type: "input", question: "24 images partagées entre 4 enfants. Combien chacun ?", answer: "6" }
                ]
            },
            {
                id: 9, title: "Problèmes de groupes", description: "Multiplication", difficulty: 2,
                exercises: [
                    { type: "input", question: "3 boîtes de 5 crayons. Combien de crayons au total ?", answer: "15" },
                    { type: "input", question: "4 tables avec 6 élèves. Combien d'élèves au total ?", answer: "24" },
                    { type: "input", question: "5 sacs de 10 billes. Combien de billes en tout ?", answer: "50" },
                    { type: "input", question: "2 équipes de 8 joueurs. Combien de joueurs au total ?", answer: "16" },
                    { type: "input", question: "6 rangées de 4 chaises. Combien de chaises en tout ?", answer: "24" }
                ]
            },
            {
                id: 10, title: "Problèmes géométriques", description: "Périmètres", difficulty: 3,
                exercises: [
                    { type: "input", question: "Carré de 5 cm de côté. Périmètre = ?", answer: "20" },
                    { type: "input", question: "Rectangle de 8 cm sur 4 cm. Périmètre = ?", answer: "24" },
                    { type: "input", question: "Triangle de côtés 3 cm, 4 cm, 5 cm. Périmètre = ?", answer: "12" },
                    { type: "input", question: "Carré de périmètre 28 cm. Côté = ?", answer: "7" },
                    { type: "input", question: "Rectangle de périmètre 20 cm, longueur 6 cm. Largeur = ?", answer: "4" }
                ]
            }
        ]
    },

    grandeurs_mesures: {
        name: "Grandeurs et Mesures",
        icon: "📏",
        color: "#16a085",
        fiches: [
            {
                id: 1, title: "Les longueurs", description: "cm et m", difficulty: 1,
                exercises: [
                    { type: "input", question: "1 mètre = combien de cm ?", answer: "100" },
                    { type: "qcm", question: "Une règle mesure...", options: ["30 cm", "30 m", "3 m"], answer: "30 cm" },
                    { type: "qcm", question: "Hauteur d'une porte ?", options: ["2 cm", "2 m", "20 cm"], answer: "2 m" },
                    { type: "input", question: "50 cm + 50 cm = ? cm", answer: "100" },
                    { type: "input", question: "2 m = ? cm", answer: "200" }
                ]
            },
            {
                id: 2, title: "Lire l'heure", description: "Heures et demi-heures", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "La grande aiguille indique...", options: ["Les heures", "Les minutes"], answer: "Les minutes" },
                    { type: "qcm", question: "La petite aiguille indique...", options: ["Les heures", "Les minutes"], answer: "Les heures" },
                    { type: "input", question: "1 heure = combien de minutes ?", answer: "60" },
                    { type: "input", question: "Une demi-heure = combien de minutes ?", answer: "30" },
                    { type: "input", question: "2 heures = combien de minutes ?", answer: "120" }
                ]
            },
            {
                id: 3, title: "La monnaie", description: "Euros et centimes", difficulty: 2,
                exercises: [
                    { type: "input", question: "1 euro = combien de centimes ?", answer: "100" },
                    { type: "input", question: "50 centimes + 50 centimes = ? euro(s)", answer: "1" },
                    { type: "input", question: "5 euros - 2 euros = ? euros", answer: "3" },
                    { type: "input", question: "3 pièces de 2 euros = ? euros", answer: "6" },
                    { type: "input", question: "2 billets de 10 euros + 5 euros = ? euros", answer: "25" }
                ]
            },
            {
                id: 4, title: "Les masses", description: "g et kg", difficulty: 2,
                exercises: [
                    { type: "input", question: "1 kg = combien de grammes ?", answer: "1000" },
                    { type: "qcm", question: "Une pomme pèse environ...", options: ["150 g", "150 kg", "15 g"], answer: "150 g" },
                    { type: "input", question: "500 g + 500 g = ? kg", answer: "1" },
                    { type: "input", question: "2 kg = ? g", answer: "2000" },
                    { type: "input", question: "1 kg - 200 g = ? g", answer: "800" }
                ]
            },
            {
                id: 5, title: "Le calendrier", description: "Jours, mois, semaines", difficulty: 2,
                exercises: [
                    { type: "input", question: "Une semaine = combien de jours ?", answer: "7" },
                    { type: "input", question: "Une année = combien de mois ?", answer: "12" },
                    { type: "qcm", question: "Mois après avril ?", options: ["Mars", "Mai", "Juin"], answer: "Mai" },
                    { type: "input", question: "2 semaines = combien de jours ?", answer: "14" },
                    { type: "qcm", question: "Premier mois de l'année ?", options: ["Décembre", "Janvier", "Mars"], answer: "Janvier" }
                ]
            },
            {
                id: 6, title: "Les périmètres", description: "Calculer le tour", difficulty: 3,
                exercises: [
                    { type: "input", question: "Carré de 4 cm de côté. Périmètre = ?", answer: "16" },
                    { type: "input", question: "Rectangle de 6 cm sur 3 cm. Périmètre = ?", answer: "18" },
                    { type: "input", question: "Carré de périmètre 20 cm. Côté = ?", answer: "5" },
                    { type: "input", question: "Carré de 10 cm de côté. Périmètre = ?", answer: "40" },
                    { type: "input", question: "Rectangle de 7 cm sur 5 cm. Périmètre = ?", answer: "24" }
                ]
            }
        ]
    },

    anglais: {
        name: "Anglais",
        icon: "🇬🇧",
        color: "#3498db",
        fiches: [
            {
                id: 1, title: "Les couleurs", description: "Colors", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Comment dit-on 'rouge' en anglais ?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Red" },
                    { type: "qcm", question: "Comment dit-on 'bleu' en anglais ?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Blue" },
                    { type: "qcm", question: "'Green' signifie...", options: ["Rouge", "Bleu", "Vert", "Jaune"], answer: "Vert" },
                    { type: "qcm", question: "'Yellow' signifie...", options: ["Rouge", "Bleu", "Vert", "Jaune"], answer: "Jaune" },
                    { type: "input", question: "Black = ? (en français)", answer: "noir" },
                    { type: "input", question: "White = ? (en français)", answer: "blanc" },
                    { type: "qcm", question: "Comment dit-on 'orange' ?", options: ["Orange", "Purple", "Pink"], answer: "Orange" },
                    { type: "qcm", question: "'Pink' signifie...", options: ["Violet", "Rose", "Marron"], answer: "Rose" }
                ]
            },
            {
                id: 2, title: "Les nombres 1-10", description: "Numbers", difficulty: 1,
                exercises: [
                    { type: "input", question: "One = ? (chiffre)", answer: "1" },
                    { type: "input", question: "Two = ? (chiffre)", answer: "2" },
                    { type: "input", question: "Three = ? (chiffre)", answer: "3" },
                    { type: "input", question: "Five = ? (chiffre)", answer: "5" },
                    { type: "input", question: "Ten = ? (chiffre)", answer: "10" },
                    { type: "qcm", question: "Comment dit-on '4' ?", options: ["Three", "Four", "Five", "Six"], answer: "Four" },
                    { type: "qcm", question: "Comment dit-on '7' ?", options: ["Six", "Seven", "Eight", "Nine"], answer: "Seven" },
                    { type: "qcm", question: "'Eight' signifie...", options: ["6", "7", "8", "9"], answer: "8" }
                ]
            },
            {
                id: 3, title: "Les animaux", description: "Animals", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Comment dit-on 'chat' ?", options: ["Dog", "Cat", "Bird", "Fish"], answer: "Cat" },
                    { type: "qcm", question: "Comment dit-on 'chien' ?", options: ["Dog", "Cat", "Bird", "Fish"], answer: "Dog" },
                    { type: "qcm", question: "'Bird' signifie...", options: ["Chat", "Chien", "Oiseau", "Poisson"], answer: "Oiseau" },
                    { type: "qcm", question: "'Fish' signifie...", options: ["Chat", "Chien", "Oiseau", "Poisson"], answer: "Poisson" },
                    { type: "input", question: "Horse = ? (en français)", answer: "cheval" },
                    { type: "input", question: "Rabbit = ? (en français)", answer: "lapin" },
                    { type: "qcm", question: "Comment dit-on 'vache' ?", options: ["Pig", "Cow", "Sheep", "Duck"], answer: "Cow" },
                    { type: "qcm", question: "'Duck' signifie...", options: ["Cochon", "Vache", "Mouton", "Canard"], answer: "Canard" }
                ]
            },
            {
                id: 4, title: "La famille", description: "Family", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Comment dit-on 'maman' ?", options: ["Father", "Mother", "Brother", "Sister"], answer: "Mother" },
                    { type: "qcm", question: "Comment dit-on 'papa' ?", options: ["Father", "Mother", "Brother", "Sister"], answer: "Father" },
                    { type: "qcm", question: "'Brother' signifie...", options: ["Père", "Mère", "Frère", "Sœur"], answer: "Frère" },
                    { type: "qcm", question: "'Sister' signifie...", options: ["Père", "Mère", "Frère", "Sœur"], answer: "Sœur" },
                    { type: "input", question: "Grandmother = ? (en français)", answer: "grand-mere" },
                    { type: "input", question: "Grandfather = ? (en français)", answer: "grand-pere" },
                    { type: "qcm", question: "Comment dit-on 'bébé' ?", options: ["Baby", "Child", "Boy", "Girl"], answer: "Baby" },
                    { type: "qcm", question: "'Girl' signifie...", options: ["Garçon", "Fille", "Bébé", "Enfant"], answer: "Fille" }
                ]
            },
            {
                id: 5, title: "Se présenter", description: "Introduce yourself", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "'Hello' signifie...", options: ["Au revoir", "Bonjour", "Merci", "S'il te plaît"], answer: "Bonjour" },
                    { type: "qcm", question: "'Goodbye' signifie...", options: ["Au revoir", "Bonjour", "Merci", "S'il te plaît"], answer: "Au revoir" },
                    { type: "qcm", question: "Pour dire ton nom, tu dis...", options: ["I am...", "You are...", "He is...", "She is..."], answer: "I am..." },
                    { type: "qcm", question: "'How are you?' signifie...", options: ["Qui es-tu ?", "Comment vas-tu ?", "Où vas-tu ?", "Quel âge as-tu ?"], answer: "Comment vas-tu ?" },
                    { type: "qcm", question: "Pour répondre 'Je vais bien'...", options: ["I'm fine", "I'm sad", "I'm tired", "I'm hungry"], answer: "I'm fine" },
                    { type: "input", question: "Thank you = ? (en français)", answer: "merci" },
                    { type: "input", question: "Please = ? (en français)", answer: "s'il te plait" },
                    { type: "qcm", question: "'What's your name?' signifie...", options: ["Quel âge as-tu ?", "Comment t'appelles-tu ?", "Où habites-tu ?"], answer: "Comment t'appelles-tu ?" }
                ]
            },
            {
                id: 6, title: "Le corps", description: "Body parts", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Comment dit-on 'tête' ?", options: ["Hand", "Head", "Foot", "Arm"], answer: "Head" },
                    { type: "qcm", question: "Comment dit-on 'main' ?", options: ["Hand", "Head", "Foot", "Arm"], answer: "Hand" },
                    { type: "qcm", question: "'Foot' signifie...", options: ["Main", "Tête", "Pied", "Bras"], answer: "Pied" },
                    { type: "qcm", question: "'Arm' signifie...", options: ["Main", "Tête", "Pied", "Bras"], answer: "Bras" },
                    { type: "input", question: "Eye = ? (en français)", answer: "oeil" },
                    { type: "input", question: "Nose = ? (en français)", answer: "nez" },
                    { type: "input", question: "Mouth = ? (en français)", answer: "bouche" },
                    { type: "input", question: "Ear = ? (en français)", answer: "oreille" }
                ]
            }
        ]
    },

    lecture: {
        name: "Lecture & Compréhension",
        icon: "📚",
        color: "#e91e63",
        fiches: [
            {
                id: 1, title: "Comprendre un texte court", description: "Niveau 1", difficulty: 1,
                exercises: [
                    { type: "lecture", text: "Tom a un chat. Son chat s'appelle Minou. Minou aime dormir sur le canapé.", questions: [
                        { type: "qcm", question: "Comment s'appelle le chat de Tom ?", options: ["Félix", "Minou", "Tigrou", "Pacha"], answer: "Minou" },
                        { type: "qcm", question: "Où aime dormir Minou ?", options: ["Sur le lit", "Sur le canapé", "Dans le jardin", "Sous la table"], answer: "Sur le canapé" }
                    ]},
                    { type: "lecture", text: "Léa va à l'école. Elle prend son cartable rouge. Dans son cartable, il y a ses cahiers et sa trousse.", questions: [
                        { type: "qcm", question: "De quelle couleur est le cartable de Léa ?", options: ["Bleu", "Vert", "Rouge", "Jaune"], answer: "Rouge" },
                        { type: "qcm", question: "Qu'y a-t-il dans le cartable ?", options: ["Des jouets", "Des cahiers et une trousse", "Des bonbons", "Un livre"], answer: "Des cahiers et une trousse" }
                    ]}
                ]
            },
            {
                id: 2, title: "Histoire courte", description: "Niveau 1", difficulty: 1,
                exercises: [
                    { type: "lecture", text: "C'est l'anniversaire de Marie. Elle a 7 ans. Ses amis lui offrent un beau cadeau. C'est une poupée avec une robe bleue.", questions: [
                        { type: "input", question: "Quel âge a Marie ?", answer: "7" },
                        { type: "qcm", question: "Quel cadeau reçoit Marie ?", options: ["Un ballon", "Une poupée", "Un livre", "Un vélo"], answer: "Une poupée" },
                        { type: "qcm", question: "De quelle couleur est la robe de la poupée ?", options: ["Rouge", "Verte", "Bleue", "Rose"], answer: "Bleue" }
                    ]}
                ]
            },
            {
                id: 3, title: "À la ferme", description: "Niveau 2", difficulty: 2,
                exercises: [
                    { type: "lecture", text: "Pierre habite dans une ferme. Chaque matin, il aide son père à nourrir les animaux. Il donne du grain aux poules, du foin aux vaches et des carottes aux lapins. Pierre aime beaucoup les lapins.", questions: [
                        { type: "qcm", question: "Où habite Pierre ?", options: ["En ville", "Dans une ferme", "À la montagne", "Au bord de la mer"], answer: "Dans une ferme" },
                        { type: "qcm", question: "Que mange les poules ?", options: ["Du foin", "Des carottes", "Du grain", "De l'herbe"], answer: "Du grain" },
                        { type: "qcm", question: "Quel animal Pierre préfère-t-il ?", options: ["Les poules", "Les vaches", "Les lapins", "Les chiens"], answer: "Les lapins" }
                    ]}
                ]
            },
            {
                id: 4, title: "La sortie au parc", description: "Niveau 2", difficulty: 2,
                exercises: [
                    { type: "lecture", text: "Samedi, Emma va au parc avec sa maman. Il fait beau et chaud. Emma joue sur la balançoire pendant une heure. Ensuite, elle mange une glace à la fraise. C'est sa saveur préférée !", questions: [
                        { type: "qcm", question: "Quel jour Emma va au parc ?", options: ["Lundi", "Mercredi", "Samedi", "Dimanche"], answer: "Samedi" },
                        { type: "qcm", question: "Quel temps fait-il ?", options: ["Il pleut", "Il fait froid", "Il neige", "Il fait beau et chaud"], answer: "Il fait beau et chaud" },
                        { type: "qcm", question: "Quelle est la saveur préférée d'Emma ?", options: ["Chocolat", "Vanille", "Fraise", "Citron"], answer: "Fraise" }
                    ]}
                ]
            },
            {
                id: 5, title: "Le petit déjeuner", description: "Niveau 2", difficulty: 2,
                exercises: [
                    { type: "lecture", text: "Tous les matins, Lucas se lève à 7 heures. Il se lave le visage et les mains. Puis il va dans la cuisine pour prendre son petit déjeuner. Il boit un grand bol de chocolat chaud et mange deux tartines de confiture. Sa confiture préférée est la confiture d'abricot.", questions: [
                        { type: "qcm", question: "À quelle heure Lucas se lève-t-il ?", options: ["6 heures", "7 heures", "8 heures", "9 heures"], answer: "7 heures" },
                        { type: "input", question: "Combien de tartines mange Lucas ?", answer: "2" },
                        { type: "qcm", question: "Quelle est la confiture préférée de Lucas ?", options: ["Fraise", "Abricot", "Cerise", "Orange"], answer: "Abricot" }
                    ]}
                ]
            },
            {
                id: 6, title: "L'école de Jules", description: "Niveau 3", difficulty: 3,
                exercises: [
                    { type: "lecture", text: "Jules est en classe de CE1. Sa maîtresse s'appelle Madame Martin. Elle est très gentille. Ce matin, les élèves ont fait une dictée. Jules a fait deux fautes seulement. Il est content car c'est son meilleur résultat ! Madame Martin l'a félicité devant toute la classe.", questions: [
                        { type: "qcm", question: "En quelle classe est Jules ?", options: ["CP", "CE1", "CE2", "CM1"], answer: "CE1" },
                        { type: "input", question: "Combien de fautes Jules a-t-il fait ?", answer: "2" },
                        { type: "qcm", question: "Comment s'appelle la maîtresse ?", options: ["Madame Dupont", "Madame Martin", "Madame Bernard", "Madame Petit"], answer: "Madame Martin" },
                        { type: "qcm", question: "Pourquoi Jules est-il content ?", options: ["C'est son anniversaire", "Il a eu zéro faute", "C'est son meilleur résultat", "Il a une nouvelle trousse"], answer: "C'est son meilleur résultat" }
                    ]}
                ]
            },
            {
                id: 7, title: "Le voyage en train", description: "Niveau 3", difficulty: 3,
                exercises: [
                    { type: "lecture", text: "Pendant les vacances, Sophie prend le train avec ses parents pour aller chez ses grands-parents. Le voyage dure trois heures. Sophie regarde par la fenêtre. Elle voit des champs, des vaches et des maisons. Elle lit aussi un livre sur les dinosaures. Quand le train arrive, son grand-père l'attend sur le quai avec un grand sourire.", questions: [
                        { type: "input", question: "Combien d'heures dure le voyage ?", answer: "3" },
                        { type: "qcm", question: "Chez qui va Sophie ?", options: ["Chez sa tante", "Chez ses cousins", "Chez ses grands-parents", "Chez son oncle"], answer: "Chez ses grands-parents" },
                        { type: "qcm", question: "Sur quoi porte le livre de Sophie ?", options: ["Les animaux", "Les dinosaures", "Les voitures", "Les princesses"], answer: "Les dinosaures" },
                        { type: "qcm", question: "Qui attend Sophie à l'arrivée ?", options: ["Sa grand-mère", "Son grand-père", "Son oncle", "Sa tante"], answer: "Son grand-père" }
                    ]}
                ]
            },
            {
                id: 8, title: "La recette du gâteau", description: "Niveau 3", difficulty: 3,
                exercises: [
                    { type: "lecture", text: "Pour faire un gâteau au chocolat, il faut : 200 grammes de chocolat, 3 œufs, 100 grammes de sucre et 50 grammes de farine. D'abord, on fait fondre le chocolat. Ensuite, on mélange les œufs et le sucre. Puis on ajoute le chocolat fondu et la farine. Enfin, on met le tout au four pendant 20 minutes.", questions: [
                        { type: "input", question: "Combien d'œufs faut-il ?", answer: "3" },
                        { type: "input", question: "Combien de grammes de chocolat faut-il ?", answer: "200" },
                        { type: "qcm", question: "Que fait-on en premier ?", options: ["Mélanger les œufs", "Fondre le chocolat", "Ajouter la farine", "Mettre au four"], answer: "Fondre le chocolat" },
                        { type: "input", question: "Combien de minutes au four ?", answer: "20" }
                    ]}
                ]
            }
        ]
    },

    sciences: {
        name: "Sciences",
        icon: "🔬",
        color: "#8e44ad",
        fiches: [
            {
                id: 1, title: "Les animaux", description: "Classification", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Le chat est un...", options: ["Mammifère", "Oiseau", "Poisson", "Insecte"], answer: "Mammifère" },
                    { type: "qcm", question: "Le poisson rouge vit dans...", options: ["L'air", "L'eau", "La terre"], answer: "L'eau" },
                    { type: "qcm", question: "L'oiseau a...", options: ["Des écailles", "Des plumes", "Des poils"], answer: "Des plumes" },
                    { type: "qcm", question: "Combien de pattes a un insecte ?", options: ["4", "6", "8", "2"], answer: "6" },
                    { type: "qcm", question: "Le têtard devient...", options: ["Un poisson", "Une grenouille", "Un serpent"], answer: "Une grenouille" },
                    { type: "qcm", question: "Les mammifères allaitent leurs petits ?", options: ["Oui", "Non"], answer: "Oui" },
                    { type: "qcm", question: "L'araignée est un insecte ?", options: ["Oui", "Non"], answer: "Non" },
                    { type: "input", question: "Combien de pattes a une araignée ?", answer: "8" }
                ]
            },
            {
                id: 2, title: "Les plantes", description: "Cycle de vie", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Une plante a besoin de...", options: ["Eau et lumière", "Chocolat", "Viande"], answer: "Eau et lumière" },
                    { type: "qcm", question: "La graine devient...", options: ["Un fruit", "Une plante", "Une fleur"], answer: "Une plante" },
                    { type: "qcm", question: "Les racines servent à...", options: ["Respirer", "Absorber l'eau", "Voir"], answer: "Absorber l'eau" },
                    { type: "qcm", question: "Les feuilles sont généralement...", options: ["Rouges", "Vertes", "Bleues"], answer: "Vertes" },
                    { type: "qcm", question: "La tige soutient...", options: ["Les racines", "Les feuilles et fleurs", "La terre"], answer: "Les feuilles et fleurs" },
                    { type: "qcm", question: "Les fleurs donnent des...", options: ["Racines", "Fruits", "Feuilles"], answer: "Fruits" },
                    { type: "qcm", question: "L'arbre perd ses feuilles en...", options: ["Été", "Automne", "Printemps"], answer: "Automne" },
                    { type: "qcm", question: "La pomme est un...", options: ["Légume", "Fruit", "Fleur"], answer: "Fruit" }
                ]
            },
            {
                id: 3, title: "Le corps humain", description: "Les sens", difficulty: 2,
                exercises: [
                    { type: "input", question: "Combien avons-nous de sens ?", answer: "5" },
                    { type: "qcm", question: "On voit avec...", options: ["Le nez", "Les yeux", "Les oreilles"], answer: "Les yeux" },
                    { type: "qcm", question: "On entend avec...", options: ["Le nez", "Les yeux", "Les oreilles"], answer: "Les oreilles" },
                    { type: "qcm", question: "On sent les odeurs avec...", options: ["Le nez", "Les yeux", "La bouche"], answer: "Le nez" },
                    { type: "qcm", question: "On goûte avec...", options: ["Le nez", "La langue", "Les mains"], answer: "La langue" },
                    { type: "qcm", question: "On touche avec...", options: ["Le nez", "Les yeux", "La peau"], answer: "La peau" },
                    { type: "qcm", question: "Le sens de la vue utilise...", options: ["Les yeux", "Le nez", "La bouche"], answer: "Les yeux" },
                    { type: "qcm", question: "Combien de dents de lait avons-nous ?", options: ["10", "20", "32"], answer: "20" }
                ]
            },
            {
                id: 4, title: "Les saisons", description: "Printemps, été, automne, hiver", difficulty: 1,
                exercises: [
                    { type: "input", question: "Combien y a-t-il de saisons ?", answer: "4" },
                    { type: "qcm", question: "En été, il fait...", options: ["Chaud", "Froid", "Neige"], answer: "Chaud" },
                    { type: "qcm", question: "En hiver, il peut...", options: ["Neiger", "Faire très chaud", "Y avoir des fleurs partout"], answer: "Neiger" },
                    { type: "qcm", question: "Les feuilles tombent en...", options: ["Printemps", "Été", "Automne", "Hiver"], answer: "Automne" },
                    { type: "qcm", question: "Les fleurs poussent au...", options: ["Printemps", "Automne", "Hiver"], answer: "Printemps" },
                    { type: "qcm", question: "Noël est en...", options: ["Été", "Printemps", "Hiver"], answer: "Hiver" },
                    { type: "qcm", question: "Les grandes vacances sont en...", options: ["Hiver", "Été", "Automne"], answer: "Été" },
                    { type: "qcm", question: "La rentrée scolaire est en...", options: ["Été", "Automne", "Hiver"], answer: "Automne" }
                ]
            },
            {
                id: 5, title: "L'eau", description: "États et cycle", difficulty: 2,
                exercises: [
                    { type: "input", question: "Combien d'états a l'eau ?", answer: "3" },
                    { type: "qcm", question: "La glace est de l'eau...", options: ["Liquide", "Solide", "Gazeuse"], answer: "Solide" },
                    { type: "qcm", question: "La vapeur est de l'eau...", options: ["Liquide", "Solide", "Gazeuse"], answer: "Gazeuse" },
                    { type: "qcm", question: "L'eau du robinet est...", options: ["Liquide", "Solide", "Gazeuse"], answer: "Liquide" },
                    { type: "qcm", question: "L'eau gèle à...", options: ["0°C", "10°C", "100°C"], answer: "0°C" },
                    { type: "qcm", question: "L'eau bout à...", options: ["0°C", "50°C", "100°C"], answer: "100°C" },
                    { type: "qcm", question: "La pluie vient des...", options: ["Arbres", "Nuages", "Montagnes"], answer: "Nuages" },
                    { type: "qcm", question: "La neige est de l'eau...", options: ["Liquide", "Solide", "Gazeuse"], answer: "Solide" }
                ]
            },
            {
                id: 6, title: "Le jour et la nuit", description: "La Terre et le Soleil", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Le Soleil est une...", options: ["Planète", "Étoile", "Lune"], answer: "Étoile" },
                    { type: "qcm", question: "La Terre tourne autour du...", options: ["Lune", "Soleil", "Mars"], answer: "Soleil" },
                    { type: "qcm", question: "Il fait jour quand...", options: ["Le Soleil nous éclaire", "La Lune nous éclaire"], answer: "Le Soleil nous éclaire" },
                    { type: "qcm", question: "Un jour complet dure...", options: ["12 heures", "24 heures", "7 jours"], answer: "24 heures" },
                    { type: "qcm", question: "Le Soleil se lève à...", options: ["L'est", "L'ouest", "Le nord"], answer: "L'est" },
                    { type: "qcm", question: "Le Soleil se couche à...", options: ["L'est", "L'ouest", "Le sud"], answer: "L'ouest" },
                    { type: "qcm", question: "La Lune brille grâce à...", options: ["Sa propre lumière", "Le Soleil", "Les étoiles"], answer: "Le Soleil" },
                    { type: "input", question: "Combien de planètes dans notre système solaire ?", answer: "8" }
                ]
            }
        ]
    }
};

// Subject icons mapping
const SUBJECT_ICONS = {
    francais: "📖",
    dictee: "✏️",
    calcul_mental: "🧮",
    tables: "✖️",
    geometrie: "📐",
    nombres_calculs: "🔢",
    problemes: "🤔",
    grandeurs_mesures: "📏",
    anglais: "🇬🇧",
    sciences: "🔬",
    lecture: "📚"
};

// ==================== CHALLENGES SYSTEM ====================
const CHALLENGES_DATA = {
    daily: [
        { id: "speed_calc", name: "Calcul Rapide", description: "Réponds à 10 calculs en moins de 2 minutes", icon: "⚡", reward: 50, type: "timed", subject: "calcul_mental", count: 10, timeLimit: 120 },
        { id: "perfect_dictee", name: "Dictée Parfaite", description: "Fais une dictée sans faute", icon: "✨", reward: 75, type: "perfect", subject: "dictee", count: 1 },
        { id: "tables_master", name: "Champion des Tables", description: "Récite 3 tables sans erreur", icon: "🏆", reward: 60, type: "streak", subject: "tables", count: 3 },
        { id: "lecture_hero", name: "Super Lecteur", description: "Lis et comprends 2 textes", icon: "📖", reward: 50, type: "complete", subject: "lecture", count: 2 },
        { id: "problem_solver", name: "Résolveur de Problèmes", description: "Résous 5 problèmes", icon: "🧩", reward: 55, type: "complete", subject: "problemes", count: 5 }
    ],
    weekly: [
        { id: "week_champion", name: "Champion de la Semaine", description: "Complete 50 exercices cette semaine", icon: "👑", reward: 200, type: "total", count: 50, multiSubject: true, subjects: ["calcul_mental", "francais", "lecture", "dictee", "tables", "geometrie", "problemes"] },
        { id: "all_subjects", name: "Explorateur", description: "Travaille sur toutes les matières", icon: "🌟", reward: 150, type: "variety", count: 11, multiSubject: true, subjects: ["calcul_mental", "francais", "lecture", "dictee", "tables", "geometrie", "problemes", "nombres_calculs", "grandeurs_mesures", "anglais", "sciences"] },
        { id: "streak_7", name: "7 Jours d'Affilée", description: "Connecte-toi 7 jours de suite", icon: "🔥", reward: 300, type: "streak", count: 7, multiSubject: true, subjects: ["calcul_mental", "francais", "lecture"] },
        { id: "star_collector", name: "Collectionneur d'Étoiles", description: "Gagne 20 étoiles cette semaine", icon: "⭐", reward: 175, type: "stars", count: 20, multiSubject: true, subjects: ["calcul_mental", "tables", "dictee", "geometrie"] },
        { id: "perfectionist", name: "Perfectionniste", description: "Obtiens 100% sur 10 fiches", icon: "💯", reward: 250, type: "perfect", count: 10, multiSubject: true, subjects: ["calcul_mental", "tables", "francais", "lecture"] }
    ],
    special: [
        { id: "major_unlock", name: "Futur Major", description: "Complète toutes les fiches d'une matière avec 3 étoiles", icon: "🎓", reward: 500, type: "mastery", unlocks: "badge_major", multiSubject: true, subjects: ["calcul_mental", "francais", "lecture", "dictee", "tables", "geometrie", "problemes"] },
        { id: "speed_demon", name: "Éclair", description: "Complète 20 exercices en moins de 10 minutes", icon: "💨", reward: 300, type: "speed", count: 20, timeLimit: 600, subject: "calcul_mental" },
        { id: "comeback_king", name: "Roi du Retour", description: "Améliore ton score sur 5 fiches difficiles", icon: "👊", reward: 200, type: "improvement", count: 5, subject: "problemes" }
    ]
};

// ==================== BADGES SYSTEM ====================
const BADGES_DATA = [
    { id: "first_step", name: "Premier Pas", description: "Complete ta première fiche", icon: "👶", condition: { type: "fiches_completed", count: 1 } },
    { id: "getting_started", name: "Bien Parti", description: "Complete 10 fiches", icon: "🚀", condition: { type: "fiches_completed", count: 10 } },
    { id: "hard_worker", name: "Travailleur", description: "Complete 50 fiches", icon: "💪", condition: { type: "fiches_completed", count: 50 } },
    { id: "star_beginner", name: "Étoile Montante", description: "Gagne 10 étoiles", icon: "⭐", condition: { type: "stars", count: 10 } },
    { id: "star_collector", name: "Collectionneur", description: "Gagne 50 étoiles", icon: "🌟", condition: { type: "stars", count: 50 } },
    { id: "star_master", name: "Maître des Étoiles", description: "Gagne 100 étoiles", icon: "✨", condition: { type: "stars", count: 100 } },
    { id: "math_lover", name: "Matheux", description: "Complete toutes les fiches de maths", icon: "🧮", condition: { type: "subject_complete", subject: "calcul_mental" } },
    { id: "french_master", name: "Académicien", description: "Complete toutes les fiches de français", icon: "📖", condition: { type: "subject_complete", subject: "francais" } },
    { id: "streak_3", name: "Régulier", description: "3 jours consécutifs", icon: "🔥", condition: { type: "streak", count: 3 } },
    { id: "streak_7", name: "Assidu", description: "7 jours consécutifs", icon: "🔥🔥", condition: { type: "streak", count: 7 } },
    { id: "streak_30", name: "Inarrêtable", description: "30 jours consécutifs", icon: "🔥🔥🔥", condition: { type: "streak", count: 30 } },
    { id: "perfectionist", name: "Perfectionniste", description: "Obtiens 100% sur 10 fiches", icon: "💯", condition: { type: "perfect_scores", count: 10 } },
    { id: "speed_demon", name: "Rapide", description: "Complete une fiche en moins d'1 minute", icon: "⚡", condition: { type: "speed", timeLimit: 60 } },
    { id: "major_potential", name: "Futur Major", description: "Plus de 90% de moyenne générale", icon: "🎓", condition: { type: "average", score: 90 } }
];

// ==================== LEVEL SYSTEM ====================
const LEVELS_DATA = [
    { level: 1, name: "Débutant", xpRequired: 0, icon: "🌱" },
    { level: 2, name: "Apprenti", xpRequired: 100, icon: "🌿" },
    { level: 3, name: "Élève Appliqué", xpRequired: 250, icon: "🌳" },
    { level: 4, name: "Bon Élève", xpRequired: 500, icon: "⭐" },
    { level: 5, name: "Très Bon Élève", xpRequired: 800, icon: "🌟" },
    { level: 6, name: "Excellent", xpRequired: 1200, icon: "💫" },
    { level: 7, name: "Champion", xpRequired: 1800, icon: "🏆" },
    { level: 8, name: "Expert", xpRequired: 2500, icon: "👑" },
    { level: 9, name: "Maître", xpRequired: 3500, icon: "🎓" },
    { level: 10, name: "Major de la Classe", xpRequired: 5000, icon: "🥇" }
];
