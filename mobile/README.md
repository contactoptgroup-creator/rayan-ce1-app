# Champion — version pour les stores (iOS et Android)

Ce dossier transforme l'application web en **vraie application native**, publiable sur
l'App Store et sur le Google Play Store. Le code de l'app reste unique : il vit dans
le dossier parent (app/), et `npm run sync` le recopie ici.

---

## Avant de commencer : est-ce vraiment nécessaire ?

L'application est **déjà installable** sur iPhone et sur Samsung, sans passer par les
stores, sans compte développeur et sans attendre de validation :

- **iPhone / iPad** — ouvrir https://app-pi-nine-34.vercel.app dans Safari, appuyer sur
  le bouton **Partager**, puis **« Sur l'écran d'accueil »**.
- **Android / Samsung** — ouvrir le même lien dans Chrome, puis **« Installer
  l'application »** (une bannière le propose, sinon c'est dans le menu ⋮).

Dans les deux cas, Rayan obtient une icône sur son écran d'accueil, une ouverture en
plein écran sans barre de navigateur, et l'application **fonctionne sans internet**.

Les stores n'apportent qu'une chose de plus : la présence dans le moteur de recherche
de l'App Store et de Google Play. Ils coûtent en revanche **99 $/an chez Apple** et
**25 $ une fois chez Google**, imposent un délai de validation, et Apple refuse
régulièrement les applications qui ne sont qu'un site web habillé (règle 4.2,
« minimum functionality »). Pour un usage familial, la version installable ci-dessus
est très largement suffisante.

Si tu veux quand même publier, la suite explique exactement comment.

---

## Ce qu'il faut installer

| Cible | Nécessaire |
|---|---|
| Android | [Android Studio](https://developer.android.com/studio) (inclut le SDK et le JDK) |
| iOS | Un **Mac** avec Xcode — Apple ne permet pas de compiler iOS depuis Windows |
| Les deux | Node.js (déjà installé sur cette machine) |

Comptes développeur : [Apple Developer](https://developer.apple.com/programs/) (99 $/an)
et [Google Play Console](https://play.google.com/console/signup) (25 $ une fois).
**Ces comptes doivent être créés par toi** : ils engagent ton identité et tes moyens de
paiement.

---

## Étapes

```bash
cd "RAYAN CE1/app/mobile"
npm install
npm run sync          # recopie l'app web dans www/ et synchronise Capacitor
```

### Android

```bash
npm run add:android
npm run sync
npm run open:android  # ouvre Android Studio
```

Dans Android Studio : **Build → Generate Signed Bundle / APK → Android App Bundle**.
Garde précieusement le fichier `.keystore` et son mot de passe : sans lui, tu ne
pourras plus jamais publier de mise à jour de cette application.

Le fichier `.aab` obtenu se téléverse dans la Play Console.

### iOS (sur un Mac)

```bash
npm run add:ios
npm run sync
npm run open:ios      # ouvre Xcode
```

Dans Xcode : sélectionner l'équipe de signature, puis **Product → Archive**, puis
**Distribute App → App Store Connect**.

---

## Après chaque modification de l'application

```bash
npm run sync
```

puis recompiler depuis Android Studio ou Xcode. Le contenu des exercices est embarqué
dans l'application : une nouvelle fiche demande donc une nouvelle version publiée.
Les **progrès de Rayan**, eux, continuent de passer par le serveur et se synchronisent
en direct, sans mise à jour (voir `API_BASE` dans `app.js`).

---

## Informations de publication

- **Identifiant** : `fr.taouo.champion`
- **Nom affiché** : Champion
- **Catégorie** : Éducation
- **Classification** : tout public / 4+
- **Confidentialité** : l'application ne collecte ni nom de famille, ni adresse, ni
  e-mail, ni donnée de localisation. Elle stocke uniquement une progression scolaire
  (points, badges, fiches terminées) associée à un code anonyme à six caractères.
  C'est ce qu'il faut déclarer dans le questionnaire de confidentialité des deux stores.
