import express from 'express';
import cors from 'cors';
import connectDB from './db.ts';
import categoriesRouter from './routes/categories.ts';
import carsRouter from './routes/cars.ts';
import { cars as carData, categories as categoryData } from './data.ts';
import Car from './models/Car.ts';
import Category from './models/Category.ts';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'https://autoconfiance-i83g.vercel.app',
  'https://golden-drive-main.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/categories', categoriesRouter);
app.use('/api/cars', carsRouter);

// Endpoint pour synchroniser la base de données avec les données statiques
app.get('/api/init', async (req: express.Request, res: express.Response) => {
  console.log('🔄 Début de la synchronisation MongoDB...');

  try {
    // 1. Synchronisation des catégories
    const categoryPromises = categoryData.map(async (cat) => {
      // Use findOneAndUpdate with upsert: true
      return Category.findOneAndUpdate(
        { _id: cat.id }, // search by id
        { label: cat.label, icon: cat.icon },
        { upsert: true, new: true }
      );
    });

    await Promise.all(categoryPromises);
    console.log('✅ Catégories synchronisées');

    // 2. Synchronisation des voitures
    const carPromises = carData.map(async (car) => {
      return Car.findOneAndUpdate(
        { _id: car.id },
        {
          name: car.name,
          brand: car.brand,
          categoryId: car.category, // map static 'category' to 'categoryId'
          categoryLabel: car.categoryLabel,
          description: car.description,
          features: car.features || [],
          idealFor: car.idealFor || '',
          comfort: car.comfort || '',
          carUsage: car.usage || [], // map 'usage' to 'carUsage'
          image: car.image || ''
        },
        { upsert: true, new: true }
      );
    });

    await Promise.all(carPromises);
    console.log('✅ Voitures synchronisées');

    res.json({ message: 'Synchronisation MongoDB terminée avec succès' });

  } catch (err: any) {
    console.error('❌ Erreur globale:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/init', async (req: express.Request, res: express.Response) => {
  console.log('🔄 Début de la synchronisation MongoDB...');

  try {
    // 1. Synchronisation des catégories
    const categoryPromises = categoryData.map(async (cat) => {
      // Use findOneAndUpdate with upsert: true
      return Category.findOneAndUpdate(
        { _id: cat.id }, // search by id
        { label: cat.label, icon: cat.icon },
        { upsert: true, new: true }
      );
    });

    await Promise.all(categoryPromises);
    console.log('✅ Catégories synchronisées');

    // 2. Synchronisation des voitures
    const carPromises = carData.map(async (car) => {
      return Car.findOneAndUpdate(
        { _id: car.id },
        {
          name: car.name,
          brand: car.brand,
          categoryId: car.category, // map static 'category' to 'categoryId'
          categoryLabel: car.categoryLabel,
          description: car.description,
          features: car.features || [],
          idealFor: car.idealFor || '',
          comfort: car.comfort || '',
          carUsage: car.usage || [], // map 'usage' to 'carUsage'
          image: car.image || ''
        },
        { upsert: true, new: true }
      );
    });

    await Promise.all(carPromises);
    console.log('✅ Voitures synchronisées');

    res.json({ message: 'Synchronisation MongoDB terminée avec succès' });

  } catch (err: any) {
    console.error('❌ Erreur globale:', err);
    res.status(500).json({ error: err.message });
  }
});

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📊 Visitez http://localhost:${PORT}/api/init pour initialiser la BD`);
});

// Export the app for Vercel
export default app;

