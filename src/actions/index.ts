'use server';

import { getSiteData, updateSiteData } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function fetchSiteData() {
    return await getSiteData();
}

export async function updateHeroSlide(slideId: number, data: any) {
    const db = await getSiteData();
    const index = db.hero.findIndex((s: any) => s.id === slideId);
    if (index !== -1) {
        db.hero[index] = { ...db.hero[index], ...data };
        await updateSiteData(db);
        revalidatePath('/');
        return { success: true };
    }
    return { success: false, error: 'Slide not found' };
}

export async function addHeroSlide(data: any) {
    const db = await getSiteData();
    const newId = Math.max(...db.hero.map((s: any) => s.id)) + 1;
    db.hero.push({ ...data, id: newId });
    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}

export async function deleteHeroSlide(slideId: number) {
    const db = await getSiteData();
    db.hero = db.hero.filter((s: any) => s.id !== slideId);
    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}

export async function reorderHero(id: number, direction: 'up' | 'down') {
    const db = await getSiteData();
    const index = db.hero.findIndex((s: any) => s.id === id);
    if (index === -1) return { success: false };

    if (direction === 'up' && index > 0) {
        [db.hero[index], db.hero[index - 1]] = [db.hero[index - 1], db.hero[index]];
    } else if (direction === 'down' && index < db.hero.length - 1) {
        [db.hero[index], db.hero[index + 1]] = [db.hero[index + 1], db.hero[index]];
    } else {
        return { success: false };
    }

    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}


// Product Actions
export async function addProduct(product: any) {
    const db = await getSiteData();
    const newId = Math.max(...db.products.map((p: any) => p.id), 0) + 1;
    db.products.push({ ...product, id: newId });
    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}

export async function deleteProduct(id: number) {
    const db = await getSiteData();
    db.products = db.products.filter((p: any) => p.id !== id);
    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}

export async function updateProduct(id: number, data: any) {
    const db = await getSiteData();
    const index = db.products.findIndex((p: any) => p.id === id);
    if (index !== -1) {
        db.products[index] = { ...db.products[index], ...data };
        await updateSiteData(db);
        revalidatePath('/');
        return { success: true };
    }
    return { success: false };
}

export async function reorderProduct(id: number, direction: 'up' | 'down') {
    const db = await getSiteData();
    const index = db.products.findIndex((p: any) => p.id === id);
    if (index === -1) return { success: false };

    if (direction === 'up' && index > 0) {
        // Swap with previous
        [db.products[index], db.products[index - 1]] = [db.products[index - 1], db.products[index]];
    } else if (direction === 'down' && index < db.products.length - 1) {
        // Swap with next
        [db.products[index], db.products[index + 1]] = [db.products[index + 1], db.products[index]];
    } else {
        return { success: false }; // Can't move
    }

    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}


// Testimonial Actions
export async function addTestimonial(testimonial: any) {
    const db = await getSiteData();
    const newId = Math.max(...db.testimonials.map((t: any) => t.id), 0) + 1;
    db.testimonials.push({ ...testimonial, id: newId });
    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}

export async function deleteTestimonial(id: number) {
    const db = await getSiteData();
    db.testimonials = db.testimonials.filter((t: any) => t.id !== id);
    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}

// Collection Actions
export async function addCollection(name: string) {
    const db = await getSiteData();
    if (!db.collections.includes(name)) {
        db.collections.push(name);
        await updateSiteData(db);
        revalidatePath('/');
        return { success: true };
    }
    return { success: false, error: 'Collection already exists' };
}

export async function updateCollection(oldName: string, newName: string) {
    const db = await getSiteData();
    const index = db.collections.indexOf(oldName);
    if (index !== -1) {
        // Update collection name
        db.collections[index] = newName;

        // Update all products with this category
        db.products = db.products.map((p: any) => {
            if (p.category === oldName) {
                return { ...p, category: newName };
            }
            return p;
        });

        await updateSiteData(db);
        revalidatePath('/');
        return { success: true };
    }
    return { success: false };
}

export async function reorderCollection(name: string, direction: 'up' | 'down') {
    const db = await getSiteData();
    const index = db.collections.indexOf(name);
    if (index === -1) return { success: false };

    if (direction === 'up' && index > 0) {
        [db.collections[index], db.collections[index - 1]] = [db.collections[index - 1], db.collections[index]];
    } else if (direction === 'down' && index < db.collections.length - 1) {
        [db.collections[index], db.collections[index + 1]] = [db.collections[index + 1], db.collections[index]];
    } else {
        return { success: false };
    }

    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}

export async function deleteCollection(name: string) {
    const db = await getSiteData();
    db.collections = db.collections.filter((c: string) => c !== name);
    // Also remove this category from products? Or keep it?
    // Let's keep it on products but they won't show in tabs. Or maybe we should migrate products to 'Featured'?
    // For simplicity, just remove the collection tag.
    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}

// Feature Banner Actions
export async function updateFeatureBanners(data: any) {
    const db = await getSiteData();
    db.featureBanners = data;
    await updateSiteData(db);
    revalidatePath('/');
    return { success: true };
}
