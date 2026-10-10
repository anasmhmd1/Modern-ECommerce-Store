import { fetchSiteData } from "@/actions";
import BannerManager from "@/components/admin/BannerManager";

export default async function AdminBannersPage() {
    const data = await fetchSiteData();

    if (!data) return <div>Loading...</div>;

    // Ensure structure exists (fallback to default if db is empty or old)
    const banners = data.featureBanners || {
        left: { image: "", title: "", btnText: "", link: "" },
        middle: { subtitle: "", title: "", text: "", btnText: "", link: "" },
        rightImages: ["", "", "", "", "", ""]
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Feature Banners</h2>
            </div>
            <BannerManager initialData={banners} collections={data.collections} />
        </div>
    );
}
