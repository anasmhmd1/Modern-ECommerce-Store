'use client';

import { useState } from 'react';
import { addProduct, deleteProduct, updateProduct, reorderProduct } from '@/actions';
import { uploadImage } from '@/actions/upload';
import { Trash2, Plus, Loader2, Edit2, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    details?: string;
    images?: string[];
}

export default function ProductManager({ initialProducts, categories }: { initialProducts: Product[], categories: string[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Form State
    const [editId, setEditId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState(categories[0] || 'Featured');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState('');
    const [galleryImages, setGalleryImages] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    function resetForm() {
        setEditId(null);
        setName('');
        setPrice('');
        setImage('');
        setCategory(categories[0] || 'Featured');
        setDescription('');
        setDetails('');
        setGalleryImages([]);
        setIsFormOpen(false);
    }

    function openEdit(product: Product) {
        setEditId(product.id);
        setName(product.name);
        setPrice(product.price.toString());
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description || '');
        setDetails(product.details || '');
        setGalleryImages(product.images || []);
        setIsFormOpen(true);
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        const res = await uploadImage(formData);
        if (res.success && res.url) {
            setImage(res.url);
        } else {
            alert('Upload failed');
        }
        setIsUploading(false);
    }

    async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        const res = await uploadImage(formData);
        if (res.success && res.url) {
            setGalleryImages([...galleryImages, res.url]);
        } else {
            alert('Upload failed');
        }
        setIsUploading(false);
    }

    function removeGalleryImage(index: number) {
        setGalleryImages(galleryImages.filter((_, i) => i !== index));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const productData = {
            name,
            price: parseFloat(price),
            image,
            category,
            description,
            details,
            images: galleryImages
        };

        if (editId) {
            await updateProduct(editId, productData);
        } else {
            await addProduct(productData);
        }

        window.location.reload();
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure?')) return;
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
    }

    async function handleReorder(id: number, direction: 'up' | 'down') {
        const index = products.findIndex(p => p.id === id);
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === products.length - 1) return;

        // Optimistic UI
        const newProducts = [...products];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newProducts[index], newProducts[swapIndex]] = [newProducts[swapIndex], newProducts[index]];
        setProducts(newProducts);

        await reorderProduct(id, direction);
    }

    return (
        <div className="space-y-8">
            {/* Add/Edit Form */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{editId ? 'Edit Product' : 'Add New Product'}</h3>
                    <button
                        onClick={() => isFormOpen ? resetForm() : setIsFormOpen(true)}
                        className="text-sm text-primary hover:underline"
                    >
                        {isFormOpen ? 'Cancel' : 'Add New'}
                    </button>
                </div>

                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="border p-2 rounded w-full"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    className="border p-2 rounded w-full"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    required
                                />
                                <select
                                    className="border p-2 rounded w-full"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                >
                                    {categories.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <textarea
                                placeholder="Description"
                                className="border p-2 rounded w-full h-32"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />

                            <textarea
                                placeholder="Details / Specs (optional)"
                                className="border p-2 rounded w-full h-20"
                                value={details}
                                onChange={e => setDetails(e.target.value)}
                            />
                        </div>

                        <div className="space-y-4">
                            {/* Main Image Upload */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium text-gray-700">Main Image</label>
                                <div className="flex items-start gap-4">
                                    {image && (
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                            <Image src={image} alt="Preview" fill className="object-cover" />
                                        </div>
                                    )}

                                    <label className="flex-1 border-2 border-dashed border-gray-300 hover:border-black rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100 h-24">
                                        {isUploading ? (
                                            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                        ) : (
                                            <span className="text-sm font-medium text-gray-600">Change Main Image</span>
                                        )}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Gallery Upload */}
                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {galleryImages.map((img, i) => (
                                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                            <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(i)}
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="aspect-square border-2 border-dashed border-gray-300 hover:border-black rounded-lg flex items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100">
                                        <Plus className="w-6 h-6 text-gray-400" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleGalleryUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={isLoading || isUploading || !image}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 w-full justify-center md:w-auto"
                            >
                                {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : (editId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                                {editId ? 'Update Product' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Order</th>
                            <th className="p-4 font-medium text-gray-500">Image</th>
                            <th className="p-4 font-medium text-gray-500">Name</th>
                            <th className="p-4 font-medium text-gray-500">Price</th>
                            <th className="p-4 font-medium text-gray-500">Category</th>
                            <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product, index) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="p-4 flex flex-col gap-1 items-center justify-center">
                                    <button
                                        onClick={() => handleReorder(product.id, 'up')}
                                        disabled={index === 0}
                                        className="text-gray-400 hover:text-black disabled:opacity-20"
                                    >
                                        <ArrowUp className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleReorder(product.id, 'down')}
                                        disabled={index === products.length - 1}
                                        className="text-gray-400 hover:text-black disabled:opacity-20"
                                    >
                                        <ArrowDown className="w-4 h-4" />
                                    </button>
                                </td>
                                <td className="p-4">
                                    <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 border border-gray-200">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{product.name}</td>
                                <td className="p-4">${product.price.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs uppercase tracking-wider">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => openEdit(product)}
                                            className="text-blue-500 hover:bg-blue-50 p-2 rounded"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
