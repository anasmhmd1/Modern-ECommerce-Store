'use client';

import ProductCard from "../ui/ProductCard";
import { motion } from "framer-motion";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

export default function AllProductsGrid({ products }: { products: Product[] }) {
    return (
        <section className="container mx-auto px-4 md:px-12 py-20">
            <div className="flex flex-col items-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">All Products</h2>
                <p className="text-gray-500 text-center max-w-xl">Browse our complete collection of luxury beauty products.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            >
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </motion.div>

            {products.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    No products found.
                </div>
            )}
        </section>
    );
}
