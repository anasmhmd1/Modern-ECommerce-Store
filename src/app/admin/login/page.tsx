'use client';

import { login } from '@/actions/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const res = await login(formData);
        if (res.success) {
            router.push('/admin');
        } else {
            setError(res.error || 'Login failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-gray-100 rounded-full">
                        <Lock className="w-8 h-8 text-gray-700" />
                    </div>
                </div>
                <h1 className="text-2xl font-serif font-bold text-center text-gray-900 mb-6">Admin Access</h1>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
