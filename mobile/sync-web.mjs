// Copie les fichiers de l'application web dans mobile/www, qui sert de
// contenu embarqué à la coque native. On n'embarque que le nécessaire :
// pas de dossier api (il reste côté serveur), pas de node_modules.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, '..');
const target = path.resolve(here, 'www');

const FILES = [
    'index.html', 'styles.css', 'app.js', 'data.js', 'data-ce2.js',
    'manifest.json', 'icon.svg', 'icon-180.png', 'icon-192.png',
    'icon-512.png', 'icon-maskable-512.png'
];

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

let copied = 0;
for (const file of FILES) {
    const from = path.join(source, file);
    if (!fs.existsSync(from)) {
        console.warn(`  ! introuvable, ignoré : ${file}`);
        continue;
    }
    fs.copyFileSync(from, path.join(target, file));
    copied++;
}

// Le service worker n'a pas de sens dans la coque native (les fichiers sont
// déjà locaux) : on le retire de la page embarquée.
const indexPath = path.join(target, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace('<html lang="fr">', '<html lang="fr" data-native="1">');
fs.writeFileSync(indexPath, html);

console.log(`${copied} fichiers copiés dans mobile/www`);
