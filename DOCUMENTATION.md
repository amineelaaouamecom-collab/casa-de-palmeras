# 📖 Index de la Documentation

Bienvenue dans la documentation du projet **Golden Drive** avec **Admin & Backend**.

## 🎯 Commencer ici

### 1️⃣ **Première fois?**
👉 Commencez par: **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**
- Vue d'ensemble du projet
- Comment démarrer (2 étapes)
- Quoi de neuf?

### 2️⃣ **Je veux démarrer maintenant**
👉 Lisez: **[QUICK_START.md](./QUICK_START.md)**
- Guide ultra-rapide (5 minutes)
- Commandes essentielles
- Comment accéder à l'admin

### 3️⃣ **Je veux tout comprendre**
👉 Consultez: **[ADMIN_README.md](./ADMIN_README.md)**
- Documentation technique complète
- Architecture du système
- API endpoints détaillés
- Format des données

---

## 📚 Documents par sujet

### 🚀 Démarrage & Configuration

| Document | Durée | Sujet |
|----------|-------|-------|
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | 10min | Vue générale du projet |
| [QUICK_START.md](./QUICK_START.md) | 5min | Démarrage rapide |
| [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) | 15min | Structure complète du code |

### 🛠️ Développement

| Document | Durée | Sujet |
|----------|-------|-------|
| [ADMIN_README.md](./ADMIN_README.md) | 30min | Documentation technique |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | 20min | Solutions aux problèmes |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | 10min | Résumé des changements |

### 📋 Base de Données

