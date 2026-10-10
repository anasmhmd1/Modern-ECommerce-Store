import { fetchSiteData } from "@/actions";

export default async function AdminDashboard() {
    const data = await fetchSiteData();

    if (!data) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Card 1 */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Products</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{data.products.length}</p>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Hero Slides</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{data.hero.length}</p>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Testimonials</h3>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{data.testimonials.length}</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mt-8">
                <h3 className="text-lg font-bold mb-4">Quick Start</h3>
                <p className="text-gray-600 mb-4">Select a section from the sidebar to start managing your website content directly.</p>
            </div>
        </div>
    );
}
