import { useState, useEffect } from 'react';
import { skillsAPI } from '../api/endpoints';
import { Sparkles, BookOpen, Loader2 } from 'lucide-react';
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
            console.error('Failed to fetch skills', error);
            toast.error('Failed to load skills');
        } finally {
            setLoading(false);
        }
    };

    const teachSkills = skills.filter(s => s.type === 'teach');
    const learnSkills = skills.filter(s => s.type === 'learn');

    if (loading && skills.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1].map(i => (
                    <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 h-32 shimmer" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Teach Skills */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-slate-200">I Can Teach</p>
                        <p className="text-[11px] text-slate-600">{teachSkills.length} skill{teachSkills.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>

                {teachSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {teachSkills.map(skill => (
                            <span key={skill.id} className="skill-tag skill-tag-green">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 border border-dashed border-white/[0.08] rounded-xl">
                        <p className="text-[12px] text-slate-600 italic text-center">
                            No teaching skills yet.<br />
                            <span className="text-indigo-500">Add one →</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Learn Skills */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-slate-200">I Want to Learn</p>
                        <p className="text-[11px] text-slate-600">{learnSkills.length} goal{learnSkills.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>

                {learnSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {learnSkills.map(skill => (
                            <span key={skill.id} className="skill-tag">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 border border-dashed border-white/[0.08] rounded-xl">
                        <p className="text-[12px] text-slate-600 italic text-center">
                            No learning goals yet.<br />
                            <span className="text-indigo-500">Add one →</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
