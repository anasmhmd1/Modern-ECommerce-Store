"use client";

import { useState, useEffect } from "react";
import ProductCard from "../ui/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface ProductGridProps {
    products: Product[];
    tabs: string[];
}

export default function ProductGrid({ products, tabs }: ProductGridProps) {
    const searchParams = useSearchParams();
    const collectionParam = searchParams.get('collection');

    // If collectionParam is valid, use it; otherwise use default
    // If no param, default to "All" instead of "Featured" to show everything initially? 
    // Or keep "Featured" as default? Let's use "All" if user wants "All".
    // Actually user might prefer "Featured" as default landing. Let's stick to "Featured" or first tab.
    // User asked "Make a list with all products". This implies an option.

    // Create tabs list with 'All' at the start
    const allTabs = ['All', ...tabs];

    // Check if filtering by "All"
    // User requested: "When scrolling down, find 'All Product' in front, not first collection". 
    // So default should be "All".
    const initialTab = collectionParam && allTabs.includes(collectionParam) ? collectionParam : "All";

    const [activeTab, setActiveTab] = useState(initialTab);

    // Sync state if URL changes
    useEffect(() => {
        if (collectionParam && allTabs.includes(collectionParam)) {
            setActiveTab(collectionParam);
            const element = document.getElementById('product-grid');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [collectionParam, allTabs]);

    const displayProducts = activeTab === 'All'
        ? products
        : products.filter(p => p.category === activeTab);

    return (
        <section id="product-grid" className="container mx-auto px-4 md:px-12 py-20">
            <div className="flex flex-col items-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">Tranding Item</h2>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-8 text-sm uppercase tracking-widest text-gray-500">
                    {allTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 relative transition-colors ${activeTab === tab ? "text-primary" : "hover:text-black"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            >
                <AnimatePresence>
                    {displayProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
