"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Slide {
    id: number;
    image: string;
    subtitle: string;
    title: string;
    cta: string;
    collection?: string;
}

interface HeroProps {
    slides: Slide[];
}

export default function Hero({ slides }: HeroProps) {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    if (!slides || slides.length === 0) return null;

    return (
        <section className="relative w-full h-[650px] overflow-hidden bg-[#F9F9F9]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="container mx-auto h-full flex flex-col md:flex-row items-center px-4 md:px-12">
                        {/* Text Content */}
                        <div className="w-full md:w-1/2 z-10 space-y-6 pt-12 md:pt-0">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-primary tracking-[0.2em] uppercase text-sm font-semibold"
                            >
                                {slides[current].subtitle}
                            </motion.span>
                            <motion.h2
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-5xl md:text-7xl font-serif font-medium leading-tight text-accent whitespace-pre-line"
                            >
                                {slides[current].title}
                            </motion.h2>
                            <Link href={`/?collection=${encodeURIComponent(slides[current].collection || 'Featured')}`}>
                                <motion.button
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="mt-8 px-8 py-4 bg-accent text-white text-xs uppercase tracking-widest hover:bg-primary transition-colors duration-300"
                                >
                                    {slides[current].cta}
                                </motion.button>
                            </Link>
                        </div>

                        {/* Image Content */}
                        <div className="w-full md:w-1/2 h-full relative">
                            <Image
                                src={slides[current].image}
                                alt={slides[current].title}
                                fill
                                className="object-contain md:object-cover mask-image-linear-gradient"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation & Pagination */}
            <div className="absolute bottom-10 left-12 md:left-24 flex items-center gap-12 z-20">
                {/* Pagination Number */}
                <div className="text-xl font-serif text-gray-400">
                    <span className="text-accent">0{current + 1}</span>  _  0{slides.length}
                </div>

                {/* Arrows */}
                <div className="flex gap-4">
                    <button onClick={prevSlide} className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all rounded-full">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextSlide} className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all rounded-full">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
