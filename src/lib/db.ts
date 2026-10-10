import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

export async function getSiteData() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading DB:', error);
        return null;
    }
}

export async function updateSiteData(newData: any) {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(newData, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Error writing DB:', error);
        return false;
    }
}
