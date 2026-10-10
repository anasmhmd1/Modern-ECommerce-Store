import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full bg-white z-50 relative">
            {/* Top Bar */}
            <div className="bg-secondary text-[11px] uppercase tracking-widest py-2 px-4 md:px-12 flex justify-between items-center text-gray-500 font-medium border-b border-gray-100">
                <div className="flex gap-6">
                    <span className="cursor-pointer hover:text-accent transition-colors">Express Delivery</span>
                    <span className="cursor-pointer hover:text-accent transition-colors">Help & Advice</span>
                </div>
                <div className="cursor-pointer hover:text-accent transition-colors">
                    USD &nbsp;|&nbsp; Welcome Login
                </div>
            </div>

            {/* Main Header */}
            <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 md:px-12 bg-white">
                {/* Search - Left on Desktop */}
                <div className="w-full md:w-1/3 flex justify-start mb-4 md:mb-0">
                    <Search className="w-5 h-5 text-gray-800 cursor-pointer hover:text-primary transition-colors" />
                </div>

                {/* Logo */}
                <Link href="/" className="w-full md:w-1/3 text-center mb-4 md:mb-0 group">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-accent group-hover:opacity-80 transition-opacity">
                        Cosmetica
                    </h1>
                </Link>

                {/* Icons */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-end gap-6 text-gray-800">
                    <User className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                    <Heart className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                    <div className="relative cursor-pointer hover:text-primary transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            {/* Navbar */}
            <nav className="hidden md:flex justify-center gap-10 py-5 text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 border-t border-b border-gray-50/50">
                {[
                    { label: 'Home', href: '/' },
                    { label: 'Product', href: '/products' },
                    { label: 'Collection', href: '/?collection=Featured' },
                    { label: 'Pages', href: '#' },
                    { label: 'Blog', href: '#' }
                ].map((item) => (
                    <Link key={item.label} href={item.href} className="hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all hover:after:w-full">
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
