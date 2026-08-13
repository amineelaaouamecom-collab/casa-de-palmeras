
export interface Car {
  id: string;
  name: string;
  brand: string;
  category: 'citadine' | 'berline' | 'suv' | 'utilitaire';
  categoryLabel: string;
  description: string;
  features: string[];
  idealFor: string;
  comfort: string;
  usage: string[];
  image: string;
}

export const categories = [
  { id: 'citadine', label: 'Citadines & Compactes', icon: '🚗' },
  { id: 'berline', label: 'Berlines & Familiales', icon: '🚗' },
  { id: 'suv', label: 'SUV & Crossovers', icon: '🚙' },
  { id: 'utilitaire', label: 'Utilitaires & Monospaces', icon: '🚐' },
];

export const cars: Car[] = [
  {
    id: 'range-rover-evoque',
    name: 'Range Rover Evoque',
    brand: 'Land Rover',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV compacte premium avec design élégant et confort supérieur. Parfait pour explorer Marrakech avec style.',
    features: ['Automatique', '5 places', 'Climatisation', 'GPS'],
    idealFor: 'Voyages en ville et randonnées',
    comfort: 'Intérieur luxueux avec sièges en cuir',
    usage: ['Ville', 'Route', 'Tourisme'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.03.jpeg'
  },
  {
    id: 'mercedes-glc',
    name: 'Mercedes-Benz GLC',
    brand: 'Mercedes-Benz',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV de luxe allemand avec confort exceptionnel et technologies avancées.',
    features: ['Automatique', '5 places', 'Climatisation bi-zone', 'Caméra de recul'],
    idealFor: 'Affaires et tourisme premium',
    comfort: 'Sièges confortables avec massage',
    usage: ['Ville', 'Route', 'Affaires'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.03 (1).jpeg'
  },
  {
    id: 'bmw-x5',
    name: 'BMW X5',
    brand: 'BMW',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV sportif et performant avec dynamique de conduite exceptionnelle.',
    features: ['Automatique', '5 places', 'Climatisation', 'Système audio premium'],
    idealFor: 'Conducteurs exigeants',
    comfort: 'Habitacle spacieux et ergonomique',
    usage: ['Ville', 'Route', 'Sport'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.03 (2).jpeg'
  },
  {
    id: 'audi-q7',
    name: 'Audi Q7',
    brand: 'Audi',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV familial spacieux avec 7 places et technologies de pointe.',
    features: ['Automatique', '7 places', 'Climatisation tri-zone', 'Écrans tactiles'],
    idealFor: 'Familles et groupes',
    comfort: 'Espace généreux pour tous les passagers',
    usage: ['Famille', 'Route', 'Tourisme'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.03 (3).jpeg'
  },
  {
    id: 'volvo-xc90',
    name: 'Volvo XC90',
    brand: 'Volvo',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV suédois axé sur la sécurité et le confort familial.',
    features: ['Automatique', '7 places', 'Sécurité avancée', 'Climatisation'],
    idealFor: 'Familles soucieuses de sécurité',
    comfort: 'Sièges ergonomiques premium',
    usage: ['Famille', 'Route', 'Sécurité'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.03 (4).jpeg'
  },
  {
    id: 'porsche-cayenne',
    name: 'Porsche Cayenne',
    brand: 'Porsche',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV de sportive avec performances exceptionnelles et luxe.',
    features: ['Automatique', '5 places', 'Performance', 'Intérieur sportif'],
    idealFor: 'Passionnés de conduite',
    comfort: 'Finitions haut de gamme',
    usage: ['Sport', 'Route', 'Luxe'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.03 (5).jpeg'
  },
  {
    id: 'mercedes-s-class',
    name: 'Mercedes-Benz S-Class',
    brand: 'Mercedes-Benz',
    category: 'berline',
    categoryLabel: 'Berline',
    description: 'Berline de luxe ultime avec confort exceptionnel et technologies de pointe.',
    features: ['Automatique', '5 places', 'Climatisation', 'Sièges massants'],
    idealFor: 'Affaires et occasions spéciales',
    comfort: 'Confort suprême avec isolation phonique',
    usage: ['Affaires', 'Luxe', 'Tourisme'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.04.jpeg'
  },
  {
    id: 'bmw-7-series',
    name: 'BMW Série 7',
    brand: 'BMW',
    category: 'berline',
    categoryLabel: 'Berline',
    description: 'Berline de luxe allemande avec technologie avancée et confort premium.',
    features: ['Automatique', '5 places', 'Écrans tactiles', 'Système audio'],
    idealFor: 'Affaires et tourisme premium',
    comfort: 'Intérieur spacieux et ergonomique',
    usage: ['Affaires', 'Route', 'Luxe'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.04 (1).jpeg'
  },
  {
    id: 'audi-a8',
    name: 'Audi A8',
    brand: 'Audi',
    category: 'berline',
    categoryLabel: 'Berline',
    description: 'Berline executive avec design sophistiqué et technologies innovantes.',
    features: ['Automatique', '5 places', 'Quattro', 'Matrix LED'],
    idealFor: 'Executifs et VIP',
    comfort: 'Finitions haut de gamme',
    usage: ['Affaires', 'VIP', 'Luxe'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.04 (2).jpeg'
  },
  {
    id: 'lexus-ls',
    name: 'Lexus LS',
    brand: 'Lexus',
    category: 'berline',
    categoryLabel: 'Berline',
    description: 'Berline de luxe japonaise réputée pour sa fiabilité et son confort.',
    features: ['Automatique', '5 places', 'Climatisation', 'Système audio Mark Levinson'],
    idealFor: 'Confort et fiabilité',
    comfort: 'Silence et confort exceptionnels',
    usage: ['Affaires', 'Confort', 'Fiabilité'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.04 (3).jpeg'
  },
  {
    id: 'rolls-royce-phantom',
    name: 'Rolls-Royce Phantom',
    brand: 'Rolls-Royce',
    category: 'berline',
    categoryLabel: 'Berline',
    description: 'L\'ultime berline de luxe pour les occasions les plus prestigieuses.',
    features: ['Automatique', '4 places', 'Luxe absolu', 'Artisanat'],
    idealFor: 'Mariages et événements VIP',
    comfort: 'Confort inégalé',
    usage: ['Mariage', 'VIP', 'Prestige'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.04 (4).jpeg'
  },
  {
    id: 'bentley-flying-spur',
    name: 'Bentley Flying Spur',
    brand: 'Bentley',
    category: 'berline',
    categoryLabel: 'Berline',
    description: 'Berline grand tourisme britannique avec performance et luxe.',
    features: ['Automatique', '4 places', 'Performance', 'Cuir premium'],
    idealFor: 'Tourisme de luxe',
    comfort: 'Finitions artisanales',
    usage: ['Tourisme', 'Luxe', 'Performance'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.04 (5).jpeg'
  },
  {
    id: 'toyota-rav4',
    name: 'Toyota RAV4',
    brand: 'Toyota',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV compacte fiable et économique, parfait pour la ville les voyages.',
    features: ['Automatique', '5 places', 'Économique', 'Fiable'],
    idealFor: 'Familles et voyageurs économiques',
    comfort: 'Confortable et spacieux',
    usage: ['Ville', 'Route', 'Famille'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.05.jpeg'
  },
  {
    id: 'volkswagen-tiguan',
    name: 'Volkswagen Tiguan',
    brand: 'Volkswagen',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV compacte allemand avec qualité et fiabilité.',
    features: ['Automatique', '5 places', 'Qualité', 'Espace'],
    idealFor: 'Familles et conducteurs pragmatiques',
    comfort: 'Habitacle bien fini',
    usage: ['Ville', 'Famille', 'Qualité'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.05 (1).jpeg'
  },
  {
    id: 'renault-captur',
    name: 'Renault Captur',
    brand: 'Renault',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV urbain compacte et économique pour la ville.',
    features: ['Automatique', '5 places', 'Urbain', 'Économique'],
    idealFor: 'Citadins et conducteurs économiques',
    comfort: 'Agile et confortable en ville',
    usage: ['Ville', 'Urbain', 'Économique'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.05 (2).jpeg'
  },
  {
    id: 'peugeot-3008',
    name: 'Peugeot 3008',
    brand: 'Peugeot',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV compacte français avec design moderne et confort.',
    features: ['Automatique', '5 places', 'Design', 'Confort'],
    idealFor: 'Familles et conducteurs modernes',
    comfort: 'Intérieur moderne et ergonomique',
    usage: ['Ville', 'Famille', 'Design'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.05 (3).jpeg'
  },
  {
    id: 'hyundai-tucson',
    name: 'Hyundai Tucson',
    brand: 'Hyundai',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV compacte avec garantie longue et équipements complets.',
    features: ['Automatique', '5 places', 'Garantie', 'Équipements'],
    idealFor: 'Familles soucieuses de garantie',
    comfort: 'Espace et confort généreux',
    usage: ['Famille', 'Route', 'Garantie'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.05 (4).jpeg'
  },
  {
    id: 'kia-sportage',
    name: 'Kia Sportage',
    brand: 'Kia',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV compacte avec design audacieux et bonne valeur.',
    features: ['Automatique', '5 places', 'Design', 'Valeur'],
    idealFor: 'Conducteurs recherchant style et valeur',
    comfort: 'Intérieur spacieux et moderne',
    usage: ['Ville', 'Route', 'Style'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.05 (5).jpeg'
  },
  {
    id: 'nissan-qashqai',
    name: 'Nissan Qashqai',
    brand: 'Nissan',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV compacte populaire et fiable pour tous les usages.',
    features: ['Automatique', '5 places', 'Fiable', 'Polyvalent'],
    idealFor: 'Familles et conducteurs polyvalents',
    comfort: 'Confortable et pratique',
    usage: ['Ville', 'Famille', 'Polyvalent'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.05 (6).jpeg'
  },
  {
    id: 'mercedes-gla',
    name: 'Mercedes-Benz GLA',
    brand: 'Mercedes-Benz',
    category: 'suv',
    categoryLabel: 'SUV',
    description: 'SUV compacte premium avec luxe Mercedes.',
    features: ['Automatique', '5 places', 'Premium', 'Luxe'],
    idealFor: 'Conducteurs exigeants',
    comfort: 'Finitions Mercedes haut de gamme',
    usage: ['Ville', 'Premium', 'Luxe'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.06.jpeg'
  },
  {
    id: 'mini-cooper',
    name: 'MINI Cooper',
    brand: 'MINI',
    category: 'citadine',
    categoryLabel: 'Citadine',
    description: 'Citadine iconique avec style unique et agilité urbaine.',
    features: ['Automatique', '4 places', 'Style', 'Agilité'],
    idealFor: 'Citadins stylés',
    comfort: 'Compacte mais confortable',
    usage: ['Ville', 'Style', 'Urbain'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.06 (1).jpeg'
  },
  {
    id: 'fiat-500',
    name: 'Fiat 500',
    brand: 'Fiat',
    category: 'citadine',
    categoryLabel: 'Citadine',
    description: 'Citadine italienne charmante et économique.',
    features: ['Automatique', '4 places', 'Économique', 'Style'],
    idealFor: 'Ville et budget',
    comfort: 'Simple et pratique',
    usage: ['Ville', 'Économique', 'Style'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.06 (2).jpeg'
  },
  {
    id: 'smart-fortwo',
    name: 'Smart Fortwo',
    brand: 'Smart',
    category: 'citadine',
    categoryLabel: 'Citadine',
    description: 'Citadine ultra-compacte parfaite pour la ville.',
    features: ['Automatique', '2 places', 'Ultra-compacte', 'Urbain'],
    idealFor: 'Ville et parking facile',
    comfort: 'Minimaliste mais fonctionnel',
    usage: ['Ville', 'Urbain', 'Pratique'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.06 (3).jpeg'
  },
  {
    id: 'honda-civic',
    name: 'Honda Civic',
    brand: 'Honda',
    category: 'citadine',
    categoryLabel: 'Citadine',
    description: 'Citadine fiable et spacieuse avec technologie moderne.',
    features: ['Automatique', '5 places', 'Fiable', 'Technologie'],
    idealFor: 'Familles et ville',
    comfort: 'Espace et confort',
    usage: ['Ville', 'Famille', 'Fiable'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.06 (4).jpeg'
  },
  {
    id: 'toyota-yaris',
    name: 'Toyota Yaris',
    brand: 'Toyota',
    category: 'citadine',
    categoryLabel: 'Citadine',
    description: 'Citadine japonaise économique et fiable.',
    features: ['Automatique', '5 places', 'Économique', 'Fiable'],
    idealFor: 'Ville et économie',
    comfort: 'Pratique et confortable',
    usage: ['Ville', 'Économique', 'Fiable'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.06 (5).jpeg'
  },
  {
    id: 'peugeot-208',
    name: 'Peugeot 208',
    brand: 'Peugeot',
    category: 'citadine',
    categoryLabel: 'Citadine',
    description: 'Citadine française avec design moderne et confort.',
    features: ['Automatique', '5 places', 'Design', 'Confort'],
    idealFor: 'Ville et style',
    comfort: 'Intérieur moderne',
    usage: ['Ville', 'Style', 'Confort'],
    image: '/images/cars/WhatsApp Image 2026-08-11 at 17.22.06.jpeg'
  },
];

export const getFeaturedCars = () => cars.slice(0, 8);

export const getCarsByCategory = (category: string) =>
  cars.filter(car => car.category === category);

export const getCarById = (id: string) =>
  cars.find(car => car.id === id);
