import { fetchSiteData } from "@/actions";
import ProductManager from "@/components/admin/ProductManager";

export default async function AdminProductsPage() {
    const data = await fetchSiteData();

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Products</h2>
            </div>
            <ProductManager initialProducts={data.products} categories={data.collections} />
        </div>
    );
}
