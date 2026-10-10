import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    location: string;
    text: string;
    image: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="container mx-auto px-4 md:px-12 py-24 border-t border-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                {testimonials.map((item) => (
                    <div key={item.id} className="flex flex-col items-center text-center">
                        <div className="relative w-24 h-24 mb-6">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-full border-2 border-gray-100 p-1"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-sm border border-gray-100">
                                <Quote size={12} className="text-primary" />
                            </div>
                        </div>
                        <p className="text-gray-600 italic font-serif text-lg leading-relaxed mb-6 max-w-md">
                            "{item.text}"
                        </p>
                        <h4 className="text-sm font-bold uppercase tracking-widest">{item.name}</h4>
                        <span className="text-xs text-gray-400 mt-1">{item.location}</span>
                    </div>
                ))}

            </div>
        </section>
    );
}
