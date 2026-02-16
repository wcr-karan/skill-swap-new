import { useState, useEffect } from 'react';
import { skillsAPI } from '../api/endpoints';
import { Sparkles, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MySkills({ refreshTrigger }) {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, [refreshTrigger]);

    const fetchSkills = async () => {
        try {
            const res = await skillsAPI.getMySkills();
            setSkills(res.data);
        } catch (error) {
            console.error("Failed to fetch skills", error);
            toast.error("Failed to load skills");
        } finally {
            setLoading(false);
        }
    };

    const teachSkills = skills.filter(s => s.type === 'teach');
    const learnSkills = skills.filter(s => s.type === 'learn');

    if (loading && skills.length === 0) {
        return <div className="animate-pulse h-40 bg-gray-100 rounded-2xl"></div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teach Section */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="h-24 w-24 text-emerald-500" />
                </div>
                <div className="flex items-center space-x-2 mb-4 relative z-10">
                    <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-2 rounded-lg text-emerald-600 shadow-sm">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Skills I Can Teach</h3>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                    {teachSkills.length > 0 ? (
                        teachSkills.map(skill => (
                            <span key={skill.id} className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-100 shadow-sm animate-in fade-in zoom-in duration-300">
                                {skill.name}
                            </span>
                        ))
                    ) : (
                        <div className="w-full text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                            <p className="text-gray-400 text-sm">You haven't added any teaching skills yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Learn Section */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BookOpen className="h-24 w-24 text-brand" />
                </div>
                <div className="flex items-center space-x-2 mb-4 relative z-10">
                    <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-2 rounded-lg text-brand shadow-sm">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Skills I Want to Learn</h3>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                    {learnSkills.length > 0 ? (
                        learnSkills.map(skill => (
                            <span key={skill.id} className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-50 to-blue-50 text-brand border border-indigo-100 shadow-sm animate-in fade-in zoom-in duration-300">
                                {skill.name}
                            </span>
                        ))
                    ) : (
                        <div className="w-full text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                            <p className="text-gray-400 text-sm">You haven't added any learning goals yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
