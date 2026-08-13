-- Créer la table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table des voitures
CREATE TABLE IF NOT EXISTS cars (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  categoryId TEXT NOT NULL,
  categoryLabel TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT NOT NULL,
  idealFor TEXT NOT NULL,
  comfort TEXT NOT NULL,
  usage TEXT NOT NULL,
  image TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);

-- Insérer les catégories par défaut
INSERT OR IGNORE INTO categories (id, label, icon) VALUES 
('citadine', 'Citadines & Compactes', '🚗'),
('berline', 'Berlines & Familiales', '🚗'),
('suv', 'SUV & Crossovers', '🚙'),
('utilitaire', 'Utilitaires & Monospaces', '🚐');

-- Créer un index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_cars_category ON cars(categoryId);
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