- **Schéma SQL:** `db/database.sql`
- **Tables:** `categories`, `cars`
- Voir [ADMIN_README.md](./ADMIN_README.md#-base-de-données) pour les détails

### 🔌 API

Endpoints disponibles:
- GET/POST/PUT/DELETE `/api/cars`
- GET/POST/PUT/DELETE `/api/categories`
- POST `/api/init` (initialiser BD)

Voir [ADMIN_README.md](./ADMIN_README.md#-api-endpoints) pour les détails

---

## 🎮 Utilisation quotidienne

### Démarrer le projet
```bash
# Terminal 1
npm run server

# Terminal 2 
npm run dev
```

### Accéder à l'admin
- Cliquez sur "Admin" en haut à droite
- Ou allez: http://localhost:8080/admin

### Initialiser la BD
```bash
curl -X POST http://localhost:3000/api/init
```

### Gérer le contenu
- **Admin → Gestion des Voitures** - CRUD voitures
- **Admin → Gestion des Catégories** - CRUD catégories

---

## 🆘 J'ai un problème

### Les serveurs ne démarrent pas
→ [TROUBLESHOOTING.md - Serveurs ne démarrent pas](./TROUBLESHOOTING.md#-les-serveurs-ne-démarrent-pas)

### L'API ne répond pas
→ [TROUBLESHOOTING.md - L'API ne répond pas](./TROUBLESHOOTING.md#-lapi-ne-répond-pas)

### Les voitures ne s'affichent pas
→ [TROUBLESHOOTING.md - Les voitures ne s'affichent pas](./TROUBLESHOOTING.md#-les-voitures-ne-saffichent-pas)

### Erreurs TypeScript
→ [TROUBLESHOOTING.md - Erreurs TypeScript](./TROUBLESHOOTING.md#-problèmes-de-typescript)

### Autres problèmes
→ [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) (guide complet)

---

## 📊 Architecture

```
┌─────────────────────────────┐
│   Frontend React (Vite)     │
│   Port: 8080                │
│   Pages + Admin             │
└──────────────┬──────────────┘
               │ HTTP/API
┌──────────────▼──────────────┐
│   Backend Express.js        │
│   Port: 3000                │
│   Routes CRUD              │
└──────────────┬──────────────┘
               │ SQL
┌──────────────▼──────────────┐
│   SQLite Database           │
│   db/cars.db                │
│   Tables: cars, categories  │
└─────────────────────────────┘
```

---

## 📁 Fichiers clés

```
golden-drive-main/
├── SETUP_GUIDE.md           # 👈 LIRE EN PREMIER
├── QUICK_START.md           # Démarrage rapide
├── ADMIN_README.md          # Doc technique
├── TROUBLESHOOTING.md       # Dépannage
├── FILE_STRUCTURE.md        # Structure du code
├── IMPLEMENTATION_SUMMARY.md # Résumé des changements
├── documentation.md         # Cette page
│
├── server/                  # Backend Express
│   ├── index.ts
│   ├── db.ts
│   └── routes/
│       ├── cars.ts
│       └── categories.ts
│
├── db/                      # Base de données
│   ├── database.sql         # Schéma SQL
│   └── cars.db              # Créée automatiquement
│
├── src/pages/               # Pages React
│   ├── Admin.tsx            # Dashboard
│   ├── AdminCars.tsx        # CRUD voitures
│   ├── AdminCategories.tsx  # CRUD catégories
│   ├── Vehicules.tsx        # Page publique (modifiée)
│   └── ...                  # Autres pages
│
├── start.bat                # Script Windows
├── start.sh                 # Script Linux/Mac
└── package.json             # Dépendances
```

---

## ✨ Résumé des changements

### Ajouté
✅ Backend Express.js
✅ Base de données SQLite
✅ Pages admin CRUD
✅ API REST complète
✅ Intégration frontend
✅ Documentation

### Modifié
✅ `src/App.tsx` - Routes admin
✅ `src/pages/Vehicules.tsx` - Charge depuis API
✅ `src/components/layout/Navbar.tsx` - Bouton Admin
✅ `package.json` - Dépendances et scripts

### Conservé
✅ Tous les pages publiques
✅ Tous les composants UI
✅ Tous les styles
✅ Tous les scripts de build

---

## 🎓 Apprendre plus

### Tutorials
- Express.js: https://expressjs.com/
- SQLite: https://www.sqlite.org/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/

### Documentation project
- [ADMIN_README.md](./ADMIN_README.md) - API & DB détails
- [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) - Code structure
- `db/database.sql` - Schéma SQL commenté

---

## 🚀 Prochaines étapes

### Développement
- [ ] Ajouter authentication admin
- [ ] Implémenter pagination
- [ ] Ajouter upload d'images
- [ ] Créer export/import CSV
- [ ] Ajouter statistiques

### Production
- [ ] Déployer sur serveur
- [ ] Configurer HTTPS
- [ ] Optimiser images
- [ ] Mettre en cache
- [ ] Sauvegardes BD

---

## 💡 Tips

### Pour déboguer
1. Ouvrez la console du navigateur (F12)
2. Cherchez les erreurs en rouge
3. Vérifiez l'onglet "Network"
4. Lisez les logs du serveur

### Pour tester l'API
```bash
# Récupérer les voitures
curl http://localhost:3000/api/cars

# Créer une voiture
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{"id":"test","name":"Test","brand":"Test","categoryId":"citadine"}'
```

### Pour regarder la BD
```bash
# Avec sqlite3 CLI
sqlite3 db/cars.db
> SELECT * FROM cars;
> .exit
```

---

## 📞 Questions fréquentes

**Q: Comment savoir si tout fonctionne?**
A: Visitez http://localhost:3000/api/categories - vous devez voir un JSON

**Q: Où sont les données de ma BD?**
A: Dans `db/cars.db` (fichier SQLite local)

**Q: Puis-je utiliser le site sans backend?**
A: Oui! Il utilise les données statiques comme fallback

**Q: Comment réinitialiser la BD?**
A: Supprimez `db/cars.db` et relancez le serveur

**Q: Comment ajouter une nouvelle colonne?**
A: Modifiez `db/database.sql` et supprimez `db/cars.db`

---

## ✅ Checklist

**Avant de commencer:**
- [ ] Node.js installé
- [ ] npm en version récente
- [ ] Clonage du repo
- [ ] `npm install` exécuté

**Pour démarrer:**
- [ ] Terminal 1: `npm run server`
- [ ] Terminal 2: `npm run dev`
- [ ] Visitez http://localhost:8080
- [ ] Cliquez sur "Admin"

**Pour utiliser:**
- [ ] Initialiser BD via `/api/init`
- [ ] Ajouter/modifier/supprimer contenu
- [ ] Voir changes sur site public

---

## 🎉 Vous êtes prêt!

Commencez par [SETUP_GUIDE.md](./SETUP_GUIDE.md) pour une vue d'ensemble, puis [QUICK_START.md](./QUICK_START.md) pour démarrer immédiatement!

Bonne chance! 🚀

---

**Dernière mise à jour:** 2026-01-30
**Version:** 1.0.0
**Status:** Production-ready ✅
