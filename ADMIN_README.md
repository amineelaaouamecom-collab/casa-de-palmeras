# Documentation - Partie Admin et Backend

## 📋 Vue d'ensemble

Ce projet a été mis à jour avec une partie **Admin** complète permettant de gérer dynamiquement les voitures et les catégories via une base de données SQLite.

## 🏗️ Architecture

### Structure ajoutée
```
server/                    # Backend Express.js
├── index.ts             # Serveur principal
├── db.ts                # Configuration SQLite
└── routes/
    ├── cars.ts          # API endpoints pour les voitures
    └── categories.ts    # API endpoints pour les catégories

db/
└── database.sql         # Schéma et données initiales SQLite

src/pages/
├── Admin.tsx            # Tableau de bord admin
├── AdminCars.tsx        # CRUD des voitures
└── AdminCategories.tsx  # CRUD des catégories
```

### Technologie utilisées
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + SQLite3
- **API**: REST avec CORS activé
- **Base de données**: SQLite (db/cars.db)

## 🚀 Démarrage

### 1. Installation des dépendances
```bash
npm install
```

### 2. Démarrer le serveur backend
```bash
# Option 1: Avec ts-node
npm run server

# Option 2: Utiliser node directement (si compilé)
node server/index.ts
```

Le serveur se lancera sur `http://localhost:3000`

### 3. Démarrer le frontend (dans un autre terminal)
```bash
npm run dev
```

Le frontend se lancera sur `http://localhost:8080`

### 4. Initialiser la base de données
Une fois le serveur backend lancé, faites une requête POST pour initialiser la BD avec les données existantes:
```bash
curl -X POST http://localhost:3000/api/init
```

Ou visitez dans le navigateur: `http://localhost:3000/api/init`

## 📊 Base de données

### Schema SQL
Voir le fichier [db/database.sql](./db/database.sql) pour le schéma complet.

**Tables principales:**

#### `categories`
```sql
- id (TEXT, PRIMARY KEY)
- label (TEXT)
- icon (TEXT)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

#### `cars`
```sql
- id (TEXT, PRIMARY KEY)
- name (TEXT)
- brand (TEXT)
- categoryId (TEXT, FOREIGN KEY)
- categoryLabel (TEXT)
- description (TEXT)
- features (TEXT - JSON)
- idealFor (TEXT)
- comfort (TEXT)
- usage (TEXT - JSON)
- image (TEXT)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

## 🎯 API Endpoints

### Catégories
- `GET /api/categories` - Récupérer toutes les catégories
- `GET /api/categories/:id` - Récupérer une catégorie
- `POST /api/categories` - Créer une catégorie
- `PUT /api/categories/:id` - Modifier une catégorie
- `DELETE /api/categories/:id` - Supprimer une catégorie

### Voitures
- `GET /api/cars` - Récupérer toutes les voitures
- `GET /api/cars?categoryId=citadine` - Filtrer par catégorie
- `GET /api/cars/:id` - Récupérer une voiture
- `POST /api/cars` - Créer une voiture
- `PUT /api/cars/:id` - Modifier une voiture
- `DELETE /api/cars/:id` - Supprimer une voiture

### Utilitaires
- `POST /api/init` - Initialiser la BD avec les données statiques

## 🎨 Interface Admin

### Accès
1. Cliquez sur le bouton "Admin" en haut à droite de la navbar
2. Ou allez à `http://localhost:8080/admin`

### Tableau de bord principal
- Lien rapide vers la gestion des voitures
- Lien rapide vers la gestion des catégories
- Informations sur l'API et la BD

### Gestion des Voitures (`/admin/cars`)
- **Ajouter**: Formulaire pour créer une nouvelle voiture
- **Modifier**: Cliquez sur "Modifier" dans le tableau
- **Supprimer**: Cliquez sur "Supprimer" dans le tableau
- **Recherche**: Filtrez par catégorie

### Gestion des Catégories (`/admin/categories`)
- **Ajouter**: Formulaire pour créer une nouvelle catégorie
- **Modifier**: Cliquez sur "Modifier" dans le tableau
- **Supprimer**: Cliquez sur "Supprimer" dans le tableau

## 📝 Format des données

### Exemple - Créer une catégorie
```json
POST /api/categories
{
  "id": "sport",
  "label": "Voitures de Sport",
  "icon": "🏎️"
}
```

### Exemple - Créer une voiture
```json
POST /api/cars
{
  "id": "ferrari-f8",
  "name": "Ferrari F8 Tributo",
  "brand": "Ferrari",
  "categoryId": "sport",
  "categoryLabel": "Voitures de Sport",
  "description": "Un chef-d'œuvre en carbone et vitesse",
  "features": ["Turbo V12", "0-100 en 2.9s", "Design aérodynamique"],
  "idealFor": "Amateurs de performance",
  "comfort": "Confort sportif maximal",
  "usage": ["Routes sinueuses", "Circuit"],
  "image": "https://example.com/ferrari-f8.jpg"
}
```

## 🔄 Comportement du Frontend

### Chargement des données
- Le frontend essaie de charger depuis l'API backend
- **Si l'API n'est pas disponible**: Fallback automatique aux données statiques (`src/data/cars.ts`)
- Les données en base de données sont synchronisées en temps réel

### Pages affectées
- **Vehicules.tsx**: Charge depuis l'API avec fallback
- **VehiculeDetail.tsx**: Fonctionne avec les données statiques (peut être amélioré)
- **Pages publiques**: Continuent de fonctionner normalement

## 🛠️ Fichiers modifiés/créés

### Nouveaux fichiers
- `server/index.ts` - Point d'entrée serveur
- `server/db.ts` - Configuration SQLite
- `server/routes/cars.ts` - Routes CRUD voitures
- `server/routes/categories.ts` - Routes CRUD catégories
- `db/database.sql` - Schéma SQL
- `src/pages/Admin.tsx` - Tableau de bord admin
- `src/pages/AdminCars.tsx` - CRUD voitures
- `src/pages/AdminCategories.tsx` - CRUD catégories
- `.env` - Variables d'environnement
- `ADMIN_README.md` - Cette documentation

### Fichiers modifiés
- `src/App.tsx` - Ajout des routes admin
- `src/pages/Vehicules.tsx` - Intégration API
- `src/components/layout/Navbar.tsx` - Lien admin
- `package.json` - Dépendances et scripts

## ⚠️ Notes importantes

1. **Base de données**: La première fois que vous lancez le serveur, la DB est créée automatiquement
2. **Données initiales**: Utilisez `POST /api/init` pour charger les données de `cars.ts`
3. **CORS**: Le serveur accepte les requêtes du frontend (localhost:8080)
4. **Port serveur**: Configurable via `.env` (défaut: 3000)

## 🚨 Troubleshooting

### L'API ne répond pas
- Vérifiez que le serveur backend est lancé: `npm run server`
- Vérifiez que le port 3000 n'est pas utilisé
- Vérifiez les logs du serveur

### Les voitures ne s'affichent pas
- Si pas de BD: L'app utilise les données statiques par défaut ✅
- Vérifiez l'onglet "Network" dans les DevTools du navigateur
- Assurez-vous que CORS est bien configuré

### Erreurs de base de données
- Supprimez `db/cars.db` pour réinitialiser
- Relancez le serveur
- Appelez `POST /api/init` pour charger les données

## 📚 Prochaines étapes possibles

- Ajouter une authentification admin
- Pagination pour grandes listes
- Import/Export CSV
- Recherche avancée
- Statistiques dashboard
- Images upload
- Validation côté serveur avancée
