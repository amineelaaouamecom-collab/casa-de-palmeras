# 🆘 Guide de Dépannage

## ❌ Les serveurs ne démarrent pas

### Erreur: "Port 3000/8080 déjà utilisé"

**Solution 1: Tuer le processus**
```bash
# Windows - Trouver le processus utilisant le port
netstat -ano | findstr :3000
# Puis terminer le processus
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Solution 2: Changer le port**
- Modifier `.env`: `PORT=3001`
- Relancer: `npm run server`

---

## ❌ L'API ne répond pas

### Erreur: "Cannot GET /api/cars"

**Vérifier:**
1. Le serveur backend est-il lancé? 
   - Regardez le terminal du serveur pour "✅ Serveur démarré"
   
2. Est-ce le bon port?
   - Visitez: http://localhost:3000/
   - Doit afficher une réponse (même une erreur 404 c'est bon)

3. Vérifier les logs du serveur
   - Erreur de connexion SQLite?
   - Erreur d'import des modules?

**Solution:**
```bash
# Relancer le serveur avec plus de logs
npm run server

# Vérifier les erreurs dans le terminal
```

---

## ❌ Les voitures ne s'affichent pas

### La page "Nos Véhicules" est vide

**Cas 1: API non disponible (NORMAL)**
- Le frontend utilise les données statiques comme fallback
- Vérifiez la console du navigateur (F12 > Console)

**Cas 2: Erreur dans la console**

a) **CORS Error**
```
Access to XMLHttpRequest blocked by CORS
```
- Solution: Vérifier que le backend déclare CORS
- Vérifier: `server/index.ts` ligne avec `cors()`

b) **404 Not Found**
```
GET http://localhost:3000/api/cars 404
```
- Solution: Backend n'a pas les routes
- Vérifier: `server/routes/cars.ts` existe et est importé

c) **Connection refused**
```
Failed to fetch
```
- Solution: Backend n'est pas lancé
- Lancer: `npm run server`

**Solution complète:**
```bash
# 1. S'assurer que le backend est lancé
npm run server

# 2. Initialiser la BD
curl -X POST http://localhost:3000/api/init

# 3. Rafraîchir le frontend (F5)
```

---

## ❌ Erreur: "Cannot find module"

### Erreur: "Cannot find module 'express'"

**Cause:** Les dépendances ne sont pas installées

**Solution:**
```bash
npm install
npm run server
```

### Erreur: "Cannot find module '@/data/cars'"

**Cause:** Le chemin d'import est incorrect dans le backend

**Solution:** Le backend utilise un import relatif:
```typescript
import { cars } from '../src/data/cars.js'
```

Vérifier que le fichier existe: `src/data/cars.ts`

---

## ❌ La base de données ne s'initialise pas

### Erreur: "database is locked"

**Cause:** Plusieurs processus accèdent à la BD en même temps

**Solution:**
1. Terminer tous les serveurs
2. Supprimer le fichier `db/cars.db`
3. Relancer: `npm run server`

### Erreur: "no such table: cars"

**Cause:** La BD n'a pas été créée

**Solution:**
1. Vérifier que `db/database.sql` existe
2. Appeler: `http://localhost:3000/api/init`
3. Vérifier les logs du serveur

### Les données ne s'insèrent pas

**Vérifier:**
```bash
# 1. Base créée?
ls -la db/cars.db

# 2. Appeler init?
curl -X POST http://localhost:3000/api/init

# 3. Vérifier la réponse
```

---

## ❌ Erreurs dans l'Admin

### Le formulaire admin ne soumet rien

**Cause 1:** L'API n'est pas accessible

**Cause 2:** Erreur de validation du formulaire

**Solution:**
```javascript
// Ouvrir la console du navigateur (F12)
// Chercher les messages d'erreur
// Vérifier que le backend répond:
fetch('http://localhost:3000/api/cars')
```

### Les modifications ne s'enregistrent pas

**Vérifier:**
1. Pas d'erreur dans la console?
2. La réponse du serveur est OK (200)?
3. Rafraîchir la page pour recharger?

**Debug:**
```javascript
// Dans la console du navigateur
fetch('http://localhost:3000/api/cars')
  .then(r => r.json())
  .then(console.log)
```

---

## ❌ Problèmes de TypeScript

### Erreur: "Cannot find name 'Car'"

**Cause:** Les interfaces TypeScript ne sont pas importées

**Solution:** Ajouter l'import:
```typescript
interface Car {
  id: string;
  name: string;
  // ...
}
```

---

## 🧪 Tests de diagnostic

### Test 1: Backend fonctionne?
```bash
curl http://localhost:3000/
# Doit retourner une réponse (même une erreur)
```

### Test 2: API fonctionne?
```bash
curl http://localhost:3000/api/categories
# Doit retourner un JSON avec les catégories
```

### Test 3: BD initialisée?
```bash
curl -X POST http://localhost:3000/api/init
# Doit retourner "Base de données initialisée"
```

### Test 4: Frontend charge?
```bash
# Ouvrir: http://localhost:8080
# Doit charger l'app React
```

### Test 5: Admin accessible?
```bash
# Ouvrir: http://localhost:8080/admin
# Doit afficher le tableau de bord
```

---

## 📋 Checklist de dépannage

- [ ] Node.js et npm installés?
- [ ] `npm install` exécuté?
- [ ] Ports 3000 et 8080 libres?
- [ ] Deux terminaux ouverts (un par serveur)?
- [ ] Backend lancé avec `npm run server`?
- [ ] Frontend lancé avec `npm run dev`?
- [ ] BD initialisée via `/api/init`?
- [ ] Console navigateur sans erreurs CORS?
- [ ] Fichiers TypeScript sans erreurs de syntaxe?

---

## 🔍 Logs utiles à vérifier

### Terminal backend
```
✅ Connecté à la base de données SQLite
✅ Base de données initialisée avec succès
✅ Serveur démarré sur http://localhost:3000
```

### Terminal frontend
```
✅ Vite v... ready in ... ms
✅ Local:   http://localhost:8080/
```

### Console navigateur (F12)
```
Doit être propre (pas de CORS error)
Doit voir les requêtes fetch vers /api/
```

---

## 📞 Besoin d'aide?

1. Vérifier la **console du navigateur** (F12)
2. Vérifier les **logs du serveur**
3. Vérifier la **console de cmd/terminal**
4. Lire le fichier **ADMIN_README.md**
5. Vérifier le **FILE_STRUCTURE.md**

---

## 🚀 Reset complet (nucléaire option)

Si rien ne fonctionne:

```bash
# 1. Terminer tous les serveurs (Ctrl+C partout)

# 2. Nettoyer
rm -rf node_modules
rm db/cars.db
rm package-lock.json  # ou bun.lockb

# 3. Réinstaller
npm install

# 4. Relancer
npm run server
# (Dans un autre terminal)
npm run dev

# 5. Initialiser
curl -X POST http://localhost:3000/api/init
```

**Normalement, ça marche après ça! 🎉**

---

**Dernière ressource:** Vérifier les chemins absolus et les imports ES6 dans les fichiers TypeScript du serveur.
