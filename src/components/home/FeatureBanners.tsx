import Image from "next/image";
import Link from "next/link";

interface FeatureBannersProps {
    data: {
        left: {
            image: string;
            title: string;
            btnText: string;
            link: string;
        };
        middle: {
            subtitle: string;
            title: string;
            text: string;
            btnText: string;
            link: string;
        };
        rightImages: string[];
    }
}

export default function FeatureBanners({ data }: FeatureBannersProps) {
    if (!data) return null;

    return (
        <section className="container mx-auto px-4 md:px-12 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[500px]">

                {/* Left: Collection Summer */}
                <div className="md:col-span-1 relative group overflow-hidden h-full min-h-[300px]">
                    <Image
                        src={data.left.image}
                        alt="Left Banner"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
                        <h3 className="text-3xl font-serif text-white mb-6 drop-shadow-md whitespace-pre-line">{data.left.title}</h3>
                        <Link href={data.left.link}>
                            <button className="bg-white text-black px-6 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                                {data.left.btnText}
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Middle: Big Sale */}
                <div className="md:col-span-1 bg-[#F9D678] flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px]">
                    <span className="text-sm uppercase tracking-[0.2em] mb-4">{data.middle.subtitle}</span>
                    <h3 className="text-5xl font-serif font-bold mb-4 whitespace-pre-line">{data.middle.title}</h3>
                    <p className="text-sm mb-8 max-w-[150px] leading-relaxed">{data.middle.text}</p>
                    <Link href={data.middle.link}>
                        <button className="border-b border-black pb-1 text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors">
                            {data.middle.btnText}
                        </button>
                    </Link>
                </div>

                {/* Right: Grid of 6 */}
                <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                    {data.rightImages.map((src, i) => (
                        <div key={i} className="relative bg-gray-50 flex items-center justify-center overflow-hidden group">
                            <Image
                                src={src}
                                alt="Product"
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
