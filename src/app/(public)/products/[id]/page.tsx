import { fetchSiteData } from "@/actions";
import ProductDetails from "@/components/products/ProductDetails";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const data = await fetchSiteData();
    const product = data?.products.find((p: any) => p.id === parseInt(id));

    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | Cosmetica`,
        description: product.description || `Buy ${product.name} at Cosmetica.`,
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const data = await fetchSiteData();
    const product = data?.products.find((p: any) => p.id === parseInt(id));

    if (!product) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <ProductDetails product={product} />
        </main>
    );
}
