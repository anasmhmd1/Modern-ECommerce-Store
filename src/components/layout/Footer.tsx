export default function Footer() {
    return (
        <footer className="bg-[#fcfcfc] border-t border-gray-100 pt-20 pb-10 font-sans">
            <div className="container mx-auto px-4 md:px-12">

                {/* Newsletter - Centered */}
                <div className="max-w-xl mx-auto text-center mb-20">
                    <h3 className="text-3xl font-serif mb-2">Newsletter</h3>
                    <p className="text-gray-500 mb-8 italic">Get 15% off your first purchace! Plus, be the first to know about sales, new product launches and exclusive offers!</p>
                    <form className="flex gap-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 bg-transparent border-b border-gray-300 py-3 px-2 focus:outline-none focus:border-black transition-colors"
                        />
                        <button className="text-xs font-bold uppercase tracking-widest border-b border-black px-4 hover:text-primary hover:border-primary transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-serif font-bold mb-6">Cosmetica</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            A high-end beauty brand committed to organic ingredients and sustainable luxury.
                        </p>
                        <div className="flex gap-4 text-gray-400">
                            {/* Social icons placeholders */}
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">IG</div>
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">FB</div>
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer">TW</div>
                        </div>
                    </div>

                    {/* About Us */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6">About Us</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li className="hover:text-black cursor-pointer transition-colors">Our Story</li>
                            <li className="hover:text-black cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-black cursor-pointer transition-colors">Sustainability</li>
                            <li className="hover:text-black cursor-pointer transition-colors">Press</li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6">Information</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li className="hover:text-black cursor-pointer transition-colors">Delivery Information</li>
                            <li className="hover:text-black cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-black cursor-pointer transition-colors">Terms & Conditions</li>
                            <li className="hover:text-black cursor-pointer transition-colors">Returns</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6">Contact</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li>(123) 456-7890</li>
                            <li>support@cosmetica.com</li>
                            <li>123 Luxury Ave, New York, NY 10012</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>&copy; 2024 Cosmetica. All Rights Reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>Privacy & Cookies</span>
                        <span>Terms of Use</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
