import { fetchSiteData } from "@/actions";
import HeroManager from "@/components/admin/HeroManager";

export default async function AdminHeroPage() {
    const data = await fetchSiteData();

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Hero Slides</h2>
            </div>
            <HeroManager initialSlides={data.hero} collections={data.collections} />
        </div>
    );
}
