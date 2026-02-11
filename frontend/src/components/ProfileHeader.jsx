import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/endpoints';
import { Button } from './Button';
import { PenSquare, Save, X } from 'lucide-react';

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
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="h-24 w-24 rounded-full bg-brand/10 flex items-center justify-center text-brand text-3xl font-bold border-4 border-white shadow-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Welcome back, <span className="text-brand">{user?.name}</span>! 👋
                    </h1>

                    <div className="text-gray-500 text-lg max-w-xl relative group">
                        {isEditing ? (
                            <div className="space-y-3 mt-2">
                                <textarea
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none resize-none text-base bg-gray-50"
                                    rows={3}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about your skills and interests..."
                                />
                                <div className="flex space-x-2 justify-end">
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                                        <X className="h-4 w-4 mr-1" /> Cancel
                                    </Button>
                                    <Button size="sm" onClick={handleSave} disabled={loading} className="bg-brand text-white hover:bg-brand/90 rounded-lg">
                                        <Save className="h-4 w-4 mr-1" /> Save
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative inline-block w-full">
                                <p className="leading-relaxed">
                                    {user?.bio || <span className="text-gray-400 italic">No bio added yet. Click edit to add one.</span>}
                                </p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="absolute -top-1 -right-8 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-full text-brand"
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
