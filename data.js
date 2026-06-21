// Data for Rayan CE1 Learning Application
// All exercises extracted from the existing content

const SUBJECTS_DATA = {
    dictee: {
        name: "Dictée Flash",
        icon: "✏️",
        color: "#3498db",
        fiches: [
            {
                id: 1,
                title: "Les sons simples",
                description: "Mots avec les sons de base",
                exercises: [
                    { type: "dictee", text: "Le chat dort sur le lit.", hint: "Animal domestique" },
                    { type: "dictee", text: "Papa lit un livre.", hint: "Action de lecture" },
                    { type: "dictee", text: "Maman fait un gâteau.", hint: "Pâtisserie" },
                    { type: "dictee", text: "Le soleil brille.", hint: "Étoile du jour" },
                    { type: "dictee", text: "Je vais à l'école.", hint: "Lieu d'apprentissage" }
                ]
            },
            {
                id: 2,
                title: "Les sons complexes",
                description: "ou, on, an, en, in",
                exercises: [
                    { type: "dictee", text: "Le mouton mange de l'herbe.", hint: "Animal de la ferme" },
                    { type: "dictee", text: "Mon ballon est rouge.", hint: "Jouet rond" },
                    { type: "dictee", text: "L'enfant joue dans le jardin.", hint: "Petit garçon ou fille" },
                    { type: "dictee", text: "Le lapin court vite.", hint: "Animal aux longues oreilles" },
                    { type: "dictee", text: "Nous chantons une chanson.", hint: "Musique avec des paroles" }
                ]
            },
            {
                id: 3,
                title: "Les doubles consonnes",
                description: "Mots avec ll, ss, tt, mm, nn",
                exercises: [
                    { type: "dictee", text: "La fille joue à la balle.", hint: "Enfant féminin" },
                    { type: "dictee", text: "La poisson nage dans l'eau.", hint: "Animal aquatique" },
                    { type: "dictee", text: "J'aime la pomme rouge.", hint: "Fruit" },
                    { type: "dictee", text: "La lettre est sur la table.", hint: "Courrier" },
                    { type: "dictee", text: "Bonne nuit petit garçon.", hint: "Salutation du soir" }
                ]
            },
            {
                id: 4,
                title: "Le son [oi]",
                description: "Mots avec oi",
                exercises: [
                    { type: "dictee", text: "Le roi vit dans un château.", hint: "Souverain" },
                    { type: "dictee", text: "J'ai froid en hiver.", hint: "Sensation de température" },
                    { type: "dictee", text: "Trois oiseaux chantent.", hint: "Nombre" },
                    { type: "dictee", text: "Je bois de l'eau.", hint: "Action de boire" },
                    { type: "dictee", text: "La voiture est noire.", hint: "Véhicule" }
                ]
            },
            {
                id: 5,
                title: "Le son [eau/au/o]",
                description: "Différentes écritures du son o",
                exercises: [
                    { type: "dictee", text: "L'oiseau vole haut.", hint: "Animal à plumes" },
                    { type: "dictee", text: "Le bateau navigue sur l'eau.", hint: "Véhicule maritime" },
                    { type: "dictee", text: "Le chapeau est jaune.", hint: "Couvre-chef" },
                    { type: "dictee", text: "Le vélo est dans le garage.", hint: "Transport à deux roues" },
                    { type: "dictee", text: "Un beau gâteau au chocolat.", hint: "Pâtisserie" }
                ]
            },
            {
                id: 6,
                title: "Le son [è]",
                description: "è, ê, ai, ei, et",
                exercises: [
                    { type: "dictee", text: "Ma mère prépare le repas.", hint: "Parent féminin" },
                    { type: "dictee", text: "La forêt est grande.", hint: "Lieu avec beaucoup d'arbres" },
                    { type: "dictee", text: "J'aime le lait.", hint: "Boisson blanche" },
                    { type: "dictee", text: "La neige est blanche.", hint: "Précipitation hivernale" },
                    { type: "dictee", text: "Le poulet est cuit.", hint: "Volaille" }
                ]
            },
            {
                id: 7,
                title: "Les accents",
                description: "é, è, ê, ë",
                exercises: [
                    { type: "dictee", text: "L'été est ma saison préférée.", hint: "Saison chaude" },
                    { type: "dictee", text: "Mon père travaille.", hint: "Parent masculin" },
                    { type: "dictee", text: "La fête est samedi.", hint: "Célébration" },
                    { type: "dictee", text: "Noël arrive bientôt.", hint: "Fête de décembre" },
                    { type: "dictee", text: "L'élève écoute la leçon.", hint: "Étudiant" }
                ]
            },
            {
                id: 8,
                title: "Les mots invariables",
                description: "Mots qui ne changent jamais",
                exercises: [
                    { type: "dictee", text: "Je suis toujours content.", hint: "À chaque fois" },
                    { type: "dictee", text: "Il fait souvent beau.", hint: "Fréquemment" },
                    { type: "dictee", text: "Nous allons parfois au parc.", hint: "De temps en temps" },
                    { type: "dictee", text: "Elle court très vite.", hint: "Beaucoup" },
                    { type: "dictee", text: "Ils arrivent maintenant.", hint: "En ce moment" }
                ]
            },
            {
                id: 9,
                title: "Le pluriel",
                description: "Formation du pluriel",
                exercises: [
                    { type: "dictee", text: "Les chats dorment.", hint: "Plusieurs animaux" },
                    { type: "dictee", text: "Les oiseaux chantent.", hint: "Pluriel en -x" },
                    { type: "dictee", text: "Les enfants jouent.", hint: "Plusieurs petits" },
                    { type: "dictee", text: "Les chevaux galopent.", hint: "Pluriel irrégulier" },
                    { type: "dictee", text: "Les gâteaux sont bons.", hint: "Pluriel en -x" }
                ]
            },
            {
                id: 10,
                title: "Révision générale",
                description: "Tous les sons appris",
                exercises: [
                    { type: "dictee", text: "Le petit garçon mange une pomme rouge.", hint: "Phrase complète" },
                    { type: "dictee", text: "Ma sœur joue avec son ballon.", hint: "Famille" },
                    { type: "dictee", text: "Les oiseaux volent dans le ciel bleu.", hint: "Nature" },
                    { type: "dictee", text: "Papa prépare un bon repas.", hint: "Cuisine" },
                    { type: "dictee", text: "Nous allons à la plage cet été.", hint: "Vacances" }
                ]
            }
        ]
    },

    geometrie: {
        name: "Géométrie",
        icon: "📐",
        color: "#9b59b6",
        fiches: [
            {
                id: 1,
                title: "Les formes géométriques",
                description: "Reconnaître les formes de base",
                exercises: [
                    { type: "qcm", question: "Combien de côtés a un triangle ?", options: ["2", "3", "4", "5"], answer: "3" },
                    { type: "qcm", question: "Quelle forme a 4 côtés égaux et 4 angles droits ?", options: ["Triangle", "Rectangle", "Carré", "Cercle"], answer: "Carré" },
                    { type: "qcm", question: "Un cercle a-t-il des côtés ?", options: ["Oui", "Non"], answer: "Non" },
                    { type: "qcm", question: "Combien de côtés a un rectangle ?", options: ["3", "4", "5", "6"], answer: "4" },
                    { type: "qcm", question: "Quelle forme n'a pas d'angle ?", options: ["Carré", "Triangle", "Cercle", "Rectangle"], answer: "Cercle" }
                ]
            },
            {
                id: 2,
                title: "Les lignes",
                description: "Droites, segments, points",
                exercises: [
                    { type: "qcm", question: "Une ligne qui ne s'arrête jamais est une...", options: ["Segment", "Droite", "Point", "Courbe"], answer: "Droite" },
                    { type: "qcm", question: "Une ligne avec un début et une fin est un...", options: ["Droite", "Segment", "Cercle", "Angle"], answer: "Segment" },
                    { type: "qcm", question: "Deux droites qui ne se croisent jamais sont...", options: ["Perpendiculaires", "Parallèles", "Sécantes", "Courbes"], answer: "Parallèles" },
                    { type: "qcm", question: "Deux droites qui se croisent en formant un angle droit sont...", options: ["Parallèles", "Perpendiculaires", "Courbes", "Segments"], answer: "Perpendiculaires" },
                    { type: "input", question: "Combien de points faut-il pour tracer une droite ?", answer: "2" }
                ]
            },
            {
                id: 3,
                title: "Le carré",
                description: "Propriétés du carré",
                exercises: [
                    { type: "input", question: "Combien de côtés a un carré ?", answer: "4" },
                    { type: "qcm", question: "Les côtés d'un carré sont-ils tous égaux ?", options: ["Oui", "Non"], answer: "Oui" },
                    { type: "input", question: "Combien d'angles droits a un carré ?", answer: "4" },
                    { type: "qcm", question: "Un carré est-il un rectangle particulier ?", options: ["Oui", "Non"], answer: "Oui" },
                    { type: "input", question: "Si un côté du carré mesure 5 cm, combien mesure le périmètre ?", answer: "20" }
                ]
            },
            {
                id: 4,
                title: "Le rectangle",
                description: "Propriétés du rectangle",
                exercises: [
                    { type: "input", question: "Combien de côtés a un rectangle ?", answer: "4" },
                    { type: "qcm", question: "Les côtés opposés d'un rectangle sont-ils égaux ?", options: ["Oui", "Non"], answer: "Oui" },
                    { type: "input", question: "Combien d'angles droits a un rectangle ?", answer: "4" },
                    { type: "qcm", question: "Le rectangle a-t-il tous ses côtés égaux ?", options: ["Oui", "Non", "Parfois"], answer: "Non" },
                    { type: "input", question: "Un rectangle a une longueur de 6 cm et une largeur de 3 cm. Quel est son périmètre ?", answer: "18" }
                ]
            },
            {
                id: 5,
                title: "Le triangle",
                description: "Propriétés du triangle",
                exercises: [
                    { type: "input", question: "Combien de côtés a un triangle ?", answer: "3" },
                    { type: "input", question: "Combien de sommets a un triangle ?", answer: "3" },
                    { type: "qcm", question: "Un triangle avec tous les côtés égaux s'appelle...", options: ["Isocèle", "Équilatéral", "Rectangle", "Scalène"], answer: "Équilatéral" },
                    { type: "qcm", question: "Un triangle avec deux côtés égaux s'appelle...", options: ["Équilatéral", "Isocèle", "Rectangle", "Scalène"], answer: "Isocèle" },
                    { type: "input", question: "Combien d'angles a un triangle ?", answer: "3" }
                ]
            },
            {
                id: 6,
                title: "Le cercle",
                description: "Propriétés du cercle",
                exercises: [
                    { type: "qcm", question: "Le centre du cercle est-il sur le cercle ?", options: ["Oui", "Non"], answer: "Non" },
                    { type: "qcm", question: "Comment s'appelle la ligne qui fait le tour du cercle ?", options: ["Rayon", "Diamètre", "Cercle", "Périmètre"], answer: "Cercle" },
                    { type: "qcm", question: "Le rayon va du centre jusqu'où ?", options: ["Au milieu", "Au bord du cercle", "Nulle part", "À l'extérieur"], answer: "Au bord du cercle" },
                    { type: "qcm", question: "Le diamètre est égal à combien de rayons ?", options: ["1", "2", "3", "4"], answer: "2" },
                    { type: "qcm", question: "Quel outil utilise-t-on pour tracer un cercle ?", options: ["Règle", "Équerre", "Compas", "Rapporteur"], answer: "Compas" }
                ]
            },
            {
                id: 7,
                title: "La symétrie",
                description: "Reconnaître et tracer des symétries",
                exercises: [
                    { type: "qcm", question: "Une figure symétrique peut se plier en deux parties...", options: ["Différentes", "Identiques", "Opposées", "Grandes"], answer: "Identiques" },
                    { type: "qcm", question: "La ligne de pliage s'appelle...", options: ["Axe de symétrie", "Segment", "Droite", "Rayon"], answer: "Axe de symétrie" },
                    { type: "qcm", question: "Un carré a combien d'axes de symétrie ?", options: ["1", "2", "4", "0"], answer: "4" },
                    { type: "qcm", question: "Un rectangle a combien d'axes de symétrie ?", options: ["1", "2", "4", "0"], answer: "2" },
                    { type: "qcm", question: "Un cercle a combien d'axes de symétrie ?", options: ["1", "2", "4", "Infini"], answer: "Infini" }
                ]
            },
            {
                id: 8,
                title: "Se repérer dans l'espace",
                description: "Gauche, droite, dessus, dessous",
                exercises: [
                    { type: "qcm", question: "Le contraire de gauche est...", options: ["Haut", "Bas", "Droite", "Devant"], answer: "Droite" },
                    { type: "qcm", question: "Le contraire de dessus est...", options: ["Gauche", "Droite", "Dessous", "Devant"], answer: "Dessous" },
                    { type: "qcm", question: "Le contraire de devant est...", options: ["Gauche", "Droite", "Dessus", "Derrière"], answer: "Derrière" },
                    { type: "qcm", question: "Quand tu regardes une carte, le Nord est généralement...", options: ["En bas", "En haut", "À gauche", "À droite"], answer: "En haut" },
                    { type: "qcm", question: "Sur un quadrillage, pour aller à droite, on va vers...", options: ["Le haut", "Le bas", "La droite", "La gauche"], answer: "La droite" }
                ]
            },
            {
                id: 9,
                title: "Le quadrillage",
                description: "Se repérer sur un quadrillage",
                exercises: [
                    { type: "qcm", question: "Sur un quadrillage, chaque case est repérée par...", options: ["Un numéro", "Une lettre et un chiffre", "Une couleur", "Un dessin"], answer: "Une lettre et un chiffre" },
                    { type: "qcm", question: "Les lignes horizontales vont de...", options: ["Haut en bas", "Gauche à droite", "En diagonale", "En cercle"], answer: "Gauche à droite" },
                    { type: "qcm", question: "Les lignes verticales vont de...", options: ["Haut en bas", "Gauche à droite", "En diagonale", "En cercle"], answer: "Haut en bas" },
                    { type: "input", question: "Sur un quadrillage 5x5, combien y a-t-il de cases ?", answer: "25" },
                    { type: "qcm", question: "Le noeud est le point où deux lignes...", options: ["S'éloignent", "Se croisent", "S'arrêtent", "Commencent"], answer: "Se croisent" }
                ]
            },
            {
                id: 10,
                title: "Les solides",
                description: "Cube, pavé, boule, cylindre",
                exercises: [
                    { type: "qcm", question: "Un dé à jouer a la forme d'un...", options: ["Pavé", "Cube", "Cylindre", "Cône"], answer: "Cube" },
                    { type: "input", question: "Combien de faces a un cube ?", answer: "6" },
                    { type: "qcm", question: "Une boîte de céréales a la forme d'un...", options: ["Cube", "Pavé", "Cylindre", "Cône"], answer: "Pavé" },
                    { type: "qcm", question: "Un ballon de foot a la forme d'une...", options: ["Cube", "Pavé", "Boule", "Cylindre"], answer: "Boule" },
                    { type: "qcm", question: "Une boîte de conserve a la forme d'un...", options: ["Cube", "Pavé", "Boule", "Cylindre"], answer: "Cylindre" }
                ]
            },
            {
                id: 11,
                title: "Les angles",
                description: "Angle droit et autres angles",
                exercises: [
                    { type: "qcm", question: "Quel outil utilise-t-on pour vérifier un angle droit ?", options: ["Règle", "Compas", "Équerre", "Rapporteur"], answer: "Équerre" },
                    { type: "qcm", question: "Un angle plus petit qu'un angle droit est...", options: ["Aigu", "Obtus", "Plat", "Droit"], answer: "Aigu" },
                    { type: "qcm", question: "Un angle plus grand qu'un angle droit est...", options: ["Aigu", "Obtus", "Plat", "Droit"], answer: "Obtus" },
                    { type: "input", question: "Combien d'angles droits y a-t-il dans un carré ?", answer: "4" },
                    { type: "qcm", question: "Le coin d'une feuille de papier forme un angle...", options: ["Aigu", "Obtus", "Droit", "Plat"], answer: "Droit" }
                ]
            },
            {
                id: 12,
                title: "Révision Géométrie",
                description: "Tous les thèmes",
                exercises: [
                    { type: "input", question: "Combien de côtés a un hexagone ?", answer: "6" },
                    { type: "qcm", question: "Un carré a tous ses côtés...", options: ["Différents", "Égaux", "Parallèles", "Perpendiculaires"], answer: "Égaux" },
                    { type: "input", question: "Combien de faces a un pavé ?", answer: "6" },
                    { type: "qcm", question: "Deux droites qui se croisent à angle droit sont...", options: ["Parallèles", "Perpendiculaires", "Sécantes", "Courbes"], answer: "Perpendiculaires" },
                    { type: "input", question: "Périmètre d'un carré de 7 cm de côté ?", answer: "28" }
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
                id: 1,
                title: "Additions 0-10",
                description: "Additions simples",
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
                id: 2,
                title: "Soustractions 0-10",
                description: "Soustractions simples",
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
                id: 3,
                title: "Compléments à 10",
                description: "Trouver le nombre manquant",
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
                id: 4,
                title: "Ajouter et enlever 10",
                description: "Calculs avec 10",
                exercises: [
                    { type: "input", question: "15 + 10 = ?", answer: "25" },
                    { type: "input", question: "23 + 10 = ?", answer: "33" },
                    { type: "input", question: "47 + 10 = ?", answer: "57" },
                    { type: "input", question: "31 + 10 = ?", answer: "41" },
                    { type: "input", question: "68 + 10 = ?", answer: "78" },
                    { type: "input", question: "25 - 10 = ?", answer: "15" },
                    { type: "input", question: "43 - 10 = ?", answer: "33" },
                    { type: "input", question: "56 - 10 = ?", answer: "46" },
                    { type: "input", question: "72 - 10 = ?", answer: "62" },
                    { type: "input", question: "89 - 10 = ?", answer: "79" }
                ]
            },
            {
                id: 5,
                title: "Les doubles",
                description: "Calculer les doubles",
                exercises: [
                    { type: "input", question: "3 + 3 = ?", answer: "6" },
                    { type: "input", question: "5 + 5 = ?", answer: "10" },
                    { type: "input", question: "7 + 7 = ?", answer: "14" },
                    { type: "input", question: "4 + 4 = ?", answer: "8" },
                    { type: "input", question: "6 + 6 = ?", answer: "12" },
                    { type: "input", question: "8 + 8 = ?", answer: "16" },
                    { type: "input", question: "9 + 9 = ?", answer: "18" },
                    { type: "input", question: "10 + 10 = ?", answer: "20" },
                    { type: "input", question: "2 + 2 = ?", answer: "4" },
                    { type: "input", question: "1 + 1 = ?", answer: "2" }
                ]
            },
            {
                id: 6,
                title: "Les moitiés",
                description: "Trouver les moitiés",
                exercises: [
                    { type: "input", question: "La moitié de 6 = ?", answer: "3" },
                    { type: "input", question: "La moitié de 10 = ?", answer: "5" },
                    { type: "input", question: "La moitié de 8 = ?", answer: "4" },
                    { type: "input", question: "La moitié de 4 = ?", answer: "2" },
                    { type: "input", question: "La moitié de 12 = ?", answer: "6" },
                    { type: "input", question: "La moitié de 14 = ?", answer: "7" },
                    { type: "input", question: "La moitié de 16 = ?", answer: "8" },
                    { type: "input", question: "La moitié de 18 = ?", answer: "9" },
                    { type: "input", question: "La moitié de 20 = ?", answer: "10" },
                    { type: "input", question: "La moitié de 2 = ?", answer: "1" }
                ]
            },
            {
                id: 7,
                title: "Calculs mélangés",
                description: "Additions et soustractions",
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
                id: 8,
                title: "Champion du calcul",
                description: "Test final chronométré",
                exercises: [
                    { type: "input", question: "7 + 8 = ?", answer: "15" },
                    { type: "input", question: "15 - 7 = ?", answer: "8" },
                    { type: "input", question: "9 + 6 = ?", answer: "15" },
                    { type: "input", question: "14 - 5 = ?", answer: "9" },
                    { type: "input", question: "Double de 7 = ?", answer: "14" },
                    { type: "input", question: "Moitié de 12 = ?", answer: "6" },
                    { type: "input", question: "36 + 10 = ?", answer: "46" },
                    { type: "input", question: "52 - 10 = ?", answer: "42" },
                    { type: "input", question: "6 + ? = 10", answer: "4" },
                    { type: "input", question: "45 + 23 = ?", answer: "68" }
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
                id: 1,
                title: "Les nombres jusqu'à 99",
                description: "Dizaines et unités",
                exercises: [
                    { type: "input", question: "Dans 45, combien y a-t-il de dizaines ?", answer: "4" },
                    { type: "input", question: "Dans 72, combien y a-t-il d'unités ?", answer: "2" },
                    { type: "input", question: "3 dizaines et 7 unités = ?", answer: "37" },
                    { type: "input", question: "Dans 89, combien y a-t-il de dizaines ?", answer: "8" },
                    { type: "input", question: "5 dizaines et 1 unité = ?", answer: "51" },
                    { type: "input", question: "Quel nombre vient après 49 ?", answer: "50" },
                    { type: "input", question: "Quel nombre vient avant 60 ?", answer: "59" },
                    { type: "input", question: "8 dizaines = ?", answer: "80" },
                    { type: "input", question: "Dans 94, le chiffre des unités est ?", answer: "4" },
                    { type: "input", question: "6 dizaines et 0 unités = ?", answer: "60" }
                ]
            },
            {
                id: 2,
                title: "Comparer les nombres",
                description: "Plus grand, plus petit, égal",
                exercises: [
                    { type: "qcm", question: "45 ... 54", options: ["<", ">", "="], answer: "<" },
                    { type: "qcm", question: "72 ... 27", options: ["<", ">", "="], answer: ">" },
                    { type: "qcm", question: "35 ... 35", options: ["<", ">", "="], answer: "=" },
                    { type: "qcm", question: "68 ... 86", options: ["<", ">", "="], answer: "<" },
                    { type: "qcm", question: "91 ... 19", options: ["<", ">", "="], answer: ">" },
                    { type: "input", question: "Range du plus petit au plus grand : 45, 23, 67. Le plus petit est ?", answer: "23" },
                    { type: "input", question: "Range du plus grand au plus petit : 89, 34, 56. Le plus grand est ?", answer: "89" },
                    { type: "qcm", question: "50 ... 49", options: ["<", ">", "="], answer: ">" },
                    { type: "qcm", question: "77 ... 78", options: ["<", ">", "="], answer: "<" },
                    { type: "input", question: "Quel est le plus grand nombre à 2 chiffres ?", answer: "99" }
                ]
            },
            {
                id: 3,
                title: "Addition posée sans retenue",
                description: "Poser et calculer",
                exercises: [
                    { type: "input", question: "23 + 45 = ?", answer: "68" },
                    { type: "input", question: "31 + 26 = ?", answer: "57" },
                    { type: "input", question: "42 + 35 = ?", answer: "77" },
                    { type: "input", question: "54 + 23 = ?", answer: "77" },
                    { type: "input", question: "61 + 17 = ?", answer: "78" },
                    { type: "input", question: "12 + 45 = ?", answer: "57" },
                    { type: "input", question: "33 + 44 = ?", answer: "77" },
                    { type: "input", question: "21 + 56 = ?", answer: "77" },
                    { type: "input", question: "40 + 38 = ?", answer: "78" },
                    { type: "input", question: "15 + 63 = ?", answer: "78" }
                ]
            },
            {
                id: 4,
                title: "Addition posée avec retenue",
                description: "Gérer les retenues",
                exercises: [
                    { type: "input", question: "28 + 35 = ?", answer: "63" },
                    { type: "input", question: "47 + 26 = ?", answer: "73" },
                    { type: "input", question: "39 + 43 = ?", answer: "82" },
                    { type: "input", question: "56 + 27 = ?", answer: "83" },
                    { type: "input", question: "68 + 24 = ?", answer: "92" },
                    { type: "input", question: "45 + 38 = ?", answer: "83" },
                    { type: "input", question: "59 + 33 = ?", answer: "92" },
                    { type: "input", question: "76 + 18 = ?", answer: "94" },
                    { type: "input", question: "84 + 9 = ?", answer: "93" },
                    { type: "input", question: "67 + 25 = ?", answer: "92" }
                ]
            },
            {
                id: 5,
                title: "Soustraction posée",
                description: "Soustraire les nombres",
                exercises: [
                    { type: "input", question: "68 - 35 = ?", answer: "33" },
                    { type: "input", question: "57 - 24 = ?", answer: "33" },
                    { type: "input", question: "89 - 43 = ?", answer: "46" },
                    { type: "input", question: "76 - 52 = ?", answer: "24" },
                    { type: "input", question: "95 - 61 = ?", answer: "34" },
                    { type: "input", question: "48 - 25 = ?", answer: "23" },
                    { type: "input", question: "67 - 34 = ?", answer: "33" },
                    { type: "input", question: "83 - 41 = ?", answer: "42" },
                    { type: "input", question: "99 - 56 = ?", answer: "43" },
                    { type: "input", question: "74 - 32 = ?", answer: "42" }
                ]
            },
            {
                id: 6,
                title: "La droite numérique",
                description: "Placer et trouver des nombres",
                exercises: [
                    { type: "input", question: "Quel nombre est au milieu entre 40 et 50 ?", answer: "45" },
                    { type: "input", question: "Quel nombre est au milieu entre 20 et 30 ?", answer: "25" },
                    { type: "input", question: "Quel nombre est juste après 35 ?", answer: "36" },
                    { type: "input", question: "Quel nombre est juste avant 70 ?", answer: "69" },
                    { type: "input", question: "Quel nombre est au milieu entre 0 et 10 ?", answer: "5" },
                    { type: "input", question: "Si tu comptes de 5 en 5, quel nombre vient après 45 ?", answer: "50" },
                    { type: "input", question: "Si tu comptes de 10 en 10, quel nombre vient après 30 ?", answer: "40" },
                    { type: "input", question: "Quel nombre est à 10 de 55 (en avançant) ?", answer: "65" },
                    { type: "input", question: "Quel nombre est au milieu entre 60 et 80 ?", answer: "70" },
                    { type: "input", question: "Quel nombre est à 5 de 43 (en reculant) ?", answer: "38" }
                ]
            },
            {
                id: 7,
                title: "Compter par sauts",
                description: "Sauts de 2, 5, 10",
                exercises: [
                    { type: "input", question: "2, 4, 6, 8, ? (sauts de 2)", answer: "10" },
                    { type: "input", question: "5, 10, 15, 20, ? (sauts de 5)", answer: "25" },
                    { type: "input", question: "10, 20, 30, 40, ? (sauts de 10)", answer: "50" },
                    { type: "input", question: "14, 16, 18, 20, ? (sauts de 2)", answer: "22" },
                    { type: "input", question: "25, 30, 35, 40, ? (sauts de 5)", answer: "45" },
                    { type: "input", question: "35, 45, 55, 65, ? (sauts de 10)", answer: "75" },
                    { type: "input", question: "22, 24, 26, ?, 30 (sauts de 2)", answer: "28" },
                    { type: "input", question: "40, 45, ?, 55, 60 (sauts de 5)", answer: "50" },
                    { type: "input", question: "50, ?, 70, 80, 90 (sauts de 10)", answer: "60" },
                    { type: "input", question: "3, 5, 7, 9, ? (sauts de 2)", answer: "11" }
                ]
            },
            {
                id: 8,
                title: "Pairs et impairs",
                description: "Reconnaître pairs et impairs",
                exercises: [
                    { type: "qcm", question: "12 est un nombre...", options: ["Pair", "Impair"], answer: "Pair" },
                    { type: "qcm", question: "25 est un nombre...", options: ["Pair", "Impair"], answer: "Impair" },
                    { type: "qcm", question: "48 est un nombre...", options: ["Pair", "Impair"], answer: "Pair" },
                    { type: "qcm", question: "73 est un nombre...", options: ["Pair", "Impair"], answer: "Impair" },
                    { type: "qcm", question: "90 est un nombre...", options: ["Pair", "Impair"], answer: "Pair" },
                    { type: "input", question: "Le plus petit nombre pair à 2 chiffres est ?", answer: "10" },
                    { type: "input", question: "Le plus petit nombre impair à 2 chiffres est ?", answer: "11" },
                    { type: "qcm", question: "0 est un nombre...", options: ["Pair", "Impair"], answer: "Pair" },
                    { type: "input", question: "Quel est le nombre pair juste après 37 ?", answer: "38" },
                    { type: "input", question: "Quel est le nombre impair juste avant 50 ?", answer: "49" }
                ]
            },
            {
                id: 9,
                title: "Introduction à la multiplication",
                description: "Comprendre la multiplication",
                exercises: [
                    { type: "input", question: "3 + 3 + 3 = 3 × ? = ?", answer: "9" },
                    { type: "input", question: "2 + 2 + 2 + 2 = 2 × 4 = ?", answer: "8" },
                    { type: "input", question: "5 + 5 = 5 × 2 = ?", answer: "10" },
                    { type: "input", question: "4 + 4 + 4 = 4 × 3 = ?", answer: "12" },
                    { type: "input", question: "6 + 6 = 6 × 2 = ?", answer: "12" },
                    { type: "input", question: "2 × 5 = ?", answer: "10" },
                    { type: "input", question: "3 × 4 = ?", answer: "12" },
                    { type: "input", question: "5 × 3 = ?", answer: "15" },
                    { type: "input", question: "4 × 2 = ?", answer: "8" },
                    { type: "input", question: "10 × 2 = ?", answer: "20" }
                ]
            },
            {
                id: 10,
                title: "Les centaines",
                description: "Découvrir les nombres à 3 chiffres",
                exercises: [
                    { type: "input", question: "100 + 100 = ?", answer: "200" },
                    { type: "input", question: "Combien y a-t-il de centaines dans 300 ?", answer: "3" },
                    { type: "input", question: "2 centaines + 3 dizaines + 5 unités = ?", answer: "235" },
                    { type: "input", question: "Dans 456, combien y a-t-il de centaines ?", answer: "4" },
                    { type: "input", question: "Dans 789, combien y a-t-il de dizaines ?", answer: "8" },
                    { type: "input", question: "5 centaines = ?", answer: "500" },
                    { type: "input", question: "100 + 50 + 7 = ?", answer: "157" },
                    { type: "input", question: "Quel nombre vient après 199 ?", answer: "200" },
                    { type: "input", question: "Quel nombre vient avant 300 ?", answer: "299" },
                    { type: "input", question: "4 centaines et 2 dizaines = ?", answer: "420" }
                ]
            },
            {
                id: 11,
                title: "Calculer rapidement",
                description: "Astuces de calcul",
                exercises: [
                    { type: "input", question: "9 + 5 = 10 + ?", answer: "4" },
                    { type: "input", question: "8 + 7 = 10 + ?", answer: "5" },
                    { type: "input", question: "47 + 9 = 47 + 10 - 1 = ?", answer: "56" },
                    { type: "input", question: "35 + 19 = 35 + 20 - 1 = ?", answer: "54" },
                    { type: "input", question: "28 + 32 = 30 + 30 = ?", answer: "60" },
                    { type: "input", question: "15 + 15 + 15 = 3 × 15 = ?", answer: "45" },
                    { type: "input", question: "25 + 25 + 25 + 25 = 4 × 25 = ?", answer: "100" },
                    { type: "input", question: "99 + 1 = ?", answer: "100" },
                    { type: "input", question: "50 + 50 = ?", answer: "100" },
                    { type: "input", question: "67 + 33 = ?", answer: "100" }
                ]
            },
            {
                id: 12,
                title: "Révision Nombres et Calculs",
                description: "Tous les thèmes",
                exercises: [
                    { type: "input", question: "Dans 83, combien de dizaines ?", answer: "8" },
                    { type: "qcm", question: "56 ... 65", options: ["<", ">", "="], answer: "<" },
                    { type: "input", question: "47 + 28 = ?", answer: "75" },
                    { type: "input", question: "85 - 32 = ?", answer: "53" },
                    { type: "input", question: "20, 30, 40, ? (sauts de 10)", answer: "50" },
                    { type: "qcm", question: "64 est un nombre...", options: ["Pair", "Impair"], answer: "Pair" },
                    { type: "input", question: "5 × 4 = ?", answer: "20" },
                    { type: "input", question: "3 centaines + 4 unités = ?", answer: "304" },
                    { type: "input", question: "Double de 35 = ?", answer: "70" },
                    { type: "input", question: "Moitié de 48 = ?", answer: "24" }
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
                id: 1,
                title: "Problèmes d'addition",
                description: "Résoudre avec des additions",
                exercises: [
                    { type: "input", question: "Lucas a 12 billes. Son ami lui en donne 8. Combien a-t-il de billes maintenant ?", answer: "20" },
                    { type: "input", question: "Dans un panier, il y a 15 pommes et 7 poires. Combien de fruits y a-t-il en tout ?", answer: "22" },
                    { type: "input", question: "Léa lit 23 pages lundi et 18 pages mardi. Combien de pages a-t-elle lu ?", answer: "41" },
                    { type: "input", question: "Un bus transporte 25 passagers. À l'arrêt, 12 personnes montent. Combien de passagers y a-t-il ?", answer: "37" },
                    { type: "input", question: "Tom a 34 images. Sa sœur lui en offre 15. Combien en a-t-il ?", answer: "49" }
                ]
            },
            {
                id: 2,
                title: "Problèmes de soustraction",
                description: "Résoudre avec des soustractions",
                exercises: [
                    { type: "input", question: "Marie a 25 bonbons. Elle en mange 8. Combien lui en reste-t-il ?", answer: "17" },
                    { type: "input", question: "Un libraire a 42 livres. Il en vend 15. Combien lui en reste-t-il ?", answer: "27" },
                    { type: "input", question: "Dans un train, il y a 56 voyageurs. 23 descendent à la gare. Combien en reste-t-il ?", answer: "33" },
                    { type: "input", question: "Paul avait 38 euros. Il dépense 12 euros. Combien lui reste-t-il ?", answer: "26" },
                    { type: "input", question: "Un fermier a 67 œufs. 25 sont cassés. Combien d'œufs peut-il vendre ?", answer: "42" }
                ]
            },
            {
                id: 3,
                title: "Problèmes de comparaison",
                description: "Comparer des quantités",
                exercises: [
                    { type: "input", question: "Emma a 28 billes et Léo a 19 billes. Combien Emma a-t-elle de billes de plus ?", answer: "9" },
                    { type: "input", question: "Un livre coûte 15 euros et un cahier 8 euros. Quelle est la différence de prix ?", answer: "7" },
                    { type: "input", question: "L'équipe A marque 34 points, l'équipe B marque 27 points. Combien de points d'écart ?", answer: "7" },
                    { type: "input", question: "Julie a 45 images, son frère en a 32. Combien Julie en a-t-elle de plus ?", answer: "13" },
                    { type: "input", question: "Un arbre mesure 12 mètres, un autre 8 mètres. Quelle est la différence ?", answer: "4" }
                ]
            },
            {
                id: 4,
                title: "Problèmes d'argent",
                description: "Calculer avec l'argent",
                exercises: [
                    { type: "input", question: "Un crayon coûte 2 euros. J'en achète 3. Combien dois-je payer ?", answer: "6" },
                    { type: "input", question: "J'ai 10 euros. J'achète un livre à 7 euros. Combien me reste-t-il ?", answer: "3" },
                    { type: "input", question: "Une glace coûte 3 euros. Paul en achète 4. Combien doit-il payer ?", answer: "12" },
                    { type: "input", question: "Maman a 50 euros. Elle achète un jouet à 23 euros. Combien lui reste-t-il ?", answer: "27" },
                    { type: "input", question: "Un stylo coûte 5 euros et une gomme 2 euros. Quel est le prix total ?", answer: "7" }
                ]
            },
            {
                id: 5,
                title: "Problèmes de temps",
                description: "Calculer avec le temps",
                exercises: [
                    { type: "input", question: "Le film commence à 14h et dure 2 heures. À quelle heure finit-il ? (nombre seulement)", answer: "16" },
                    { type: "input", question: "Léa part à 8h et arrive à 10h. Combien de temps a duré son trajet ?", answer: "2" },
                    { type: "input", question: "La récréation dure 15 minutes. Le matin et l'après-midi. Combien de minutes au total ?", answer: "30" },
                    { type: "input", question: "Le cours de sport dure 45 minutes. Il a commencé il y a 30 minutes. Combien de minutes reste-t-il ?", answer: "15" },
                    { type: "input", question: "Papa travaille 8 heures par jour. En 5 jours, combien d'heures travaille-t-il ?", answer: "40" }
                ]
            },
            {
                id: 6,
                title: "Problèmes de partage",
                description: "Partager équitablement",
                exercises: [
                    { type: "input", question: "12 bonbons sont partagés entre 2 enfants. Combien chacun en reçoit-il ?", answer: "6" },
                    { type: "input", question: "20 billes sont partagées entre 4 amis. Combien chacun en a-t-il ?", answer: "5" },
                    { type: "input", question: "Une pizza est coupée en 8 parts. Il y a 2 pizzas. Combien de parts au total ?", answer: "16" },
                    { type: "input", question: "15 crayons sont rangés dans 3 boîtes. Combien par boîte ?", answer: "5" },
                    { type: "input", question: "18 gâteaux sont partagés entre 6 personnes. Combien chacun en reçoit-il ?", answer: "3" }
                ]
            },
            {
                id: 7,
                title: "Problèmes avec 2 étapes",
                description: "Résoudre en plusieurs étapes",
                exercises: [
                    { type: "input", question: "Marie a 15 billes. Elle en gagne 8 puis en perd 5. Combien en a-t-elle ?", answer: "18" },
                    { type: "input", question: "Un magasin a 45 jouets. Il en vend 20 puis reçoit 15 nouveaux. Combien en a-t-il ?", answer: "40" },
                    { type: "input", question: "Léo a 30 euros. Il dépense 12 euros puis reçoit 8 euros. Combien a-t-il ?", answer: "26" },
                    { type: "input", question: "Il y a 28 oiseaux sur un arbre. 10 s'envolent et 7 arrivent. Combien y en a-t-il ?", answer: "25" },
                    { type: "input", question: "Emma lit 15 pages le matin, 20 l'après-midi et 10 le soir. Combien de pages ?", answer: "45" }
                ]
            },
            {
                id: 8,
                title: "Problèmes de mesures",
                description: "Avec cm, m, kg, L",
                exercises: [
                    { type: "input", question: "Une règle mesure 30 cm. J'en mets 2 bout à bout. Quelle longueur ?", answer: "60" },
                    { type: "input", question: "Un paquet pèse 500 g. J'en ai 2. Quel poids total en grammes ?", answer: "1000" },
                    { type: "input", question: "Une bouteille contient 1 litre. J'en verse 300 mL. Combien reste-t-il en mL ?", answer: "700" },
                    { type: "input", question: "Un ruban mesure 50 cm. On en coupe 15 cm. Combien reste-t-il ?", answer: "35" },
                    { type: "input", question: "Un sac de 2 kg de pommes. J'en prends 500 g. Combien reste-t-il en grammes ?", answer: "1500" }
                ]
            },
            {
                id: 9,
                title: "Problèmes de groupes",
                description: "Compter par groupes",
                exercises: [
                    { type: "input", question: "3 boîtes contiennent chacune 5 crayons. Combien de crayons au total ?", answer: "15" },
                    { type: "input", question: "4 tables avec 6 élèves chacune. Combien d'élèves au total ?", answer: "24" },
                    { type: "input", question: "5 sacs de 10 billes chacun. Combien de billes en tout ?", answer: "50" },
                    { type: "input", question: "2 équipes de 8 joueurs. Combien de joueurs au total ?", answer: "16" },
                    { type: "input", question: "6 rangées de 4 chaises. Combien de chaises en tout ?", answer: "24" }
                ]
            },
            {
                id: 10,
                title: "Problèmes du quotidien",
                description: "Situations de la vie réelle",
                exercises: [
                    { type: "input", question: "Rayan a 7 ans. Son papa a 35 ans. Quelle est la différence d'âge ?", answer: "28" },
                    { type: "input", question: "Il y a 28 élèves dans la classe. 15 sont des filles. Combien de garçons ?", answer: "13" },
                    { type: "input", question: "Un bus peut transporter 50 personnes. Il y en a déjà 32. Combien de places libres ?", answer: "18" },
                    { type: "input", question: "La bibliothèque a 120 livres. Elle en achète 25 nouveaux. Combien en a-t-elle ?", answer: "145" },
                    { type: "input", question: "Maman cuisine 24 crêpes. On en mange 16. Combien en reste-t-il ?", answer: "8" }
                ]
            },
            {
                id: 11,
                title: "Problèmes géométriques",
                description: "Périmètres et formes",
                exercises: [
                    { type: "input", question: "Un carré a des côtés de 5 cm. Quel est son périmètre ?", answer: "20" },
                    { type: "input", question: "Un rectangle a une longueur de 8 cm et une largeur de 4 cm. Quel est son périmètre ?", answer: "24" },
                    { type: "input", question: "Un triangle a des côtés de 3 cm, 4 cm et 5 cm. Quel est son périmètre ?", answer: "12" },
                    { type: "input", question: "Un carré a un périmètre de 28 cm. Combien mesure un côté ?", answer: "7" },
                    { type: "input", question: "Un rectangle a un périmètre de 20 cm. Sa longueur est 6 cm. Quelle est sa largeur ?", answer: "4" }
                ]
            },
            {
                id: 12,
                title: "Problèmes à choix",
                description: "Choisir la bonne opération",
                exercises: [
                    { type: "qcm", question: "Pour trouver combien il reste, je fais...", options: ["Une addition", "Une soustraction"], answer: "Une soustraction" },
                    { type: "qcm", question: "Pour trouver le total, je fais...", options: ["Une addition", "Une soustraction"], answer: "Une addition" },
                    { type: "qcm", question: "Pour trouver la différence, je fais...", options: ["Une addition", "Une soustraction"], answer: "Une soustraction" },
                    { type: "qcm", question: "Pour réunir deux quantités, je fais...", options: ["Une addition", "Une soustraction"], answer: "Une addition" },
                    { type: "input", question: "J'ai 45 billes. J'en donne 18. Combien en ai-je ? (calcule)", answer: "27" }
                ]
            },
            {
                id: 13,
                title: "Problèmes illustrés",
                description: "Comprendre les énoncés",
                exercises: [
                    { type: "input", question: "🍎🍎🍎🍎🍎 + 🍎🍎🍎 = combien de pommes ?", answer: "8" },
                    { type: "input", question: "🌟🌟🌟🌟🌟🌟🌟🌟 - 🌟🌟🌟 = combien d'étoiles restent ?", answer: "5" },
                    { type: "input", question: "🐱🐱🐱 pattes par chat × 4 pattes = combien de pattes ?", answer: "12" },
                    { type: "input", question: "🎈🎈🎈🎈🎈🎈 ballons partagés entre 2 enfants = combien chacun ?", answer: "3" },
                    { type: "input", question: "🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪 cookies. J'en mange 4. Il en reste ?", answer: "6" }
                ]
            },
            {
                id: 14,
                title: "Problèmes de logique",
                description: "Réfléchir avant de calculer",
                exercises: [
                    { type: "input", question: "Je pense à un nombre. J'ajoute 5 et j'obtiens 12. Quel est ce nombre ?", answer: "7" },
                    { type: "input", question: "Je pense à un nombre. Je retire 8 et j'obtiens 15. Quel est ce nombre ?", answer: "23" },
                    { type: "input", question: "Le double d'un nombre est 18. Quel est ce nombre ?", answer: "9" },
                    { type: "input", question: "La moitié d'un nombre est 7. Quel est ce nombre ?", answer: "14" },
                    { type: "input", question: "Un nombre + 10 = 35. Quel est ce nombre ?", answer: "25" }
                ]
            },
            {
                id: 15,
                title: "Problèmes challenge",
                description: "Pour les champions",
                exercises: [
                    { type: "input", question: "Lucas a le double de l'âge de sa sœur. Sa sœur a 6 ans. Quel âge a Lucas ?", answer: "12" },
                    { type: "input", question: "3 pommes coûtent 6 euros. Combien coûte 1 pomme ?", answer: "2" },
                    { type: "input", question: "4 stylos coûtent 12 euros. Combien coûtent 2 stylos ?", answer: "6" },
                    { type: "input", question: "Un livre et un cahier coûtent 15 euros. Le livre coûte 10 euros. Combien coûte le cahier ?", answer: "5" },
                    { type: "input", question: "Marie a 3 fois plus de billes que Tom. Tom a 8 billes. Combien Marie en a-t-elle ?", answer: "24" }
                ]
            },
            {
                id: 16,
                title: "Révision Problèmes",
                description: "Tous les types",
                exercises: [
                    { type: "input", question: "35 + 28 = ?", answer: "63" },
                    { type: "input", question: "72 - 45 = ?", answer: "27" },
                    { type: "input", question: "Un carré de 6 cm de côté. Son périmètre = ?", answer: "24" },
                    { type: "input", question: "15 euros - 8 euros = ? euros restants", answer: "7" },
                    { type: "input", question: "3 × 7 = ?", answer: "21" }
                ]
            }
        ]
    },

    grandeurs_mesures: {
        name: "Grandeurs et Mesures",
        icon: "📏",
        color: "#1abc9c",
        fiches: [
            {
                id: 1,
                title: "Les longueurs",
                description: "cm et m",
                exercises: [
                    { type: "input", question: "1 mètre = combien de centimètres ?", answer: "100" },
                    { type: "qcm", question: "Une règle mesure généralement...", options: ["30 cm", "30 m", "3 m", "300 cm"], answer: "30 cm" },
                    { type: "qcm", question: "La hauteur d'une porte est environ...", options: ["2 cm", "2 m", "20 cm", "200 m"], answer: "2 m" },
                    { type: "input", question: "50 cm + 50 cm = ? cm", answer: "100" },
                    { type: "input", question: "1 m - 30 cm = ? cm", answer: "70" },
                    { type: "qcm", question: "Un stylo mesure environ...", options: ["15 cm", "15 m", "150 cm", "1 m"], answer: "15 cm" },
                    { type: "input", question: "2 m = ? cm", answer: "200" },
                    { type: "qcm", question: "La longueur d'une voiture est environ...", options: ["4 cm", "40 cm", "4 m", "40 m"], answer: "4 m" }
                ]
            },
            {
                id: 2,
                title: "Lire l'heure",
                description: "Heures et demi-heures",
                exercises: [
                    { type: "qcm", question: "La grande aiguille indique...", options: ["Les heures", "Les minutes", "Les secondes"], answer: "Les minutes" },
                    { type: "qcm", question: "La petite aiguille indique...", options: ["Les heures", "Les minutes", "Les secondes"], answer: "Les heures" },
                    { type: "input", question: "1 heure = combien de minutes ?", answer: "60" },
                    { type: "input", question: "Une demi-heure = combien de minutes ?", answer: "30" },
                    { type: "input", question: "2 heures = combien de minutes ?", answer: "120" },
                    { type: "qcm", question: "Quand il est midi et demi, la grande aiguille est sur le...", options: ["12", "6", "3", "9"], answer: "6" },
                    { type: "input", question: "Il est 14h. Dans 2 heures il sera ? h", answer: "16" },
                    { type: "input", question: "Il est 10h30. Il y a 1 heure il était ? h ? min", answer: "9" }
                ]
            },
            {
                id: 3,
                title: "La monnaie",
                description: "Euros et centimes",
                exercises: [
                    { type: "input", question: "1 euro = combien de centimes ?", answer: "100" },
                    { type: "input", question: "50 centimes + 50 centimes = ? euro(s)", answer: "1" },
                    { type: "input", question: "2 euros et 50 centimes = ? centimes", answer: "250" },
                    { type: "input", question: "5 euros - 2 euros = ? euros", answer: "3" },
                    { type: "input", question: "3 pièces de 2 euros = ? euros", answer: "6" },
                    { type: "input", question: "10 euros - 75 centimes = ? euros et ? centimes (en centimes)", answer: "925" },
                    { type: "qcm", question: "Le plus gros billet courant est...", options: ["5 €", "10 €", "20 €", "50 €"], answer: "50 €" },
                    { type: "input", question: "2 billets de 10 euros + 5 euros = ? euros", answer: "25" }
                ]
            },
            {
                id: 4,
                title: "Les masses",
                description: "g et kg",
                exercises: [
                    { type: "input", question: "1 kg = combien de grammes ?", answer: "1000" },
                    { type: "qcm", question: "Une pomme pèse environ...", options: ["150 g", "150 kg", "15 g", "1 kg"], answer: "150 g" },
                    { type: "qcm", question: "Un sac de sucre pèse généralement...", options: ["1 g", "1 kg", "100 g", "10 kg"], answer: "1 kg" },
                    { type: "input", question: "500 g + 500 g = ? kg", answer: "1" },
                    { type: "input", question: "2 kg = ? g", answer: "2000" },
                    { type: "qcm", question: "Un enfant de 7 ans pèse environ...", options: ["25 kg", "25 g", "250 kg", "250 g"], answer: "25 kg" },
                    { type: "input", question: "1 kg - 200 g = ? g", answer: "800" },
                    { type: "input", question: "3 sacs de 500 g = ? g", answer: "1500" }
                ]
            },
            {
                id: 5,
                title: "Les contenances",
                description: "L et cL",
                exercises: [
                    { type: "input", question: "1 litre = combien de centilitres ?", answer: "100" },
                    { type: "qcm", question: "Une bouteille d'eau contient souvent...", options: ["1 L", "1 cL", "100 L", "10 L"], answer: "1 L" },
                    { type: "qcm", question: "Un verre d'eau contient environ...", options: ["20 L", "20 cL", "200 L", "2 L"], answer: "20 cL" },
                    { type: "input", question: "50 cL + 50 cL = ? L", answer: "1" },
                    { type: "input", question: "2 L = ? cL", answer: "200" },
                    { type: "input", question: "1 L - 30 cL = ? cL", answer: "70" },
                    { type: "qcm", question: "Une baignoire contient environ...", options: ["150 cL", "15 L", "150 L", "1500 L"], answer: "150 L" },
                    { type: "input", question: "3 bouteilles de 50 cL = ? cL", answer: "150" }
                ]
            },
            {
                id: 6,
                title: "Le calendrier",
                description: "Jours, semaines, mois",
                exercises: [
                    { type: "input", question: "Une semaine = combien de jours ?", answer: "7" },
                    { type: "input", question: "Une année = combien de mois ?", answer: "12" },
                    { type: "qcm", question: "Quel mois vient après avril ?", options: ["Mars", "Mai", "Juin", "Février"], answer: "Mai" },
                    { type: "qcm", question: "Combien de jours en février (année normale) ?", options: ["28", "29", "30", "31"], answer: "28" },
                    { type: "input", question: "2 semaines = combien de jours ?", answer: "14" },
                    { type: "qcm", question: "Quel est le premier mois de l'année ?", options: ["Décembre", "Janvier", "Mars", "Septembre"], answer: "Janvier" },
                    { type: "input", question: "Une année = combien de jours (environ) ?", answer: "365" },
                    { type: "qcm", question: "Quel jour vient après mercredi ?", options: ["Mardi", "Jeudi", "Vendredi", "Lundi"], answer: "Jeudi" }
                ]
            },
            {
                id: 7,
                title: "Les durées",
                description: "Calculer des durées",
                exercises: [
                    { type: "input", question: "1 heure = combien de minutes ?", answer: "60" },
                    { type: "input", question: "1 minute = combien de secondes ?", answer: "60" },
                    { type: "input", question: "2 heures 30 minutes = combien de minutes ?", answer: "150" },
                    { type: "input", question: "90 minutes = ? heure(s) et ? minutes = combien d'heures ?", answer: "1" },
                    { type: "input", question: "Il est 9h. Le cours finit à 11h. Quelle est la durée en heures ?", answer: "2" },
                    { type: "input", question: "Un film de 1h30 commence à 14h. À quelle heure finit-il ? (juste l'heure)", answer: "15" },
                    { type: "input", question: "1 jour = combien d'heures ?", answer: "24" },
                    { type: "input", question: "Midi moins le quart = ? heures ? minutes (juste les minutes)", answer: "45" }
                ]
            },
            {
                id: 8,
                title: "Les périmètres",
                description: "Calculer le tour",
                exercises: [
                    { type: "input", question: "Un carré de 4 cm de côté. Périmètre = ?", answer: "16" },
                    { type: "input", question: "Un rectangle de 6 cm sur 3 cm. Périmètre = ?", answer: "18" },
                    { type: "input", question: "Un triangle avec côtés de 5 cm, 4 cm et 3 cm. Périmètre = ?", answer: "12" },
                    { type: "input", question: "Un carré a un périmètre de 20 cm. Côté = ?", answer: "5" },
                    { type: "input", question: "Un rectangle de périmètre 24 cm et de longueur 8 cm. Largeur = ?", answer: "4" },
                    { type: "input", question: "Un carré de 10 cm de côté. Périmètre = ?", answer: "40" },
                    { type: "input", question: "Un rectangle de 7 cm sur 5 cm. Périmètre = ?", answer: "24" },
                    { type: "input", question: "Un carré de périmètre 36 cm. Côté = ?", answer: "9" }
                ]
            },
            {
                id: 9,
                title: "Problèmes de mesures",
                description: "Appliquer les mesures",
                exercises: [
                    { type: "input", question: "Une ficelle de 1 m. J'en coupe 45 cm. Il reste ? cm", answer: "55" },
                    { type: "input", question: "Une bouteille de 1 L. J'en verse 35 cL. Il reste ? cL", answer: "65" },
                    { type: "input", question: "Un paquet de 1 kg de riz. J'en utilise 350 g. Il reste ? g", answer: "650" },
                    { type: "input", question: "J'ai 10 euros. J'achète un jouet à 6,50 euros. Il me reste ? euros et ? centimes (en centimes)", answer: "350" },
                    { type: "input", question: "Un film commence à 14h et dure 1h45. Il finit à ? h ? min (juste l'heure)", answer: "15" }
                ]
            },
            {
                id: 10,
                title: "Révision Mesures",
                description: "Tous les thèmes",
                exercises: [
                    { type: "input", question: "2 m = ? cm", answer: "200" },
                    { type: "input", question: "1h30 = ? minutes", answer: "90" },
                    { type: "input", question: "1 kg 500 g = ? g", answer: "1500" },
                    { type: "input", question: "2 L = ? cL", answer: "200" },
                    { type: "input", question: "2 semaines = ? jours", answer: "14" },
                    { type: "input", question: "3 euros = ? centimes", answer: "300" },
                    { type: "input", question: "Périmètre d'un carré de 8 cm = ?", answer: "32" },
                    { type: "input", question: "Périmètre d'un rectangle 10 cm × 4 cm = ?", answer: "28" }
                ]
            }
        ]
    },

    tables: {
        name: "Tables de Multiplication",
        icon: "✖️",
        color: "#f39c12",
        fiches: [
            {
                id: 1,
                title: "Table de 1",
                description: "Multiplier par 1",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `1 × ${i + 1} = ?`,
                    answer: String(i + 1)
                }))
            },
            {
                id: 2,
                title: "Table de 2",
                description: "Multiplier par 2",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `2 × ${i + 1} = ?`,
                    answer: String(2 * (i + 1))
                }))
            },
            {
                id: 3,
                title: "Table de 3",
                description: "Multiplier par 3",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `3 × ${i + 1} = ?`,
                    answer: String(3 * (i + 1))
                }))
            },
            {
                id: 4,
                title: "Table de 4",
                description: "Multiplier par 4",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `4 × ${i + 1} = ?`,
                    answer: String(4 * (i + 1))
                }))
            },
            {
                id: 5,
                title: "Table de 5",
                description: "Multiplier par 5",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `5 × ${i + 1} = ?`,
                    answer: String(5 * (i + 1))
                }))
            },
            {
                id: 6,
                title: "Table de 6",
                description: "Multiplier par 6",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `6 × ${i + 1} = ?`,
                    answer: String(6 * (i + 1))
                }))
            },
            {
                id: 7,
                title: "Table de 7",
                description: "Multiplier par 7",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `7 × ${i + 1} = ?`,
                    answer: String(7 * (i + 1))
                }))
            },
            {
                id: 8,
                title: "Table de 8",
                description: "Multiplier par 8",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `8 × ${i + 1} = ?`,
                    answer: String(8 * (i + 1))
                }))
            },
            {
                id: 9,
                title: "Table de 9",
                description: "Multiplier par 9",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `9 × ${i + 1} = ?`,
                    answer: String(9 * (i + 1))
                }))
            },
            {
                id: 10,
                title: "Table de 10",
                description: "Multiplier par 10",
                exercises: Array.from({length: 10}, (_, i) => ({
                    type: "input",
                    question: `10 × ${i + 1} = ?`,
                    answer: String(10 * (i + 1))
                }))
            }
        ]
    }
};

// Subject icons mapping
const SUBJECT_ICONS = {
    dictee: "✏️",
    geometrie: "📐",
    calcul_mental: "🧮",
    nombres_calculs: "🔢",
    problemes: "🤔",
    grandeurs_mesures: "📏",
    tables: "✖️"
};
