'use client';

import { useState } from 'react';
import { addHeroSlide, deleteHeroSlide, updateHeroSlide, reorderHero } from '@/actions';
import { uploadImage } from '@/actions/upload';
import { Trash2, Plus, Loader2, Edit2, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface HeroSlide {
    id: number;
    image: string;
    subtitle: string;
    title: string;
    cta: string;
    collection?: string;
}

export default function HeroManager({ initialSlides, collections }: { initialSlides: HeroSlide[], collections: string[] }) {
    const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Form State
    const [editId, setEditId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [cta, setCta] = useState('');
    const [image, setImage] = useState('');
    const [collection, setCollection] = useState(collections[0] || 'Featured');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    function resetForm() {
        setEditId(null);
        setTitle('');
        setSubtitle('');
        setCta('');
        setImage('');
        setCollection(collections[0] || 'Featured');
        setIsFormOpen(false);
    }

    function openEdit(slide: HeroSlide) {
        setEditId(slide.id);
        setTitle(slide.title);
        setSubtitle(slide.subtitle);
        setCta(slide.cta);
        setImage(slide.image);
        setCollection(slide.collection || collections[0] || 'Featured');
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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const slideData = {
            title,
            subtitle,
            cta,
            image,
            collection
        };

        if (editId) {
            await updateHeroSlide(editId, slideData);
        } else {
            await addHeroSlide(slideData);
        }

        window.location.reload();
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure?')) return;
        await deleteHeroSlide(id);
        setSlides(slides.filter(s => s.id !== id));
    }

    async function handleReorder(id: number, direction: 'up' | 'down') {
        const index = slides.findIndex(s => s.id === id);
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === slides.length - 1) return;

        // Optimistic UI
        const newSlides = [...slides];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newSlides[index], newSlides[swapIndex]] = [newSlides[swapIndex], newSlides[index]];
        setSlides(newSlides);

        await reorderHero(id, direction);
    }

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{editId ? 'Edit Slide' : 'Add New Slide'}</h3>
                    <button
                        onClick={() => isFormOpen ? resetForm() : setIsFormOpen(true)}
                        className="text-sm text-primary hover:underline"
                    >
                        {isFormOpen ? 'Cancel' : 'Add New'}
                    </button>
                </div>

                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Subtitle (e.g. New Arrival)"
                            className="border p-2 rounded"
                            value={subtitle}
                            onChange={e => setSubtitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Title"
                            className="border p-2 rounded"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="CTA Button Text"
                            className="border p-2 rounded"
                            value={cta}
                            onChange={e => setCta(e.target.value)}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Collection</label>
                            <select
                                className="border p-2 rounded w-full"
                                value={collection}
                                onChange={e => setCollection(e.target.value)}
                            >
                                {collections.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-2 flex flex-col gap-3">
                            <label className="block text-sm font-medium text-gray-700">Slide Image</label>

                            <div className="flex items-start gap-4">
                                {image && (
                                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                        <Image src={image} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}

                                <label className="flex-1 border-2 border-dashed border-gray-300 hover:border-black rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-gray-100">
                                    {isUploading ? (
                                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm font-medium text-gray-600">Click to upload image</span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                                        </>
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

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={isLoading || isUploading || !image}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 w-full justify-center md:w-auto"
                            >
                                {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : (editId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                                {editId ? 'Update Slide' : 'Add Slide'}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Reorder Buttons */}
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => handleReorder(slide.id, 'up')}
                                    disabled={index === 0}
                                    className="text-gray-400 hover:text-black disabled:opacity-20"
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleReorder(slide.id, 'down')}
                                    disabled={index === slides.length - 1}
                                    className="text-gray-400 hover:text-black disabled:opacity-20"
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="relative w-32 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                            </div>
                            <div>
                                <p className="text-xs uppercase text-gray-500 tracking-wider flex items-center gap-2">
                                    {slide.subtitle}
                                    {slide.collection && (
                                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] normal-case tracking-normal">
                                            Links to: {slide.collection}
                                        </span>
                                    )}
                                </p>
                                <h4 className="font-serif font-bold whitespace-pre-line">{slide.title}</h4>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => openEdit(slide)}
                                className="text-blue-500 hover:bg-blue-50 p-2 rounded"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(slide.id)} className="text-red-500 p-2 hover:bg-red-50 rounded">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
