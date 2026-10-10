import Hero from "@/components/home/Hero";
import FeatureBanners from "@/components/home/FeatureBanners";
import ProductGrid from "@/components/home/ProductGrid";
import Testimonials from "@/components/home/Testimonials";
import TrustIcons from "@/components/home/TrustIcons";
import { fetchSiteData } from "@/actions";

export default async function Home() {
  const data = await fetchSiteData();

  if (!data) {
    return <div>Loading...</div>; // Or handle error gracefully
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Hero slides={data.hero} />
      <FeatureBanners data={data.featureBanners} />
      <ProductGrid products={data.products} tabs={data.collections} />
      <Testimonials testimonials={data.testimonials} />
      <TrustIcons />
    </main>
  );
}
