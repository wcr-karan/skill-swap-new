import { useState, useEffect } from 'react';
import { skillsAPI } from '../api/endpoints';
import UserCard from '../components/UserCard';
import { Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const res = await skillsAPI.getMatches();
            // The backend returns matches based on skills.
            // We process distinct users from matches
            const users = new Map();
            res.data.forEach(match => {
                // match.user is the matched user
                users.set(match.user.id, match.user);
            });
            setMatches(Array.from(users.values()));
        } catch (error) {
            console.error("Failed to fetch matches", error);
            toast.error("Failed to load matches");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                    <Sparkles className="text-brand h-8 w-8" />
                    Smart Matches
                </h1>
                <p className="text-gray-500 text-lg">
                    These people teach exactly what you want to learn, and want to learn what you verify teach!
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin h-10 w-10 text-brand" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.length > 0 ? (
                        matches.map(user => (
                            <UserCard key={user.id} user={user} />
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="mx-auto h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Sparkles className="h-10 w-10 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No matches yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto mt-2">
                                Try adding more skills you can teach or want to learn to increase your chances of finding a swap partner.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
