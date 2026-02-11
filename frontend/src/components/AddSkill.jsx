import { useState } from 'react';
import { skillsAPI } from '../api/endpoints';
import { Button } from './Button';
import { Plus, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

export default function AddSkill({ onSkillAdded }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('teach'); // 'teach' or 'learn'
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            await skillsAPI.add({ name, type });
            setName('');
            toast.success('Skill added successfully!');
            if (onSkillAdded) onSkillAdded();
        } catch (error) {
            console.error("Failed to add skill", error);
            toast.error('Failed to add skill');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-xl">
                <button
                    type="button"
                    onClick={() => setType('teach')}
                    className={clsx(
                        "flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        type === 'teach'
                            ? "bg-white text-slate-900 shadow-sm ring-1 ring-gray-200"
                            : "text-gray-500 hover:text-gray-900"
                    )}
                >
                    <Sparkles className={clsx("h-4 w-4 mr-2", type === 'teach' ? "text-green-500" : "text-gray-400")} />
                    I Can Teach
                </button>
                <button
                    type="button"
                    onClick={() => setType('learn')}
                    className={clsx(
                        "flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                        type === 'learn'
                            ? "bg-white text-slate-900 shadow-sm ring-1 ring-gray-200"
                            : "text-gray-500 hover:text-gray-900"
                    )}
                >
                    <BookOpen className={clsx("h-4 w-4 mr-2", type === 'learn' ? "text-brand" : "text-gray-400")} />
                    I Want to Learn
                </button>
            </div>

            {/* Input */}
            <div>
                <label htmlFor="skill-name" className="sr-only">Skill Name</label>
                <div className="relative">
                    <input
                        id="skill-name"
                        type="text"
                        className="block w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand sm:text-sm transition-all"
                        placeholder={type === 'teach' ? "e.g. Python, Guitar, Photoshop" : "e.g. Spanish, Cooking, React"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {type === 'teach' ? (
                            <Sparkles className="h-4 w-4 text-gray-300" />
                        ) : (
                            <BookOpen className="h-4 w-4 text-gray-300" />
                        )}
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200 h-11"
                disabled={loading || !name.trim()}
            >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                    <>
                        <Plus className="h-4 w-4 mr-2" /> Add Skill
                    </>
                )}
            </Button>
        </form>
    );
}
