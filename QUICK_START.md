# 🚀 Guide de Démarrage Rapide - Partie Admin

## Étapes simples pour démarrer

### 1️⃣ Dans le terminal (À la racine du projet)

```bash
# Installer les dépendances (si pas déjà fait)
npm install

# Démarrer le serveur backend
npm run server
```

**Le serveur démarre sur:** `http://localhost:3000`

### 2️⃣ Dans un AUTRE terminal (À la racine du projet)

```bash
# Démarrer le frontend
npm run dev
```

**Le frontend démarre sur:** `http://localhost:8080`

### 3️⃣ Initialiser la base de données

Une fois les deux serveurs lancés, visiter:
```
http://localhost:3000/api/init
```

Cela charge les voitures existantes dans la BD.

## 🎯 Accéder à l'Admin

1. Allez à `http://localhost:8080`
2. Cliquez sur le bouton **"Admin"** en haut à droite
3. Ou directement: `http://localhost:8080/admin`

## 📝 Fonctionnalités

### ✅ Gestion des Voitures
- Ajouter une voiture
- Modifier une voiture existante
- Supprimer une voiture
- Voir la liste complète

### ✅ Gestion des Catégories
- Ajouter une catégorie
- Modifier une catégorie
- Supprimer une catégorie
- Voir la liste complète

### ✅ Page Publique Dynamique
- La page "Nos Véhicules" charge les données de la BD
- Les filtres par catégorie fonctionnent
- Fallback automatique sur les données statiques si l'API n'est pas disponible

## 🗂️ Fichiers importants

| Fichier | Description |
|---------|-------------|
| `server/index.ts` | Serveur Express |
| `db/database.sql` | Schéma de la base de données |
| `db/cars.db` | Base de données SQLite (créée automatiquement) |
| `src/pages/Admin.tsx` | Tableau de bord admin |
| `src/pages/AdminCars.tsx` | CRUD voitures |
| `src/pages/AdminCategories.tsx` | CRUD catégories |
| `ADMIN_README.md` | Documentation complète |

## ⚡ Commandes utiles

```bash
# Démarrer le backend
npm run server

# Démarrer le frontend  
npm run dev

# Initialiser la BD avec les données par défaut
curl -X POST http://localhost:3000/api/init
```

## 🆘 Problèmes courants

**Q: L'API n'est pas disponible au démarrage?**
- A: La page "Nos Véhicules" utilisera les données statiques jusqu'à ce que vous lanciez le serveur

**Q: Comment réinitialiser la BD?**
- A: Supprimez le fichier `db/cars.db` et relancez le serveur

**Q: Les modifications n'apparaissent pas?**
- A: Rafraîchissez la page (F5)

---

**Besoin de plus d'aide?** Consultez [ADMIN_README.md](./ADMIN_README.md)
