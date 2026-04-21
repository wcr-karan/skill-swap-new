import { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import AddSkill from '../components/AddSkill';
import MySkills from '../components/MySkills';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Award, ArrowRight, Zap, Plus } from 'lucide-react';

export default function Dashboard() {
    const [refreshSkills, setRefreshSkills] = useState(0);

    const handleSkillAdded = () => {
        setRefreshSkills(prev => prev + 1);
    };

    const stats = [
        { label: "Total Swaps", value: "12", icon: Zap, color: "indigo" },
        { label: "Hours Taught", value: "28", icon: Clock, color: "purple" },
        { label: "People Met", value: "8", icon: Users, color: "cyan" },
        { label: "Skill Points", value: "450", icon: Award, color: "amber" }
    ];

    const colorMap = {
        indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
        cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
        amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 py-4 max-w-6xl mx-auto"
        >
            <ProfileHeader />

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                    const c = colorMap[stat.color];
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.08 }}
                            className={`bg-slate-900/80 p-6 rounded-2xl border border-white/[0.06] backdrop-blur-sm hover:border-white/[0.12] transition-all group cursor-default`}
                        >
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center ${c.text} border ${c.border} group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* My Skills Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/80 rounded-2xl p-7 border border-white/[0.06] backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-7">
                            <h2 className="text-xl font-bold text-white tracking-tight">My Skill Mastery</h2>
                            <button className="text-indigo-400 font-semibold text-sm flex items-center gap-1 hover:text-indigo-300 transition-colors">
                                View Stats <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                        <MySkills refreshTrigger={refreshSkills} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                    {/* Add New Skill */}
                    <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-7 border border-indigo-500/20 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute -top-8 -right-8 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-500/30">
                                    <Plus className="h-4 w-4 text-indigo-400" />
                                </div>
                                <h3 className="font-bold text-white text-base">Add New Skill</h3>
                            </div>
                            <div className="dashboard-add-skill">
                                <AddSkill onSkillAdded={handleSkillAdded} />
                            </div>
                        </div>
                    </div>

                    {/* Recommended Partners */}
                    <div className="bg-slate-900/80 rounded-2xl p-6 border border-white/[0.06] backdrop-blur-sm space-y-5">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20">
                                <TrendingUp className="h-4 w-4 text-amber-400" />
                            </div>
                            <h3 className="font-bold text-white text-base">Recommended Partners</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: "Sarah Chen", skill: "Python Expert", match: "98%" },
                                { name: "Alex Rivera", skill: "UI/UX Master", match: "95%" }
                            ].map((rec, i) => (
                                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-indigo-500/[0.05] transition-all cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-lg flex items-center justify-center font-bold text-white text-sm border border-indigo-500/20">
                                            {rec.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-slate-200">{rec.name}</p>
                                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{rec.skill}</p>
                                        </div>
                                    </div>
                                    <div className="text-indigo-400 font-bold text-xs bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">{rec.match}</div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-2.5 bg-white/[0.03] text-slate-500 rounded-xl text-xs font-bold hover:bg-white/[0.06] hover:text-slate-300 transition-all uppercase tracking-widest border border-white/[0.06]">
                            Explore All Matches
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
