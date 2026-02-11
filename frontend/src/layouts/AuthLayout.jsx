import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Skill Swap
                        </h1>
                        <p className="text-gray-600 mt-2">Trade knowledge, not money.</p>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
