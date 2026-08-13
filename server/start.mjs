import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

import('./index.ts').then((mod) => {
  const app = mod.default;
  const PORT = process.env.PORT || 3001;
  
  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 Visitez http://localhost:${PORT}/api/init pour initialiser la BD`);
  });
}).catch((err) => {
  console.error('Erreur au démarrage du serveur:', err);
  process.exit(1);
});
