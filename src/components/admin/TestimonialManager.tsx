'use client';

import { useState } from 'react';
import { addTestimonial, deleteTestimonial } from '@/actions';
import { Trash2, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    text: string;
    image: string;
}

export default function TestimonialManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [isAdding, setIsAdding] = useState(false);

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('/images/testimonial_claudia_1769307541557.png');
    const [isLoading, setIsLoading] = useState(false);

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        const newItem = {
            name,
            location,
            text,
            image
        };

        await addTestimonial(newItem);
        window.location.reload();
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure?')) return;
        await deleteTestimonial(id);
        setTestimonials(testimonials.filter(t => t.id !== id));
    }

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Add New Testimonial</h3>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="text-sm text-primary hover:underline"
                    >
                        {isAdding ? 'Cancel' : 'Open Form'}
                    </button>
                </div>

                {isAdding && (
                    <form onSubmit={handleAdd} className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="border p-2 rounded"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                className="border p-2 rounded"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                required
                            />
                        </div>
                        <textarea
                            placeholder="Quote text..."
                            className="border p-2 rounded w-full"
                            rows={3}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            className="border p-2 rounded"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                            required
                        />
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                Add Testimonial
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-200 relative">
                        <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 text-red-500 p-2 hover:bg-red-50 rounded">
                            <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold">{item.name}</h4>
                                <p className="text-xs text-gray-500">{item.location}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 italic">"{item.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
