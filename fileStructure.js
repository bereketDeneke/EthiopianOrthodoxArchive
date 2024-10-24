// generateFileStructure.js
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, 'www.ethiopianorthodox.org');

function readDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  const result = [];

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const itemRelativePath = path.join(relativePath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      result.push({
        name: item,
        type: 'folder',
        children: readDirectory(fullPath, itemRelativePath),
      });
    } else {
      result.push({
        name: item,
        type: 'file',
        path: itemRelativePath.replace(/\\/g, '/'),
      });
    }
  });

  return result;
}

const fileStructure = readDirectory(rootDir);
fs.writeFileSync('src/data/fileStructure.json', JSON.stringify(fileStructure, null, 2));
