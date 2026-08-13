import dbModule from './server/db';
import { cars } from './src/data/cars';
import dotenv from 'dotenv';
dotenv.config();

const db = (dbModule as any).default || dbModule;

const syncImages = async () => {
    console.log('🔄 Starting SAFE database sync for images...');

    if (!db.query) {
        console.error('❌ db.query is missing.');
        process.exit(1);
    }

    try {
        console.log(`Loaded ${cars.length} cars from file.`);

        // DROP and RECREATE to ensure schema is correct
        console.log('⚠️ DROPPING table `voiture` to fix schema...');
        await db.query('DROP TABLE IF EXISTS voiture');

        console.log('🏗️ Recreating table `voiture`...');
        await db.query(`
      CREATE TABLE voiture (
        id_voiture VARCHAR(255) PRIMARY KEY,
        nom_voiture VARCHAR(255) NOT NULL,
        marque VARCHAR(255) NOT NULL,
        Catégorie_voiture VARCHAR(255),
        categoryLabel VARCHAR(255),
        Caractéristiques_voiture TEXT,
        features JSON,
        idealFor VARCHAR(255),
        comfort VARCHAR(255),
        carUsage JSON,
        img_voiture TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (Catégorie_voiture) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
        console.log('✅ Table recreated.');

        let insertedCount = 0;
        const promises = cars.map(async (car) => {
            // INSERT (standard seed)
            const [result] = await db.query(
                `INSERT INTO voiture (id_voiture, nom_voiture, marque, Catégorie_voiture, categoryLabel, Caractéristiques_voiture, features, idealFor, comfort, carUsage, img_voiture)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
                    car.image || '' // Fixed URL
                ]
            );
            if ((result as any).affectedRows > 0) {
                insertedCount++;
            }
            return result;
        });

        await Promise.all(promises);
        console.log(`✅ Successfully seeded ${insertedCount} cars.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing database:', error);
        process.exit(1);
    }
};

syncImages();
