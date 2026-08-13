import dbModule from './server/db';
import { cars, categories } from './src/data/cars';
import dotenv from 'dotenv';
dotenv.config();

const db = (dbModule as any).default || dbModule;

const fixSchemaAndSeed = async () => {
    console.log('🔧 Starting Schema Fix and Seed...');

    // Helper to add column safely
    const addCol = async (colSql: string) => {
        try {
            await db.query(`ALTER TABLE voiture ADD COLUMN ${colSql}`);
            console.log(`✅ Added column: ${colSql.split(' ')[0]}`);
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') {
                console.log(`ℹ️ Column already exists: ${colSql.split(' ')[0]}`);
            } else {
                console.error(`⚠️ Error adding column ${colSql.split(' ')[0]}:`, e.message);
            }
        }
    };

    // 1. Fix Schema
    await addCol("marque VARCHAR(255) NOT NULL DEFAULT ''");
    await addCol("nom_voiture VARCHAR(255) NOT NULL DEFAULT ''");
    await addCol("img_voiture TEXT");
    await addCol("Catégorie_voiture VARCHAR(255)");
    await addCol("categoryLabel VARCHAR(255)");
    await addCol("Caractéristiques_voiture TEXT");
    await addCol("features JSON");
    await addCol("idealFor VARCHAR(255)");
    await addCol("comfort VARCHAR(255)");
    await addCol("carUsage JSON");

    // 2. Truncate (Disable FK checks temporarily or do order)
    console.log('🧹 Truncating tables...');
    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    await db.query('TRUNCATE TABLE voiture');
    await db.query('TRUNCATE TABLE categories');
    await db.query('SET FOREIGN_KEY_CHECKS = 1');

    // 3a. Seed Categories
    console.log('🌱 Seeding categories...');
    /*
    const uniqueCategories = new Map();
    cars.forEach(car => {
        if (!uniqueCategories.has(car.category)) {
            uniqueCategories.set(car.category, car.categoryLabel);
        }
    });
    */

    for (const category of categories) {
        await db.query('INSERT INTO categories (id, label, icon) VALUES (?, ?, ?)', [category.id, category.label, category.icon || '🚗']);
    }
    console.log(`✅ Seeded ${categories.length} categories.`);

    // 3b. Seed Cars
    console.log('🌱 Seeding cars...');
    let insertedCount = 0;
    const promises = cars.map(async (car) => {
        try {
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
                    car.image || ''
                ]
            );
            if ((result as any).affectedRows > 0) insertedCount++;
        } catch (e: any) {
            console.error(`❌ Failed to insert ${car.id}:`, e.message);
        }
    });

    await Promise.all(promises);
    console.log(`✅ Seeded ${insertedCount} cars.`);
    process.exit(0);
};

fixSchemaAndSeed();
