'use client';

import { useState } from 'react';
import { addCollection, deleteCollection, updateCollection, reorderCollection } from '@/actions';
import { Trash2, Plus, Loader2, Tag, Edit2, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    image: string;
    category: string;
}

export default function CollectionManager({ initialCollections, products }: { initialCollections: string[], products: Product[] }) {
    const [collections, setCollections] = useState<string[]>(initialCollections);
    const [newCollection, setNewCollection] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Edit State
    const [editName, setEditName] = useState<string | null>(null); // The original name being edited
    const [editValue, setEditValue] = useState('');

    // Expand State
    const [expanded, setExpanded] = useState<string | null>(null);

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        if (!newCollection.trim()) return;

        setIsLoading(true);
        await addCollection(newCollection);
        setIsLoading(false);
        window.location.reload();
    }

    async function handleUpdate(oldName: string) {
        if (!editValue.trim() || editValue === oldName) {
            setEditName(null);
            return;
        }
        await updateCollection(oldName, editValue);
        window.location.reload();
    }

    async function handleDelete(name: string) {
        if (!confirm(`Delete collection "${name}"?`)) return;
        await deleteCollection(name);
        setCollections(collections.filter(c => c !== name));
    }

    async function handleReorder(name: string, direction: 'up' | 'down') {
        const index = collections.indexOf(name);
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === collections.length - 1) return;

        // Optimistic
        const newCols = [...collections];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newCols[index], newCols[swapIndex]] = [newCols[swapIndex], newCols[index]];
        setCollections(newCols);

        await reorderCollection(name, direction);
    }

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Add New Collection</h3>

                <form onSubmit={handleAdd} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Collection Name (e.g. Best Sellers)"
                        className="flex-1 border p-2 rounded"
                        value={newCollection}
                        onChange={e => setNewCollection(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 flex items-center gap-2 font-medium"
                    >
                        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        Add
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {collections.map((col, index) => {
                        const colProducts = products.filter(p => p.category === col);
                        const isEditing = editName === col;

                        return (
                            <div key={col} className="bg-white hover:bg-gray-50 transition-colors">
                                <div className="p-4 flex items-center gap-4">
                                    {/* Reorder */}
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() => handleReorder(col, 'up')}
                                            disabled={index === 0}
                                            className="text-gray-400 hover:text-black disabled:opacity-20"
                                        >
                                            <ArrowUp className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => handleReorder(col, 'down')}
                                            disabled={index === collections.length - 1}
                                            className="text-gray-400 hover:text-black disabled:opacity-20"
                                        >
                                            <ArrowDown className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <Tag className="w-4 h-4 text-gray-400" />

                                    <div className="flex-1">
                                        {isEditing ? (
                                            <div className="flex gap-2">
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    className="border p-1 rounded px-2"
                                                    value={editValue}
                                                    onChange={e => setEditValue(e.target.value)}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') handleUpdate(col);
                                                        if (e.key === 'Escape') setEditName(null);
                                                    }}
                                                />
                                                <button onClick={() => handleUpdate(col)} className="text-xs bg-green-100 text-green-700 px-2 rounded">Save</button>
                                                <button onClick={() => setEditName(null)} className="text-xs bg-gray-100 text-gray-700 px-2 rounded">Cancel</button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-900">{col}</span>
                                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                                    {colProducts.length} items
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setEditName(col);
                                                setEditValue(col);
                                            }}
                                            className="text-blue-500 hover:bg-blue-50 p-2 rounded"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(col)}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setExpanded(expanded === col ? null : col)}
                                            className="text-gray-400 hover:text-gray-600 p-2 rounded"
                                        >
                                            {expanded === col ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expanded === col && (
                                    <div className="bg-gray-50 p-4 pl-12 border-t border-gray-100">
                                        {colProducts.length > 0 ? (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {colProducts.map(p => (
                                                    <div key={p.id} className="flex gap-3 items-center bg-white p-2 rounded border border-gray-100">
                                                        <div className="relative w-10 h-10 rounded overflow-hidden">
                                                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                                                        </div>
                                                        <span className="text-xs font-medium truncate">{p.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">No products in this collection.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {collections.length === 0 && (
                        <div className="p-8 text-center text-gray-500">No collections found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
