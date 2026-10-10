import Link from 'next/link';
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, MessageSquare, Home, Tag, LogOut, Megaphone } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-serif font-bold text-gray-900">Admin</h1>
                </div>
                <nav className="px-4 space-y-1">
                    <Link
                        href="/admin"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/hero"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                    >
                        <ImageIcon className="w-5 h-5 mr-3" />
                        Hero Slides
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                    >
                        <ShoppingBag className="w-5 h-5 mr-3" />
                        Products
                    </Link>
                    <Link
                        href="/admin/testimonials"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                    >
                        <MessageSquare className="w-5 h-5 mr-3" />
                        Testimonials
                    </Link>
                    <Link
                        href="/admin/collections"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                    >
                        <Tag className="w-5 h-5 mr-3" />
                        Collections
                    </Link>
                    <Link
                        href="/admin/banners"
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                    >
                        <Megaphone className="w-5 h-5 mr-3" />
                        Feature Banners
                    </Link>
                    <div className="my-4 border-t border-gray-100"></div>
                    <Link
                        href="/"
                        className="flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                    >
                        <Home className="w-5 h-5 mr-3" />
                        View Site
                    </Link>
                    <form action={async () => {
                        'use server';
                        await import('@/actions/auth').then(m => m.logout());
                    }}>
                        <button className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    </form>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
