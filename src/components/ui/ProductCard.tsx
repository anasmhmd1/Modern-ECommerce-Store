import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingCart } from "lucide-react";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductProps) {
    return (
        <div className="group">
            <div className="relative overflow-hidden mb-4 bg-gray-100 aspect-[3/4]">
                <Link href={`/products/${id}`}>
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Overlay actions */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg">
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                    <Link href={`/products/${id}`}>
                        <button className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg">
                            <Eye className="w-4 h-4" />
                        </button>
                    </Link>
                    <button className="bg-white p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-lg">
                        <Heart className="w-4 h-4" />
                    </button>
                </div>

                {category && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                        {category}
                    </span>
                )}
            </div>

            <div className="text-center">
                <Link href={`/products/${id}`}>
                    <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors cursor-pointer">{name}</h3>
                </Link>
                <p className="text-gray-500 text-sm">${price.toFixed(2)}</p>
            </div>
        </div>
    );
}
