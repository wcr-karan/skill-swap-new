import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/endpoints';
import { PenSquare, Save, X, Loader2, MapPin, Calendar } from 'lucide-react';

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
            console.error('Failed to update bio', error);
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    const initials = user?.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || '?';

    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Recently joined';

    return (
        <div className="card relative overflow-hidden">
            {/* Subtle top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-transparent" />

            {/* Background orb */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 p-7 sm:p-9">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="avatar w-18 h-18 rounded-2xl text-2xl shadow-glow-sm" style={{width:'72px',height:'72px',fontSize:'26px'}}>
                            {initials}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#161B27]" title="Online" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
                                    Welcome back, <span className="text-gradient-brand">{user?.name?.split(' ')[0]}</span> 👋
                                </h1>
                                <div className="flex items-center flex-wrap gap-x-5 gap-y-1.5 mt-2.5">
                                    <span className="flex items-center gap-1.5 text-[13px] text-slate-500">
                                        <MapPin className="w-3 h-3" />
                                        {user?.location || 'Add location'}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[13px] text-slate-500">
                                        <Calendar className="w-3 h-3" />
                                        Member since {joinDate}
                                    </span>
                                </div>
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="btn-ghost text-xs gap-1.5 shrink-0"
                                    title="Edit bio"
                                >
                                    <PenSquare className="w-3.5 h-3.5" />
                                    Edit
                                </button>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="mt-4">
                            {isEditing ? (
                                <div className="space-y-2.5">
                                    <textarea
                                        className="input-base resize-none text-sm"
                                        rows={3}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell people about your skills and interests..."
                                        autoFocus
                                    />
                                    <div className="flex items-center gap-2 justify-end">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="btn-ghost text-xs"
                                        >
                                            <X className="w-3.5 h-3.5" /> Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={loading}
                                            className="btn-primary text-xs py-2 px-4"
                                        >
                                            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[13px] text-slate-400 leading-relaxed max-w-xl">
                                    {user?.bio || (
                                        <span className="text-slate-600 italic cursor-pointer hover:text-slate-400 transition-colors" onClick={() => setIsEditing(true)}>
                                            No bio yet. Click Edit to add one →
                                        </span>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
