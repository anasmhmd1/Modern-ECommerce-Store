import { fetchSiteData } from "@/actions";
import CollectionManager from "@/components/admin/CollectionManager";

export default async function AdminCollectionsPage() {
    const data = await fetchSiteData();

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Collections</h2>
            </div>
            <CollectionManager initialCollections={data.collections} products={data.products} />
        </div>
    );
}
