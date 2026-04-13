import { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import AddSkill from '../components/AddSkill';
import MySkills from '../components/MySkills';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Award, ArrowRight, Zap } from 'lucide-react';

export default function Dashboard() {
    const [refreshSkills, setRefreshSkills] = useState(0);

    const handleSkillAdded = () => {
        setRefreshSkills(prev => prev + 1);
    };

    const stats = [
        { label: "Total Swaps", value: "12", icon: Zap, color: "emerald" },
        { label: "Hours Taught", value: "28", icon: Clock, color: "blue" },
        { label: "People Met", value: "8", icon: Users, color: "purple" },
        { label: "Skill Points", value: "450", icon: Award, color: "amber" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10 py-4 max-w-6xl mx-auto"
        >
            <ProfileHeader />

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className={`w-12 h-12 bg-${stat.color === 'emerald' ? 'emerald' : stat.color + '-500'}/10 rounded-2xl flex items-center justify-center text-${stat.color === 'emerald' ? 'emerald' : stat.color + '-500'} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Skill Mastery</h2>
                            <button className="text-emerald font-bold text-sm flex items-center gap-1 hover:underline">
                                View Detailed Stats <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                        <MySkills refreshTrigger={refreshSkills} />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald/20 rounded-full blur-3xl group-hover:bg-emerald/30 transition-colors"></div>
                        <h3 className="font-extrabold text-white text-xl mb-6 relative z-10">Add New Skill</h3>
                        <div className="relative z-10 dashboard-add-skill">
                            <AddSkill onSkillAdded={handleSkillAdded} />
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                            <h3 className="font-black text-slate-900 text-lg">Recommended Partners</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Sarah Chen", skill: "Python Expert", match: "98%" },
                                { name: "Alex Rivera", skill: "UI/UX Master", match: "95%" }
                            ].map((rec, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald/30 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-slate-900 border border-slate-50">{rec.name[0]}</div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-800">{rec.name}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{rec.skill}</p>
                                        </div>
                                    </div>
                                    <div className="text-emerald font-black text-xs bg-emerald/5 px-2 py-1 rounded-lg border border-emerald/10">{rec.match}</div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors uppercase tracking-widest">
                            Explore All Matches
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// minor update code refactor: 3

// minor update code refactor: 2

// minor update code refactor: 7

// minor update code refactor: 3

// minor update code refactor: 2

// minor update code refactor: 5

// minor update code refactor: 5

// minor update code refactor: 7

// minor update code refactor: 5

// minor update code refactor: 8
