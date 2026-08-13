#!/usr/bin/env node

/**
 * Script de démarrage pour le développement complet (Frontend + Backend)
 * 
 * Utilisation: npm run dev:all
 * Ou directement: node scripts/dev.js
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

console.log('🚀 Démarrage du projet complet (Frontend + Backend)...\n');

// Démarrer le backend
console.log('📦 Lancement du serveur backend sur le port 3000...');
const backend = spawn('node', ['--loader', 'ts-node/esm', 'server/index.ts'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

// Démarrer le frontend
console.log('🎨 Lancement du frontend sur le port 8080...\n');
setTimeout(() => {
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (err) => {
    console.error('Erreur frontend:', err);
    backend.kill();
    process.exit(1);
  });
}, 2000);

// Gestion de l'arrêt
process.on('SIGINT', () => {
  console.log('\n\n🛑 Arrêt du projet...');
  backend.kill();
  process.exit(0);
});

backend.on('error', (err) => {
  console.error('Erreur backend:', err);
  process.exit(1);
});
