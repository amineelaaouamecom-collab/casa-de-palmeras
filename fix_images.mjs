import fs from 'fs';
const path = 'src/data/cars.ts';

try {
    let content = fs.readFileSync(path, 'utf8');

    const images = {
        citadine: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
        berline: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        suv: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        utilitaire: 'https://images.unsplash.com/photo-1586043130630-f72535081033?w=800'
    };

    const lines = content.split('\n');
    let currentCategory = 'citadine';

    const newLines = lines.map(line => {
        // Detect category
        const catMatch = line.match(/category:\s*'([^']+)'/);
        if (catMatch) {
            currentCategory = catMatch[1];
        }

        // Detect image line
        if (line.trim().startsWith('image:')) {
            const isUrl = line.includes('https://') || line.includes('http://');
            const isLocal = line.includes('c:') || line.includes('C:') || line.includes('Users');

            if (!isUrl || isLocal) {
                return `    image: '${images[currentCategory] || images.citadine}'`;
            }
        }
        return line;
    });

    fs.writeFileSync(path, newLines.join('\n'));
    console.log('✅ cars.ts has been updated with valid image URLs.');
} catch (e) {
    console.error('Error fixing files:', e);
}
