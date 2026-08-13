


const BASE_URL = 'http://localhost:3001/api/cars';

async function verify() {
    console.log('🧪 Starting Verification...');

    // 1. Create
    console.log('1. Testing POST (Create)...');
    const newCar = {
        id: 'test-car-' + Date.now(),
        name: 'Test Car',
        brand: 'Test Brand',
        categoryId: 'citadine',
        categoryLabel: 'Citadine',
        description: 'Test Description',
        features: ['Test Feature'],
        idealFor: 'Testing',
        comfort: 'High',
        usage: ['Test'],
        image: 'http://example.com/image.jpg'
    };

    try {
        const createRes = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCar)
        });

        if (!createRes.ok) {
            const text = await createRes.text();
            throw new Error(`POST failed: ${createRes.status} ${text}`);
        }
        const created = await createRes.json();
        console.log('✅ POST Success:', created.id);

        // 2. Update
        console.log('2. Testing PUT (Update)...');
        const updateRes = await fetch(`${BASE_URL}/${newCar.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newCar, name: 'Updated Test Car' })
        });

        if (!updateRes.ok) throw new Error(`PUT failed: ${updateRes.status}`);
        const updated = await updateRes.json();
        if (updated.name !== 'Updated Test Car') throw new Error('Update did not persist');
        console.log('✅ PUT Success:', updated.name);

        // 3. Delete
        console.log('3. Testing DELETE (Delete)...');
        const deleteRes = await fetch(`${BASE_URL}/${newCar.id}`, {
            method: 'DELETE'
        });

        if (!deleteRes.ok) throw new Error(`DELETE failed: ${deleteRes.status}`);
        console.log('✅ DELETE Success');

    } catch (err) {
        console.error('❌ Verification Failed:', err);
        process.exit(1);
    }
}

verify();
