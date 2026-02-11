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
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Skills I Can Teach</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {teachSkills.length > 0 ? (
                        teachSkills.map(skill => (
                            <span key={skill.id} className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-100 animate-in fade-in zoom-in duration-300">
                                {skill.name}
                            </span>
                        ))
                    ) : (
                        <div className="w-full text-center py-8 border-2 border-dashed border-gray-100 rounded-xl">
                            <p className="text-gray-400 text-sm">You haven't added any teaching skills yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Learn Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-brand/10 p-2 rounded-lg text-brand">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Skills I Want to Learn</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {learnSkills.length > 0 ? (
                        learnSkills.map(skill => (
                            <span key={skill.id} className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-brand/5 text-brand border border-brand/10 animate-in fade-in zoom-in duration-300">
                                {skill.name}
                            </span>
                        ))
                    ) : (
                        <div className="w-full text-center py-8 border-2 border-dashed border-gray-100 rounded-xl">
                            <p className="text-gray-400 text-sm">You haven't added any learning goals yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
