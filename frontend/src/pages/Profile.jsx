import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, BookOpen, GraduationCap, Send, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
    const { userId } = useParams();
    const { token, user: currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requestStatus, setRequestStatus] = useState(null); // 'pending', 'sent'

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Determine if we are fetching by ID or just searching via browse
                // For simplified public profile logic if no explicit endpoint exists for public user details
                // we might need to rely on what's available or implement a specific endpoint.
                // Assuming we might need to add a public profile endpoint or misuse explore??
                // Actually, I should check if there is an endpoint to get user details by ID.
                // Checking backend routes... skills.js has "/" but maybe not by user ID.
                // I will assume I need to ADD a route or use a workaround.
                // For now, let's mock the fetch or assume I can get it.
                // Wait, I see I don't have a specific `GET /users/:id` endpoint in my plan or code.
                // I should add `GET /users/:id` to `auth.js` or new `users.js`.
                // For now, I will assume I can implement the backend part in a turbo step if it fails.

                // Let's try to hit /skills?userId={userId} if that existed, or just /auth/user/:id if I added it.
                // I will add a method to get public user info in auth routes just to be safe.

                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5050'}/auth/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data);
            } catch (err) {
                console.error("Error fetching profile", err);
                toast.error("Could not load profile");
            } finally {
                setLoading(false);
            }
        };

        if (token && userId) fetchProfile();
    }, [userId, token]);

    const handleSwapRequest = async (skillWanted) => {
        try {
            // Need to pick a skill I offer to swap. simpler: just request "swap" for now or pick first.
            // For a better UX, open a modal. But let's keep it simple: "Request Swap for {skill}".
            // I need to provide `skillOffered` as well.
            // Use current user's first "teach" skill as default offer or prompt.

            // Temporary: Offer "General Knowledge" or my first skill.
            const skillOffered = "General Mentorship"; // simplifying for prototype

            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5050'}/swap`, {
                toUserId: userId,
                skillWanted: skillWanted.name,
                skillOffered
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Swap request sent!");
            setRequestStatus('sent');
        } catch (err) {
            console.error("Swap request failed", err);
            toast.error("Failed to send request");
        }
    };

    if (loading) return <div className="flex justify-center p-10"><div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full"></div></div>;
    if (!profile) return <div className="text-center p-10">User not found.</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-gradient-to-br from-brand to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-brand/20 text-white font-bold text-3xl">
                    {profile.name.charAt(0)}
                </div>
                <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-gray-500 mt-2 max-w-lg">{profile.bio || "No bio yet."}</p>
                </div>
                {currentUser && currentUser.userId !== parseInt(userId) && (
                    <button className="btn-primary flex items-center gap-2">
                        <Send className="h-4 w-4" /> Message
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Teaching */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                            <GraduationCap className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Teaching</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {profile.skills.filter(s => s.type === 'teach').map(skill => (
                            <div key={skill.id} className="group relative">
                                <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 font-medium flex items-center gap-2">
                                    {skill.name}
                                    {currentUser && currentUser.userId !== parseInt(userId) && (
                                        <button
                                            onClick={() => handleSwapRequest(skill)}
                                            className="ml-2 hover:bg-emerald-200 p-1 rounded-full transition-colors"
                                            title="Request Swap"
                                        >
                                            <Send className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {profile.skills.filter(s => s.type === 'teach').length === 0 && (
                            <p className="text-gray-400 italic">Not teaching anything yet.</p>
                        )}
                    </div>
                </div>

                {/* Learning */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Learning</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {profile.skills.filter(s => s.type === 'learn').map(skill => (
                            <div key={skill.id} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 font-medium">
                                {skill.name}
                            </div>
                        ))}
                        {profile.skills.filter(s => s.type === 'learn').length === 0 && (
                            <p className="text-gray-400 italic">Not learning anything yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
