import { fetchSiteData } from "@/actions";
import TestimonialManager from "@/components/admin/TestimonialManager";

export default async function AdminTestimonialsPage() {
    const data = await fetchSiteData();

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Testimonials</h2>
            </div>
            <TestimonialManager initialTestimonials={data.testimonials} />
        </div>
    );
}
