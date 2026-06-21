// Data for Rayan CE2 Learning Application
// Programme complet CE2 avec niveaux de difficulté progressifs

const SUBJECTS_DATA_CE2 = {
    francais_ce2: {
        name: "Français CE2",
        icon: "📖",
        color: "#3498db",
        fiches: [
            {
                id: 1, title: "Le groupe nominal", description: "Déterminant + nom + adjectif", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Dans 'le petit chat', quel est le déterminant ?", options: ["le", "petit", "chat"], answer: "le" },
                    { type: "qcm", question: "Dans 'une grande maison', quel est l'adjectif ?", options: ["une", "grande", "maison"], answer: "grande" },
                    { type: "qcm", question: "Dans 'les beaux arbres', quel est le nom ?", options: ["les", "beaux", "arbres"], answer: "arbres" },
                    { type: "input", question: "Complète : ___ joli jardin (déterminant)", answer: "un" },
                    { type: "qcm", question: "Lequel est un groupe nominal ?", options: ["mange vite", "le grand lion", "court rapidement"], answer: "le grand lion" }
                ]
            },
            {
                id: 2, title: "Le sujet du verbe", description: "Trouver le sujet", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Quel est le sujet dans 'Le chat dort' ?", options: ["Le", "chat", "dort", "Le chat"], answer: "Le chat" },
                    { type: "qcm", question: "Quel est le sujet dans 'Marie mange une pomme' ?", options: ["Marie", "mange", "une pomme"], answer: "Marie" },
                    { type: "qcm", question: "Quel est le sujet dans 'Les oiseaux chantent' ?", options: ["Les", "oiseaux", "chantent", "Les oiseaux"], answer: "Les oiseaux" },
                    { type: "input", question: "Dans 'Papa lit le journal', le sujet est...", answer: "Papa" },
                    { type: "qcm", question: "Le sujet répond à quelle question ?", options: ["Quoi ?", "Qui est-ce qui ?", "Comment ?"], answer: "Qui est-ce qui ?" }
                ]
            },
            {
                id: 3, title: "Passé, présent, futur", description: "Situer dans le temps", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "'Hier, j'ai mangé' est au...", options: ["passé", "présent", "futur"], answer: "passé" },
                    { type: "qcm", question: "'Demain, je partirai' est au...", options: ["passé", "présent", "futur"], answer: "futur" },
                    { type: "qcm", question: "'Maintenant, je lis' est au...", options: ["passé", "présent", "futur"], answer: "présent" },
                    { type: "qcm", question: "Quel mot indique le passé ?", options: ["demain", "hier", "aujourd'hui"], answer: "hier" },
                    { type: "qcm", question: "Quel mot indique le futur ?", options: ["la semaine dernière", "ce matin", "dans trois jours"], answer: "dans trois jours" }
                ]
            },
            {
                id: 4, title: "L'imparfait", description: "Je chantais, tu chantais...", difficulty: 2,
                exercises: [
                    { type: "input", question: "Je ___ une histoire. (raconter - imparfait)", answer: "racontais" },
                    { type: "input", question: "Tu ___ très bien. (chanter - imparfait)", answer: "chantais" },
                    { type: "input", question: "Il ___ au ballon. (jouer - imparfait)", answer: "jouait" },
                    { type: "input", question: "Nous ___ ensemble. (manger - imparfait)", answer: "mangions" },
                    { type: "input", question: "Vous ___ vos devoirs. (faire - imparfait)", answer: "faisiez" },
                    { type: "input", question: "Ils ___ très vite. (courir - imparfait)", answer: "couraient" }
                ]
            },
            {
                id: 5, title: "Le futur simple", description: "Je chanterai, tu chanteras...", difficulty: 2,
                exercises: [
                    { type: "input", question: "Je ___ demain. (partir - futur)", answer: "partirai" },
                    { type: "input", question: "Tu ___ ce livre. (lire - futur)", answer: "liras" },
                    { type: "input", question: "Elle ___ un gâteau. (faire - futur)", answer: "fera" },
                    { type: "input", question: "Nous ___ en vacances. (aller - futur)", answer: "irons" },
                    { type: "input", question: "Vous ___ contents. (être - futur)", answer: "serez" },
                    { type: "input", question: "Ils ___ leurs devoirs. (finir - futur)", answer: "finiront" }
                ]
            },
            {
                id: 6, title: "Les homophones a/à", description: "Ne pas confondre", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Il ___ un chien.", options: ["a", "à"], answer: "a" },
                    { type: "qcm", question: "Je vais ___ l'école.", options: ["a", "à"], answer: "à" },
                    { type: "qcm", question: "Marie ___ 8 ans.", options: ["a", "à"], answer: "a" },
                    { type: "qcm", question: "Papa est ___ Paris.", options: ["a", "à"], answer: "à" },
                    { type: "qcm", question: "Elle ___ mal ___ la tête.", options: ["a/à", "à/a", "a/a"], answer: "a/à" }
                ]
            },
            {
                id: 7, title: "Les homophones et/est", description: "Ne pas confondre", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Le chat ___ noir.", options: ["et", "est"], answer: "est" },
                    { type: "qcm", question: "J'aime le chocolat ___ les bonbons.", options: ["et", "est"], answer: "et" },
                    { type: "qcm", question: "Marie ___ gentille.", options: ["et", "est"], answer: "est" },
                    { type: "qcm", question: "Papa ___ maman sont là.", options: ["et", "est"], answer: "et" },
                    { type: "qcm", question: "Il ___ grand ___ fort.", options: ["et/est", "est/et", "est/est"], answer: "est/et" }
                ]
            },
            {
                id: 8, title: "Les homophones on/ont", description: "Ne pas confondre", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "___ va au parc.", options: ["On", "Ont"], answer: "On" },
                    { type: "qcm", question: "Ils ___ faim.", options: ["on", "ont"], answer: "ont" },
                    { type: "qcm", question: "___ mange ensemble.", options: ["On", "Ont"], answer: "On" },
                    { type: "qcm", question: "Les enfants ___ joué.", options: ["on", "ont"], answer: "ont" },
                    { type: "qcm", question: "___ dit que c'est bien.", options: ["On", "Ont"], answer: "On" }
                ]
            },
            {
                id: 9, title: "Les synonymes", description: "Mots de même sens", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Un synonyme de 'content' ?", options: ["triste", "heureux", "fatigué"], answer: "heureux" },
                    { type: "qcm", question: "Un synonyme de 'rapide' ?", options: ["lent", "vite", "grand"], answer: "vite" },
                    { type: "qcm", question: "Un synonyme de 'beau' ?", options: ["laid", "joli", "petit"], answer: "joli" },
                    { type: "qcm", question: "Un synonyme de 'maison' ?", options: ["demeure", "voiture", "jardin"], answer: "demeure" },
                    { type: "input", question: "Un synonyme de 'parler' (5 lettres)", answer: "dire" }
                ]
            },
            {
                id: 10, title: "Le passé composé", description: "J'ai chanté, j'ai fini...", difficulty: 3,
                exercises: [
                    { type: "input", question: "J'___ mangé. (avoir)", answer: "ai" },
                    { type: "input", question: "Tu ___ joué. (avoir)", answer: "as" },
                    { type: "input", question: "Elle ___ partie. (être)", answer: "est" },
                    { type: "input", question: "Nous ___ fini. (avoir)", answer: "avons" },
                    { type: "input", question: "Ils ___ arrivés. (être)", answer: "sont" },
                    { type: "qcm", question: "'J'ai chanté' est au...", options: ["imparfait", "passé composé", "futur"], answer: "passé composé" }
                ]
            }
        ]
    },

    calcul_ce2: {
        name: "Calcul CE2",
        icon: "🧮",
        color: "#e67e22",
        fiches: [
            {
                id: 1, title: "Addition des centaines", description: "Jusqu'à 999", difficulty: 1,
                exercises: [
                    { type: "input", question: "234 + 125 = ?", answer: "359" },
                    { type: "input", question: "456 + 321 = ?", answer: "777" },
                    { type: "input", question: "612 + 187 = ?", answer: "799" },
                    { type: "input", question: "345 + 432 = ?", answer: "777" },
                    { type: "input", question: "528 + 261 = ?", answer: "789" }
                ]
            },
            {
                id: 2, title: "Soustraction des centaines", description: "Jusqu'à 999", difficulty: 1,
                exercises: [
                    { type: "input", question: "567 - 234 = ?", answer: "333" },
                    { type: "input", question: "845 - 423 = ?", answer: "422" },
                    { type: "input", question: "999 - 111 = ?", answer: "888" },
                    { type: "input", question: "756 - 324 = ?", answer: "432" },
                    { type: "input", question: "682 - 451 = ?", answer: "231" }
                ]
            },
            {
                id: 3, title: "Multiplication par 10, 100", description: "Ajouter des zéros", difficulty: 1,
                exercises: [
                    { type: "input", question: "23 × 10 = ?", answer: "230" },
                    { type: "input", question: "45 × 10 = ?", answer: "450" },
                    { type: "input", question: "7 × 100 = ?", answer: "700" },
                    { type: "input", question: "12 × 100 = ?", answer: "1200" },
                    { type: "input", question: "56 × 10 = ?", answer: "560" }
                ]
            },
            {
                id: 4, title: "Multiplication posée", description: "Par un chiffre", difficulty: 2,
                exercises: [
                    { type: "input", question: "23 × 4 = ?", answer: "92" },
                    { type: "input", question: "45 × 3 = ?", answer: "135" },
                    { type: "input", question: "67 × 2 = ?", answer: "134" },
                    { type: "input", question: "34 × 5 = ?", answer: "170" },
                    { type: "input", question: "56 × 6 = ?", answer: "336" }
                ]
            },
            {
                id: 5, title: "Division simple", description: "Introduction à la division", difficulty: 2,
                exercises: [
                    { type: "input", question: "12 ÷ 3 = ?", answer: "4" },
                    { type: "input", question: "20 ÷ 4 = ?", answer: "5" },
                    { type: "input", question: "36 ÷ 6 = ?", answer: "6" },
                    { type: "input", question: "45 ÷ 9 = ?", answer: "5" },
                    { type: "input", question: "28 ÷ 7 = ?", answer: "4" }
                ]
            },
            {
                id: 6, title: "Les milliers", description: "Nombres à 4 chiffres", difficulty: 2,
                exercises: [
                    { type: "input", question: "Dans 3456, le chiffre des milliers est ?", answer: "3" },
                    { type: "input", question: "2 milliers + 5 centaines + 3 dizaines + 7 unités = ?", answer: "2537" },
                    { type: "input", question: "4000 + 300 + 20 + 5 = ?", answer: "4325" },
                    { type: "input", question: "Quel nombre vient après 2999 ?", answer: "3000" },
                    { type: "qcm", question: "5678 < ?", options: ["5670", "5680", "5600"], answer: "5680" }
                ]
            },
            {
                id: 7, title: "Calculs en ligne", description: "Stratégies de calcul", difficulty: 3,
                exercises: [
                    { type: "input", question: "99 + 56 = ? (pense à 100 + 56 - 1)", answer: "155" },
                    { type: "input", question: "198 + 45 = ?", answer: "243" },
                    { type: "input", question: "25 × 4 = ?", answer: "100" },
                    { type: "input", question: "125 × 8 = ?", answer: "1000" },
                    { type: "input", question: "50 × 20 = ?", answer: "1000" }
                ]
            },
            {
                id: 8, title: "Division avec reste", description: "Quotient et reste", difficulty: 3,
                exercises: [
                    { type: "input", question: "13 ÷ 4 = ? reste ?", answer: "3 reste 1" },
                    { type: "input", question: "17 ÷ 5 = ? reste ?", answer: "3 reste 2" },
                    { type: "input", question: "23 ÷ 6 = ? reste ?", answer: "3 reste 5" },
                    { type: "input", question: "Dans 14 ÷ 3, le quotient est ?", answer: "4" },
                    { type: "input", question: "Dans 14 ÷ 3, le reste est ?", answer: "2" }
                ]
            }
        ]
    },

    geometrie_ce2: {
        name: "Géométrie CE2",
        icon: "📐",
        color: "#1abc9c",
        fiches: [
            {
                id: 1, title: "Les polygones", description: "Triangles, quadrilatères...", difficulty: 1,
                exercises: [
                    { type: "input", question: "Un polygone à 3 côtés est un...", answer: "triangle" },
                    { type: "input", question: "Un polygone à 4 côtés est un...", answer: "quadrilatère" },
                    { type: "input", question: "Un polygone à 5 côtés est un...", answer: "pentagone" },
                    { type: "input", question: "Un polygone à 6 côtés est un...", answer: "hexagone" },
                    { type: "qcm", question: "Un carré est un polygone à...", options: ["3 côtés", "4 côtés", "5 côtés"], answer: "4 côtés" }
                ]
            },
            {
                id: 2, title: "Le périmètre", description: "Calculer le tour", difficulty: 2,
                exercises: [
                    { type: "input", question: "Périmètre d'un carré de 8 cm de côté ?", answer: "32" },
                    { type: "input", question: "Périmètre d'un rectangle de 10 cm sur 5 cm ?", answer: "30" },
                    { type: "input", question: "Périmètre d'un triangle de côtés 4, 5, 6 cm ?", answer: "15" },
                    { type: "qcm", question: "Formule du périmètre du carré ?", options: ["côté × 4", "côté × côté", "côté + 4"], answer: "côté × 4" },
                    { type: "input", question: "Rectangle de périmètre 24 cm, longueur 8 cm. Largeur ?", answer: "4" }
                ]
            },
            {
                id: 3, title: "Droites parallèles et perpendiculaires", description: "Relations entre droites", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Des droites qui ne se croisent jamais sont...", options: ["parallèles", "perpendiculaires", "sécantes"], answer: "parallèles" },
                    { type: "qcm", question: "Des droites qui forment un angle droit sont...", options: ["parallèles", "perpendiculaires", "sécantes"], answer: "perpendiculaires" },
                    { type: "qcm", question: "Les côtés opposés d'un rectangle sont...", options: ["parallèles", "perpendiculaires", "ni l'un ni l'autre"], answer: "parallèles" },
                    { type: "qcm", question: "Les côtés adjacents d'un rectangle sont...", options: ["parallèles", "perpendiculaires", "ni l'un ni l'autre"], answer: "perpendiculaires" },
                    { type: "qcm", question: "Quel outil pour tracer des perpendiculaires ?", options: ["règle", "équerre", "compas"], answer: "équerre" }
                ]
            },
            {
                id: 4, title: "L'aire du rectangle", description: "Calculer la surface", difficulty: 3,
                exercises: [
                    { type: "input", question: "Aire d'un rectangle de 6 cm sur 4 cm ?", answer: "24" },
                    { type: "input", question: "Aire d'un carré de 5 cm de côté ?", answer: "25" },
                    { type: "qcm", question: "L'aire se mesure en...", options: ["cm", "cm²", "cm³"], answer: "cm²" },
                    { type: "input", question: "Rectangle d'aire 30 cm², longueur 6 cm. Largeur ?", answer: "5" },
                    { type: "qcm", question: "Formule de l'aire du rectangle ?", options: ["L × l", "L + l", "(L + l) × 2"], answer: "L × l" }
                ]
            }
        ]
    },

    problemes_ce2: {
        name: "Problèmes CE2",
        icon: "🤔",
        color: "#e74c3c",
        fiches: [
            {
                id: 1, title: "Problèmes à 2 étapes", description: "Niveau 1", difficulty: 1,
                exercises: [
                    { type: "input", question: "Lucas a 45 billes. Il en gagne 28 puis en donne 15. Combien en a-t-il ?", answer: "58" },
                    { type: "input", question: "Une classe de 24 élèves. 8 filles partent, 5 garçons arrivent. Combien d'élèves ?", answer: "21" },
                    { type: "input", question: "Marie a 50 euros. Elle achète un livre à 12 euros et un stylo à 3 euros. Combien lui reste-t-il ?", answer: "35" }
                ]
            },
            {
                id: 2, title: "Problèmes de multiplication", description: "Niveau 2", difficulty: 2,
                exercises: [
                    { type: "input", question: "Une boîte contient 24 crayons. Combien de crayons dans 5 boîtes ?", answer: "120" },
                    { type: "input", question: "Un livre coûte 8 euros. Combien coûtent 7 livres ?", answer: "56" },
                    { type: "input", question: "Une classe a 6 rangées de 5 tables. Combien de tables ?", answer: "30" },
                    { type: "input", question: "Un paquet contient 12 biscuits. Combien de biscuits dans 4 paquets ?", answer: "48" }
                ]
            },
            {
                id: 3, title: "Problèmes de division", description: "Partage", difficulty: 2,
                exercises: [
                    { type: "input", question: "48 bonbons partagés entre 8 enfants. Combien chacun ?", answer: "6" },
                    { type: "input", question: "60 élèves répartis en 5 groupes égaux. Combien par groupe ?", answer: "12" },
                    { type: "input", question: "35 livres rangés sur 7 étagères. Combien par étagère ?", answer: "5" },
                    { type: "input", question: "Un fermier a 72 œufs. Il fait des boîtes de 6. Combien de boîtes ?", answer: "12" }
                ]
            },
            {
                id: 4, title: "Problèmes de durée", description: "Heures et minutes", difficulty: 3,
                exercises: [
                    { type: "input", question: "Un film commence à 14h30 et dure 2 heures. À quelle heure finit-il ? (format: 16h30)", answer: "16h30" },
                    { type: "input", question: "Le train part à 9h15 et arrive à 11h45. Combien de temps dure le trajet ? (en minutes)", answer: "150" },
                    { type: "input", question: "Il est 10h45. Dans 1h30, quelle heure sera-t-il ? (format: 12h15)", answer: "12h15" }
                ]
            }
        ]
    },

    mesures_ce2: {
        name: "Grandeurs et Mesures CE2",
        icon: "📏",
        color: "#16a085",
        fiches: [
            {
                id: 1, title: "Les longueurs", description: "mm, cm, dm, m, km", difficulty: 1,
                exercises: [
                    { type: "input", question: "1 m = ? cm", answer: "100" },
                    { type: "input", question: "1 km = ? m", answer: "1000" },
                    { type: "input", question: "1 dm = ? cm", answer: "10" },
                    { type: "input", question: "5 m = ? cm", answer: "500" },
                    { type: "input", question: "3 km = ? m", answer: "3000" }
                ]
            },
            {
                id: 2, title: "Les masses", description: "g, kg, tonne", difficulty: 2,
                exercises: [
                    { type: "input", question: "1 kg = ? g", answer: "1000" },
                    { type: "input", question: "1 tonne = ? kg", answer: "1000" },
                    { type: "input", question: "3 kg = ? g", answer: "3000" },
                    { type: "input", question: "2500 g = ? kg et ? g", answer: "2 kg et 500 g" },
                    { type: "qcm", question: "Une voiture pèse environ...", options: ["1 kg", "100 kg", "1 tonne"], answer: "1 tonne" }
                ]
            },
            {
                id: 3, title: "L'heure", description: "Heures, minutes, secondes", difficulty: 2,
                exercises: [
                    { type: "input", question: "1 heure = ? minutes", answer: "60" },
                    { type: "input", question: "1 minute = ? secondes", answer: "60" },
                    { type: "input", question: "2 heures = ? minutes", answer: "120" },
                    { type: "input", question: "90 minutes = ? heure(s) et ? minutes", answer: "1 heure et 30 minutes" },
                    { type: "input", question: "14h30 + 45 minutes = ? (format: 15h15)", answer: "15h15" }
                ]
            },
            {
                id: 4, title: "La monnaie", description: "Calculs avec euros", difficulty: 2,
                exercises: [
                    { type: "input", question: "1 euro = ? centimes", answer: "100" },
                    { type: "input", question: "5,50 € + 2,30 € = ? €", answer: "7,80" },
                    { type: "input", question: "10 € - 3,75 € = ? €", answer: "6,25" },
                    { type: "input", question: "J'ai 20 €. J'achète un livre à 12,50 €. Combien me reste-t-il ?", answer: "7,50" }
                ]
            }
        ]
    },

    anglais_ce2: {
        name: "Anglais CE2",
        icon: "🇬🇧",
        color: "#3498db",
        fiches: [
            {
                id: 1, title: "Numbers 1-20", description: "Compter jusqu'à 20", difficulty: 1,
                exercises: [
                    { type: "input", question: "Eleven = ? (chiffre)", answer: "11" },
                    { type: "input", question: "Fifteen = ? (chiffre)", answer: "15" },
                    { type: "input", question: "Twenty = ? (chiffre)", answer: "20" },
                    { type: "qcm", question: "Comment dit-on '13' ?", options: ["Twelve", "Thirteen", "Fourteen"], answer: "Thirteen" },
                    { type: "qcm", question: "Comment dit-on '17' ?", options: ["Sixteen", "Seventeen", "Eighteen"], answer: "Seventeen" }
                ]
            },
            {
                id: 2, title: "Days of the week", description: "Les jours", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "Comment dit-on 'lundi' ?", options: ["Monday", "Tuesday", "Sunday"], answer: "Monday" },
                    { type: "qcm", question: "'Wednesday' signifie...", options: ["mardi", "mercredi", "jeudi"], answer: "mercredi" },
                    { type: "qcm", question: "Quel jour vient après 'Friday' ?", options: ["Thursday", "Saturday", "Sunday"], answer: "Saturday" },
                    { type: "input", question: "Sunday = ? (en français)", answer: "dimanche" },
                    { type: "input", question: "Combien de jours dans une semaine ?", answer: "7" }
                ]
            },
            {
                id: 3, title: "Months of the year", description: "Les mois", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Comment dit-on 'janvier' ?", options: ["January", "June", "July"], answer: "January" },
                    { type: "qcm", question: "'December' signifie...", options: ["novembre", "décembre", "septembre"], answer: "décembre" },
                    { type: "input", question: "February = ? (en français)", answer: "fevrier" },
                    { type: "qcm", question: "Quel mois vient après 'August' ?", options: ["July", "September", "October"], answer: "September" },
                    { type: "input", question: "Combien de mois dans une année ?", answer: "12" }
                ]
            },
            {
                id: 4, title: "Weather", description: "La météo", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "'It's sunny' signifie...", options: ["Il pleut", "Il fait soleil", "Il neige"], answer: "Il fait soleil" },
                    { type: "qcm", question: "Comment dit-on 'il pleut' ?", options: ["It's snowing", "It's raining", "It's windy"], answer: "It's raining" },
                    { type: "qcm", question: "'It's cold' signifie...", options: ["Il fait chaud", "Il fait froid", "Il fait beau"], answer: "Il fait froid" },
                    { type: "input", question: "Hot = ? (en français)", answer: "chaud" },
                    { type: "qcm", question: "Comment dit-on 'il neige' ?", options: ["It's raining", "It's snowing", "It's cloudy"], answer: "It's snowing" }
                ]
            },
            {
                id: 5, title: "Food and drinks", description: "Nourriture", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "Comment dit-on 'pain' ?", options: ["Bread", "Butter", "Cheese"], answer: "Bread" },
                    { type: "qcm", question: "'Milk' signifie...", options: ["eau", "lait", "jus"], answer: "lait" },
                    { type: "input", question: "Apple = ? (en français)", answer: "pomme" },
                    { type: "qcm", question: "Comment dit-on 'fromage' ?", options: ["Chicken", "Cheese", "Chocolate"], answer: "Cheese" },
                    { type: "input", question: "Water = ? (en français)", answer: "eau" }
                ]
            }
        ]
    },

    sciences_ce2: {
        name: "Sciences CE2",
        icon: "🔬",
        color: "#8e44ad",
        fiches: [
            {
                id: 1, title: "La chaîne alimentaire", description: "Qui mange qui ?", difficulty: 1,
                exercises: [
                    { type: "qcm", question: "L'herbe est mangée par...", options: ["le renard", "le lapin", "l'aigle"], answer: "le lapin" },
                    { type: "qcm", question: "Le lapin est mangé par...", options: ["l'herbe", "le renard", "la souris"], answer: "le renard" },
                    { type: "qcm", question: "Les animaux qui mangent des plantes sont des...", options: ["carnivores", "herbivores", "omnivores"], answer: "herbivores" },
                    { type: "qcm", question: "Les animaux qui mangent de la viande sont des...", options: ["carnivores", "herbivores", "omnivores"], answer: "carnivores" },
                    { type: "qcm", question: "L'homme est un...", options: ["carnivore", "herbivore", "omnivore"], answer: "omnivore" }
                ]
            },
            {
                id: 2, title: "Les états de la matière", description: "Solide, liquide, gaz", difficulty: 2,
                exercises: [
                    { type: "qcm", question: "La glace est à l'état...", options: ["solide", "liquide", "gazeux"], answer: "solide" },
                    { type: "qcm", question: "L'eau du robinet est à l'état...", options: ["solide", "liquide", "gazeux"], answer: "liquide" },
                    { type: "qcm", question: "La vapeur d'eau est à l'état...", options: ["solide", "liquide", "gazeux"], answer: "gazeux" },
                    { type: "qcm", question: "Quand l'eau gèle, elle passe de...", options: ["solide à liquide", "liquide à solide", "liquide à gaz"], answer: "liquide à solide" },
                    { type: "input", question: "L'eau bout à ? degrés Celsius", answer: "100" }
                ]
            },
            {
                id: 3, title: "Le système solaire", description: "Les planètes", difficulty: 2,
                exercises: [
                    { type: "input", question: "Combien de planètes dans le système solaire ?", answer: "8" },
                    { type: "qcm", question: "La planète la plus proche du Soleil ?", options: ["Vénus", "Mercure", "Mars"], answer: "Mercure" },
                    { type: "qcm", question: "La planète la plus grande ?", options: ["Saturne", "Jupiter", "Uranus"], answer: "Jupiter" },
                    { type: "qcm", question: "Quelle planète a des anneaux visibles ?", options: ["Mars", "Saturne", "Neptune"], answer: "Saturne" },
                    { type: "qcm", question: "La Terre est la ? planète en partant du Soleil", options: ["2ème", "3ème", "4ème"], answer: "3ème" }
                ]
            },
            {
                id: 4, title: "Le corps humain", description: "Les organes", difficulty: 3,
                exercises: [
                    { type: "qcm", question: "Quel organe permet de respirer ?", options: ["le cœur", "les poumons", "l'estomac"], answer: "les poumons" },
                    { type: "qcm", question: "Quel organe fait circuler le sang ?", options: ["le cœur", "le cerveau", "les reins"], answer: "le cœur" },
                    { type: "qcm", question: "Où se fait la digestion ?", options: ["dans les poumons", "dans l'estomac", "dans le cœur"], answer: "dans l'estomac" },
                    { type: "input", question: "Combien d'os dans le corps humain ? (environ)", answer: "206" },
                    { type: "qcm", question: "Le cerveau contrôle...", options: ["seulement les bras", "tout le corps", "seulement les jambes"], answer: "tout le corps" }
                ]
            }
        ]
    },

    lecture_ce2: {
        name: "Lecture CE2",
        icon: "📚",
        color: "#e91e63",
        fiches: [
            {
                id: 1, title: "Texte narratif", description: "Comprendre une histoire", difficulty: 2,
                exercises: [
                    { type: "lecture", text: "Paul se réveille tôt ce matin. C'est le jour de la rentrée des classes ! Il enfile rapidement ses vêtements neufs et descend prendre son petit-déjeuner. Sa maman a préparé des croissants. Paul est un peu nerveux car il va rencontrer sa nouvelle maîtresse.", questions: [
                        { type: "qcm", question: "Quel jour est-ce ?", options: ["Un anniversaire", "La rentrée des classes", "Un jour de vacances"], answer: "La rentrée des classes" },
                        { type: "qcm", question: "Que mange Paul au petit-déjeuner ?", options: ["Des céréales", "Des croissants", "Des tartines"], answer: "Des croissants" },
                        { type: "qcm", question: "Comment se sent Paul ?", options: ["Fatigué", "Nerveux", "En colère"], answer: "Nerveux" }
                    ]}
                ]
            },
            {
                id: 2, title: "Texte documentaire", description: "Apprendre en lisant", difficulty: 2,
                exercises: [
                    { type: "lecture", text: "Les abeilles sont des insectes très importants pour la nature. Elles vivent en groupe dans une ruche. La reine est la seule à pondre des œufs. Les ouvrières récoltent le nectar des fleurs pour fabriquer du miel. Sans les abeilles, beaucoup de plantes ne pourraient pas se reproduire.", questions: [
                        { type: "qcm", question: "Où vivent les abeilles ?", options: ["Dans un nid", "Dans une ruche", "Dans un terrier"], answer: "Dans une ruche" },
                        { type: "qcm", question: "Qui pond les œufs ?", options: ["Les ouvrières", "La reine", "Toutes les abeilles"], answer: "La reine" },
                        { type: "qcm", question: "Avec quoi les abeilles fabriquent-elles le miel ?", options: ["Du pollen", "Du nectar", "De l'eau"], answer: "Du nectar" }
                    ]}
                ]
            },
            {
                id: 3, title: "Texte poétique", description: "Comprendre un poème", difficulty: 3,
                exercises: [
                    { type: "lecture", text: "L'automne\n\nLes feuilles tombent doucement,\nComme des papillons dansant.\nLe vent souffle dans les branches,\nEt le ciel devient tout blanc.\n\nLes oiseaux partent au loin,\nVers des pays sans chagrin.\nL'automne est une saison,\nQui colore la maison.", questions: [
                        { type: "qcm", question: "De quelle saison parle ce poème ?", options: ["Le printemps", "L'été", "L'automne"], answer: "L'automne" },
                        { type: "qcm", question: "À quoi sont comparées les feuilles ?", options: ["À des oiseaux", "À des papillons", "À des nuages"], answer: "À des papillons" },
                        { type: "qcm", question: "Que font les oiseaux ?", options: ["Ils chantent", "Ils partent au loin", "Ils dorment"], answer: "Ils partent au loin" }
                    ]}
                ]
            }
        ]
    },

    dictee_ce2: {
        name: "Dictée CE2",
        icon: "✏️",
        color: "#9b59b6",
        fiches: [
            {
                id: 1, title: "Mots invariables", description: "Niveau 1", difficulty: 1,
                exercises: [
                    { type: "dictee", text: "Aujourd'hui, je vais souvent à l'école.", hint: "Mots invariables" },
                    { type: "dictee", text: "Il fait toujours beau pendant les vacances.", hint: "Temps" },
                    { type: "dictee", text: "Nous partons ensemble demain matin.", hint: "Ensemble" }
                ]
            },
            {
                id: 2, title: "Accords", description: "Niveau 2", difficulty: 2,
                exercises: [
                    { type: "dictee", text: "Les petits chats jouent dans le jardin.", hint: "Pluriel" },
                    { type: "dictee", text: "Ma grande sœur est très gentille.", hint: "Féminin" },
                    { type: "dictee", text: "Ces belles fleurs poussent au printemps.", hint: "Pluriel + adjectif" }
                ]
            },
            {
                id: 3, title: "Homophones", description: "Niveau 3", difficulty: 3,
                exercises: [
                    { type: "dictee", text: "Il a un livre à lire ce soir.", hint: "a/à" },
                    { type: "dictee", text: "Le chat est noir et blanc.", hint: "et/est" },
                    { type: "dictee", text: "On dit qu'ils ont beaucoup de travail.", hint: "on/ont" }
                ]
            }
        ]
    },

    tables_ce2: {
        name: "Tables CE2",
        icon: "✖️",
        color: "#f39c12",
        fiches: [
            { id: 1, title: "Révision tables 2-5", description: "Consolidation", difficulty: 1, exercises: [
                { type: "input", question: "3 × 7 = ?", answer: "21" },
                { type: "input", question: "4 × 8 = ?", answer: "32" },
                { type: "input", question: "5 × 9 = ?", answer: "45" },
                { type: "input", question: "2 × 12 = ?", answer: "24" },
                { type: "input", question: "4 × 6 = ?", answer: "24" }
            ]},
            { id: 2, title: "Révision tables 6-10", description: "Consolidation", difficulty: 2, exercises: [
                { type: "input", question: "6 × 7 = ?", answer: "42" },
                { type: "input", question: "7 × 8 = ?", answer: "56" },
                { type: "input", question: "8 × 9 = ?", answer: "72" },
                { type: "input", question: "9 × 6 = ?", answer: "54" },
                { type: "input", question: "7 × 7 = ?", answer: "49" }
            ]},
            { id: 3, title: "Tables inversées", description: "Division", difficulty: 2, exercises: [
                { type: "input", question: "? × 6 = 42", answer: "7" },
                { type: "input", question: "? × 8 = 64", answer: "8" },
                { type: "input", question: "? × 7 = 56", answer: "8" },
                { type: "input", question: "? × 9 = 81", answer: "9" },
                { type: "input", question: "? × 5 = 45", answer: "9" }
            ]},
            { id: 4, title: "Tables mélangées expert", description: "Niveau expert", difficulty: 3, exercises: [
                { type: "input", question: "8 × 7 = ?", answer: "56" },
                { type: "input", question: "9 × 8 = ?", answer: "72" },
                { type: "input", question: "7 × 9 = ?", answer: "63" },
                { type: "input", question: "6 × 8 = ?", answer: "48" },
                { type: "input", question: "9 × 9 = ?", answer: "81" },
                { type: "input", question: "? × 7 = 63", answer: "9" },
                { type: "input", question: "? × 8 = 72", answer: "9" }
            ]}
        ]
    }
};

// CE2 Subject icons
const SUBJECT_ICONS_CE2 = {
    francais_ce2: "📖",
    calcul_ce2: "🧮",
    geometrie_ce2: "📐",
    problemes_ce2: "🤔",
    mesures_ce2: "📏",
    anglais_ce2: "🇬🇧",
    sciences_ce2: "🔬",
    lecture_ce2: "📚",
    dictee_ce2: "✏️",
    tables_ce2: "✖️"
};
