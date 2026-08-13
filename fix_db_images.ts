import dbModule from './server/db';
import { cars } from './src/data/cars';
import dotenv from 'dotenv';
dotenv.config();

// Handle potentially different import behavior (default export vs module namespace)
const db = (dbModule as any).default || dbModule;

const syncImages = async () => {
    console.log('🔄 Starting database sync for images...');
    console.log('DB Object Type:', typeof db);
    if (!db.query) {
        console.error('❌ db.query is missing. db content:', db);
        process.exit(1);
    }

    try {
        const promises = cars.map(car => {
            // Upsert query to fix images and other fields
            return db.query(
                `INSERT INTO voiture (id_voiture, nom_voiture, marque, Catégorie_voiture, categoryLabel, Caractéristiques_voiture, features, idealFor, comfort, carUsage, img_voiture)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
         img_voiture = VALUES(img_voiture),
         nom_voiture = VALUES(nom_voiture),
         marque = VALUES(marque),
         categoryLabel = VALUES(categoryLabel),
         Catégorie_voiture = VALUES(Catégorie_voiture)`,
                [
                    car.id,
                    car.name,
                    car.brand,
                    car.category,
                    car.categoryLabel,
                    car.description,
                    JSON.stringify(car.features || []),
                    car.idealFor || '',
                    car.comfort || '',
                    JSON.stringify(car.usage || []),
                    car.image || '' // This is the fixed URL from keys.ts
                ]
            );
        });

        await Promise.all(promises);
        console.log(`✅ Successfully synced ${cars.length} cars headers.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing database:', error);
        process.exit(1);
    }
};

syncImages();
