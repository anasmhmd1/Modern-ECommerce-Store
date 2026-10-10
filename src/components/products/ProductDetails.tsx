'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Star, Share2, Heart, Check } from 'lucide-react';

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

export default function ProductDetails({ product }: { product: Product }) {
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [quantity, setQuantity] = useState(1);

    // Combine main image with gallery
    const allImages = [product.image, ...(product.images || [])];

    return (
        <section className="container mx-auto px-4 md:px-12 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Images Section */}
                <div className="space-y-4">
                    <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 right-4 z-10">
                            <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
                                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                            </button>
                        </div>
                    </div>

                    {allImages.length > 1 && (
                        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 uppercase tracking-wider">
                        <span>{product.category}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <Star className="w-4 h-4 fill-yellow-400" />
                            <span className="text-gray-400 ml-1">(25 Reviews)</span>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
                        {product.description || "Experience the luxury of nature with our scientifically formulated beauty essentials. Designed to nourish and rejuvenate, giving you that radiant glow you deserve."}
                    </p>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                -
                            </button>
                            <span className="px-4 py-3 min-w-[3rem] text-center font-medium">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <button className="flex-1 bg-black text-white px-8 py-3.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>

                    {product.details && (
                        <div className="bg-gray-50 p-6 rounded-lg mb-8">
                            <h3 className="font-bold mb-2 text-sm uppercase tracking-wide">Product Details</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-line">{product.details}</p>
                        </div>
                    )}

                    <div className="flex gap-4 text-xs font-medium uppercase tracking-widest text-gray-500">
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Free Shipping
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Secure Payment
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
