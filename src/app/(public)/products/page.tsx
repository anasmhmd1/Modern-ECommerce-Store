import AllProductsGrid from "@/components/products/AllProductsGrid";
import { fetchSiteData } from "@/actions";

export const metadata = {
    title: 'All Products | Cosmetica',
    description: 'Browse our complete collection of luxury beauty products.',
};

export default async function ProductsPage() {
    const data = await fetchSiteData();

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <main className="min-h-screen bg-white text-gray-900 pt-20">
            <AllProductsGrid products={data.products} />
        </main>
    );
}
