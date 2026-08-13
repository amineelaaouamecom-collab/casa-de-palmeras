
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'server', 'routes', 'cars.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace `\` ` with `` ` ``
// In regex, backslash needs to be escaped. Backtick doesn't strictly need it but good for clarity.
// We want to find literal \ followed by `
// Regex: /\\`/g
content = content.replace(/\\`/g, '`');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed backticks in cars.ts');
