'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function uploadImage(formData: FormData) {
    const file = formData.get('file') as File;

    if (!file) {
        return { success: false, error: 'No file uploaded' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;

    // Ensure directory exists
    const uploadDir = join(process.cwd(), 'public/uploads');
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        // Ignore existing dir error
    }

    const path = join(uploadDir, filename);

    try {
        await writeFile(path, buffer);
        return { success: true, url: `/uploads/${filename}` };
    } catch (error) {
        console.error('Upload Error:', error);
        return { success: false, error: 'Failed to save file' };
    }
}
