// API de sauvegarde des progrès - Champion Rayan
// GET  /api/progress?code=ABCDEF  -> renvoie la sauvegarde la plus récente
// POST /api/progress?code=ABCDEF  -> enregistre une nouvelle sauvegarde
//
// Les données sont stockées dans Vercel Blob sous un chemin dérivé du code
// (hash SHA-256 + sel serveur) : l'URL publique du fichier n'est donc pas
// devinable à partir du code de l'enfant.

import { list, put, del } from '@vercel/blob';
import { createHash } from 'node:crypto';

const SALT = process.env.PROGRESS_SALT || 'champion-rayan-2026-v1';
const KEEP_VERSIONS = 4;
const MAX_BODY_BYTES = 512 * 1024;

function prefixFor(code) {
    const clean = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length < 4 || clean.length > 24) return null;
    const hash = createHash('sha256').update(`${clean}|${SALT}`).digest('hex').slice(0, 32);
    return `p/${hash}/`;
}

async function newestBlob(prefix) {
    const { blobs } = await list({ prefix, limit: 100 });
    if (!blobs.length) return null;
    return blobs.slice().sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
}

async function prune(prefix) {
    try {
        const { blobs } = await list({ prefix, limit: 100 });
        const stale = blobs
            .slice()
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
            .slice(KEEP_VERSIONS);
        if (stale.length) await del(stale.map(b => b.url));
    } catch (err) {
        // Le ménage n'est jamais bloquant : la sauvegarde compte plus.
        console.error('prune failed', err);
    }
}

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    const prefix = prefixFor(req.query?.code);
    if (!prefix) {
        res.status(400).json({ ok: false, error: 'code_invalide' });
        return;
    }

    try {
        if (req.method === 'GET') {
            const blob = await newestBlob(prefix);
            if (!blob) {
                res.status(200).json({ ok: true, found: false });
                return;
            }
            const response = await fetch(blob.downloadUrl, { cache: 'no-store' });
            if (!response.ok) throw new Error(`blob fetch ${response.status}`);
            const progress = await response.json();
            res.status(200).json({ ok: true, found: true, progress });
            return;
        }

        if (req.method === 'POST') {
            const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            if (!payload || typeof payload !== 'object') {
                res.status(400).json({ ok: false, error: 'corps_invalide' });
                return;
            }

            const body = JSON.stringify(payload);
            if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
                res.status(413).json({ ok: false, error: 'trop_volumineux' });
                return;
            }

            const rev = Number.isFinite(payload.rev) ? payload.rev : 0;
            const name = `${String(rev).padStart(9, '0')}-${Date.now()}.json`;
            const blob = await put(prefix + name, body, {
                access: 'public',
                contentType: 'application/json',
                addRandomSuffix: true,
                cacheControlMaxAge: 0
            });

            await prune(prefix);
            res.status(200).json({ ok: true, rev, url: blob.url });
            return;
        }

        res.setHeader('Allow', 'GET, POST');
        res.status(405).json({ ok: false, error: 'methode_non_autorisee' });
    } catch (err) {
        console.error('progress handler failed', err);
        res.status(500).json({ ok: false, error: 'erreur_serveur' });
    }
}
