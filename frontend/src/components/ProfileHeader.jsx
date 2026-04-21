import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/endpoints';
import { PenSquare, Save, X, Loader2 } from 'lucide-react';

export default function ProfileHeader() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState(user?.bio || '');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await authAPI.updateProfile({ bio });
            window.location.reload();
        } catch (error) {
            console.error("Failed to update bio", error);
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <div className="bg-slate-900/80 rounded-2xl border border-white/[0.06] p-8 backdrop-blur-sm relative overflow-hidden mb-2">
            {/* Decorative orbs */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/20 shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Welcome back, <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{user?.name}</span>! 👋
                    </h1>

                    <div className="text-slate-400 text-base max-w-xl relative group mt-2">
                        {isEditing ? (
                            <div className="space-y-3">
                                <textarea
                                    className="w-full p-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 outline-none resize-none text-sm"
                                    rows={3}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about your skills and interests..."
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-all"
                                    >
                                        <X className="h-3.5 w-3.5" /> Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="flex items-center gap-1.5 text-sm bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-lg hover:bg-indigo-500/30 transition-all disabled:opacity-60"
                                    >
                                        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative inline-block w-full">
                                <p className="leading-relaxed text-sm">
                                    {user?.bio || <span className="text-slate-600 italic">No bio added yet. Click edit to add one.</span>}
                                </p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="absolute -top-1 -right-8 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/[0.05] rounded-lg text-indigo-400"
                                    title="Edit Bio"
                                >
                                    <PenSquare className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
