'use client';

import { useState } from 'react';
import { updateFeatureBanners } from '@/actions';
import { uploadImage } from '@/actions/upload';
import { Loader2, Upload, Save } from 'lucide-react';
import Image from 'next/image';

export default function BannerManager({ initialData, collections }: { initialData: any, collections: string[] }) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Initial state for selectors based on current links
    const getCollectionFromLink = (link: string) => {
        if (!link) return collections[0] || 'Featured';
        const match = link.match(/collection=([^&]*)/);
        return match ? decodeURIComponent(match[1]) : (collections[0] || 'Featured');
    };

    const [leftCollection, setLeftCollection] = useState(getCollectionFromLink(initialData.left.link));
    const [middleCollection, setMiddleCollection] = useState(getCollectionFromLink(initialData.middle.link));

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, path: string) {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        const res = await uploadImage(formData);
        if (res.success && res.url) {
            // Update nested path
            const newData = JSON.parse(JSON.stringify(data));
            if (path.startsWith('rightImages[')) {
                const index = parseInt(path.match(/\d+/)?.[0] || '0');
                newData.rightImages[index] = res.url;
            } else if (path === 'left.image') {
                newData.left.image = res.url;
            }
            setData(newData);
        } else {
            alert('Upload failed');
        }
        setIsUploading(false);
    }

    function handleChange(path: string, value: string) {
        const newData = JSON.parse(JSON.stringify(data));
        const keys = path.split('.');
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setData(newData);
    }

    // Special handler for collection changes
    function handleCollectionChange(section: 'left' | 'middle', collection: string) {
        const newData = JSON.parse(JSON.stringify(data));
        const link = `/?collection=${encodeURIComponent(collection)}`;

        if (section === 'left') {
            setLeftCollection(collection);
            newData.left.link = link;
        } else {
            setMiddleCollection(collection);
            newData.middle.link = link;
        }
        setData(newData);
    }

    async function handleSave() {
        setIsLoading(true);
        await updateFeatureBanners(data);
        setIsLoading(false);
        alert('Saved successfully!');
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2 fixed bottom-6 right-6 z-50 shadow-lg"
                >
                    {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            {/* Left Banner */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">Left Banner (Image & Text)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title (use \n for line break)</label>
                        <textarea
                            className="border p-2 rounded w-full h-24"
                            value={data.left.title}
                            onChange={e => handleChange('left.title', e.target.value)}
                        />
                        <label className="block text-sm font-medium mb-1 mt-4">Button Text</label>
                        <input
                            className="border p-2 rounded w-full"
                            value={data.left.btnText}
                            onChange={e => handleChange('left.btnText', e.target.value)}
                        />
                        <label className="block text-sm font-medium mb-1 mt-4">Target Collection</label>
                        <select
                            className="border p-2 rounded w-full"
                            value={leftCollection}
                            onChange={e => handleCollectionChange('left', e.target.value)}
                        >
                            {collections.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Background Image</label>
                        <div className="relative h-48 bg-gray-100 rounded overflow-hidden mb-2 border">
                            <Image src={data.left.image} alt="Left Banner" fill className="object-cover" />
                        </div>
                        <label className="block w-full text-center bg-gray-100 hover:bg-gray-200 p-2 rounded cursor-pointer transition-colors">
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : <span className="text-sm">Change Image</span>}
                            <input type="file" className="hidden" accept="image/*" onChange={e => handleUpload(e, 'left.image')} disabled={isUploading} />
                        </label>
                    </div>
                </div>
            </div>

            {/* Middle Banner */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm bg-[#FFF8E1]">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">Middle Banner (Yellow)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Subtitle</label>
                        <input
                            className="border p-2 rounded w-full"
                            value={data.middle.subtitle}
                            onChange={e => handleChange('middle.subtitle', e.target.value)}
                        />
                        <label className="block text-sm font-medium mb-1 mt-4">Title</label>
                        <textarea
                            className="border p-2 rounded w-full h-24"
                            value={data.middle.title}
                            onChange={e => handleChange('middle.title', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Body Text</label>
                        <textarea
                            className="border p-2 rounded w-full h-24"
                            value={data.middle.text}
                            onChange={e => handleChange('middle.text', e.target.value)}
                        />
                        <label className="block text-sm font-medium mb-1 mt-4">Button Text</label>
                        <input
                            className="border p-2 rounded w-full"
                            value={data.middle.btnText}
                            onChange={e => handleChange('middle.btnText', e.target.value)}
                        />
                        <label className="block text-sm font-medium mb-1 mt-4">Target Collection</label>
                        <select
                            className="border p-2 rounded w-full"
                            value={middleCollection}
                            onChange={e => handleCollectionChange('middle', e.target.value)}
                        >
                            {collections.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Right Images */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">Right Grid (6 Images)</h3>
                <div className="grid grid-cols-3 gap-4">
                    {data.rightImages.map((img: string, i: number) => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="relative h-24 bg-gray-100 rounded overflow-hidden border">
                                <Image src={img} alt={`Grid ${i}`} fill className="object-cover" />
                            </div>
                            <label className="block w-full text-center bg-gray-50 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors text-xs border">
                                {isUploading ? <Loader2 className="w-3 h-3 animate-spin inline" /> : "Change"}
                                <input type="file" className="hidden" accept="image/*" onChange={e => handleUpload(e, `rightImages[${i}]`)} disabled={isUploading} />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
