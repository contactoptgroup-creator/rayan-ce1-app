# Rayan CE1 - Application d'apprentissage

Application web interactive pour l'apprentissage du programme CE1 (cours élémentaire 1ère année).

## Fonctionnalités

- **7 matières complètes** : Dictée Flash, Géométrie, Calcul Mental, Nombres et Calculs, Problèmes, Grandeurs et Mesures, Tables de Multiplication
- **68+ fiches d'exercices** avec plus de 500 exercices interactifs
- **Suivi des progrès** global et par matière
- **Système d'étoiles** et de streak pour la motivation
- **Synthèse vocale** pour les dictées
- **Génération de contenu** via OpenAI API
- **Mode hors-ligne** avec localStorage

## Utilisation

### En local

```bash
npx serve .
```

Puis ouvrir http://localhost:3000

### Déploiement sur Vercel

1. Connecter le repo à Vercel
2. L'application sera automatiquement déployée

## Structure des exercices

Chaque exercice peut être de type :
- `input` : réponse libre
- `qcm` : choix multiples
- `dictee` : dictée avec synthèse vocale

## Ajouter du contenu avec OpenAI

1. Aller dans Paramètres
2. Entrer votre clé API OpenAI
3. Sélectionner une matière et décrire le type d'exercice souhaité
4. Cliquer sur "Générer"
5. Ajouter les exercices générés à la matière

## Technologies

- HTML5 / CSS3 / JavaScript (Vanilla)
- Web Speech API pour la synthèse vocale
- Web Audio API pour les sons
- LocalStorage pour la persistance
- OpenAI API pour la génération de contenu

## Licence

MIT - Créé pour Rayan par Papa avec amour ❤️
