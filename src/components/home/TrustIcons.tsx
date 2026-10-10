import { Truck, Headset, RefreshCw, Gift } from "lucide-react";

export default function TrustIcons() {
    const items = [
        { icon: Truck, title: "Free Shipping", desc: "On all orders over $200" },
        { icon: Headset, title: "Support 24/7", desc: "Dedicated support" },
        { icon: RefreshCw, title: "Money Back", desc: "30 day guarantee" },
        { icon: Gift, title: "Gift Voucher", desc: "For your loved ones" },
    ];

    return (
        <section className="bg-white border-t border-gray-100 py-16">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {items.map((Item, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                            <div className="p-3 border border-gray-200 rounded-full text-gray-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                                <Item.icon size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 group-hover:text-primary transition-colors">{Item.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{Item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
