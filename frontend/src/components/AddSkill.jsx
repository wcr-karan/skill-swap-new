import { useState } from 'react';
import { skillsAPI } from '../api/endpoints';
import { Plus, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

export default function AddSkill({ onSkillAdded }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('teach');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            await skillsAPI.add({ name, type });
            setName('');
            toast.success('Skill added!');
            if (onSkillAdded) onSkillAdded();
        } catch (error) {
            console.error('Failed to add skill', error);
            toast.error('Failed to add skill');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {/* Toggle */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/20 rounded-xl border border-white/[0.06]">
                <button
                    type="button"
                    onClick={() => setType('teach')}
                    className={clsx(
                        "flex items-center justify-center gap-1.5 py-2 text-[12px] font-semibold rounded-lg transition-all duration-200",
                        type === 'teach'
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                            : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    I Can Teach
                </button>
                <button
                    type="button"
                    onClick={() => setType('learn')}
                    className={clsx(
                        "flex items-center justify-center gap-1.5 py-2 text-[12px] font-semibold rounded-lg transition-all duration-200",
                        type === 'learn'
                            ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25"
                            : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    <BookOpen className="h-3.5 w-3.5" />
                    I Want to Learn
                </button>
            </div>

            {/* Input */}
            <div className="relative">
                <input
                    id="skill-name"
                    type="text"
                    className="input-base pr-10 text-[13px]"
                    placeholder={type === 'teach' ? 'e.g. Python, Guitar, Figma' : 'e.g. Spanish, React, Finance'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
                    {type === 'teach'
                        ? <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                        : <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                    }
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading || !name.trim()}
                className="w-full btn-primary py-2.5 text-[13px]"
            >
                {loading
                    ? <Loader2 className="animate-spin h-4 w-4" />
                    : <><Plus className="h-4 w-4" /> Add Skill</>
                }
            </button>
        </form>
    );
}
